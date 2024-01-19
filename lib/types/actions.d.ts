// actions.d.ts
import type { Context } from "react";
export type ActionT = "login" | "logout" | "hydrate" | "update_db";
export type ActionTypes = "auth" | "rickmorty";
export type ActionAuthNames =
  | "load user"
  | "unload user"
  | "load characters"
  | "unload characters"
  | "decorate characters"
  | "add char to favorites";

export type ISupportedContexts = IAuthContext | IRMContext | ILogContext;

export interface IActionBack {
  action?: ActionT;
  type?: ActionTypes;
  verb?: ActionAuthNames;
  context: Context<ISupportedContexts>;
}

export interface IAction {
  cb?: Array<() => void>;
}

export interface IStatus {
  str: string;
  ok: boolean | undefined;
  current: string;
}

export interface IALoginPayload {
  name?: string;
  avatar?: string;
  authd?: boolean;
  setter?: () => void;
  email?: string;
}

export interface IDAddToFavPayload {
  email: string;
  cid: number;
}

export interface IACharacterPayload {
  characters?: INCharacter[];
  setter?: () => void;
  cid?: number;
}

export type ICreateAction = (
  options: IActionBack,
) => (_options: IAction) => [boolean | undefined, IDispatch];

export type IAPayload = IALoginPayload | IACharacterPayload;
export type IDPayload = IDAddToFavPayload;
export type _IPayload = IAPayload | IDPayload;
export interface IDispatchPayload {
  payload?: IAPayload | IDPayload;
  func?: IDispatch;
}

export type IPayload = [IDispatchPayload[], IDispatch];

export type IDispatch = (...payload: IPayloadF) => void | Promise<void>;
