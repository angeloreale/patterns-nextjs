// mdb-update-interface.ts
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { UserSchema, INCharacter, UserDecoration } from "@types";
import { MongoConnector } from "@model";

type Tdbs = "test";

interface TModelSingleton {
  [x: string]: {
    db: unknown;
    collection: unknown;
  };
}

/* to-do: database connection logs and error handling */

/* schemas */
const _UserSchema: UserDecoration = {
  rickmorty: {
    favorites: {
      characters: [] as INCharacter["id"][],
    },
  },
};

/* private */
const getDB = (name: Tdbs) => async () => {
  const conn = await MongoConnector;
  const db = await conn.db(name);
  return db;
};

const init =
  (db: Tdbs): (() => Promise<Db>) =>
  async (): TModelSingleton => {
    const _getDB = getDB(db);
    const _db = await _getDB();
    // console.log({ _db })
    return _db;
  };

init.test = init("test");

const getCollection =
  async (_db = "test") =>
  async (_collection = "users") => {
    if (!init[_db].db) {
      const db = await init[_db]();
      init[_db].db = db;
    }
    const collection = await init[_db].db.collection(_collection);
    if (!init[_db].db) return new Error("db not reachable");
    init["test"].collections = { ...init["test"].collections };
    init["test"].collections[_collection] = collection;
    return collection;
  };

const getUserCollection = async () => {
  const col = await getCollection("test");
  const _col = await col("users");
  init["test"].collections["users"] = _col;
  return _col;
};

/* public */
export const addToFavorites = async ({
  email = "",
  cid = undefined,
  type = "characters",
}: {
  email: UserSchema["email"];
  cid: number;
  type?: string;
}) => {
  const collection = await getUserCollection();
  const query = `rickmorty.favorites.${type}`;
  const user = await collection.updateOne(
    { email },
    { $addToSet: { [query]: cid } },
  );
  return user;
};
