// context-rm.ts// context-auth.ts
"use client";
import type { IRMContext, History } from "@types";
import { createContext } from "react";

export const RMContext = createContext<IRMContext>({
  initd: false,
  characters: [],
  setter: undefined,
  history: [],
});

export const LogContext = createContext<History>({
  history: [],
  setter: undefined,
});
