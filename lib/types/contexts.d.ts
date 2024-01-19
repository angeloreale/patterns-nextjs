// contexts.d.ts
import type { Dispatch, SetStateAction } from "react";

export interface History {
  history: string[];
  setter: Dispatch<SetStateAction<IAuthContext>> | undefined;
}

export interface INCharacter {
  id: number;
  name: string;
  status: string;
  image: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  favorite?: boolean;
}

export interface IDCharacter extends INCharacter {
  favorite?: boolean;
}

export interface IAuthContext extends History {
  authd?: boolean;
  name?: string;
  initd?: boolean;
  email?: string;
}

// to-do: characters type annotations
export interface IRMContext extends History {
  characters?: INCharacter[];
  initd?: boolean;
}
