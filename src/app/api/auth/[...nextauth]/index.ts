// index.ts

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { MongoConnector } from "@model";
import { authOptions } from "@auth";

// For more information on each option (and a full list of options) go to
// https://authjs.dev/reference/providers/oauth

const finalAuth = {
  adapter: MongoDBAdapter(MongoConnector),
  ...authOptions,
};

export { finalAuth };
