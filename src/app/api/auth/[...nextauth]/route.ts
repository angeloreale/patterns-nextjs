// api/auth/route.ts simple poc

// [...nextauth].ts// auth.ts TS-Doc?
import NextAuth from "next-auth";
import { finalAuth } from "@auth/adapter";

const handler = NextAuth(finalAuth);

export { handler as GET, handler as POST };
