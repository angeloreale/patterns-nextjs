// list-controller.tsx
// signin-controller.tsx
"use server";
import type { INCharacter } from "@types";
import { VList } from "@components/client";
import { loadChars } from "@gateway";
import { RickMortyProvider } from "@state";

export const CList = async () => {
  const characters: INCharacter[] = await loadChars();

  return (
    <RickMortyProvider>
      <VList characters={characters} />
    </RickMortyProvider>
  );
};
