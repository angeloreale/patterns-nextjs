// actions.ts
"use server";
import type { IDPayload } from "@types";
import {
  addToFavorites as _addToFavorites,
  getRMCharacters,
} from "@controller";
import { decorateRMCharacters } from "@model";
import { getServerSession } from "next-auth/next";
import { finalAuth } from "@auth/adapter";

export async function loadChars() {
  const session = await getServerSession(finalAuth);
  const email = session?.user?.email || "";
  const chars = (await getRMCharacters()).results;
  const decd = await decorateRMCharacters(chars, email);
  return decd;
}

export async function getChars() {
  return await loadChars();
}

export async function reloadChars() {
  await loadChars();
  return { ok: true };
}

export async function addToFavorites({ email, cid }: IDPayload) {
  await _addToFavorites({ email, cid, type: "characters" });
  return { ok: true };
}
