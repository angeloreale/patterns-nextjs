// context-auth.ts
"use client";
import type { IAuthContext } from "@types";
import { createContext } from "react";

export const AuthContext = createContext<IAuthContext>({
  authd: false,
  name: "",
  setter: undefined,
  history: [],
});
