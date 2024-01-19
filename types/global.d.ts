// global.d.ts
declare module globalThis {
  var _mongoClientPromise: Promise<MongoClient>;
}
