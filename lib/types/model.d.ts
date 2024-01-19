// model.d.ts
import type { User } from "next-auth";
import type { INCharacter } from "@types";

export { User };

export interface UserDecoration {
  rickmorty: {
    favorites: {
      characters: INCharacter["id"][];
    };
  };
}

export interface UserSchema extends User, UserDecoration {}
