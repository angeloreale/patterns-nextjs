/* eslint-disable react-hooks/exhaustive-deps, react-hooks/rules-of-hooks */
// auth-actions.ts
"use client";
import type {
  ISupportedContexts,
  IActionBack,
  IAction,
  IStatus,
  ICreateAction,
  IDispatch,
  IPayload,
} from "@types";

import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext, RMContext, LogContext } from "@state";

/* to-do: chained actions */
// import { decorateRMCharacters } from "@model"

const CreateAction: ICreateAction =
  ({ action, type, verb, context }: IActionBack) =>
  ({ cb }: IAction) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const noop: IDispatch = async (...payload: IPayload): Promise<void> => {};
    const createStatusStr = () => {
      return `%c Flux: --- action / ${type} / ${action} / ${verb} / ${s_current.current}|${message.current} ---`;
    };
    // to-do: abstract from auth context (link to ticket)
    const _context: ISupportedContexts =
      useContext<ISupportedContexts>(context);
    const { setter }: ISupportedContexts = _context;

    const init = useRef(false);
    const s_current = useRef("loaded");
    const message = useRef("");
    const to_call = useRef<IDispatch>(noop);
    const status = useRef<IStatus>({
      current: s_current.current,
      str: createStatusStr(),
      ok: undefined,
    });
    const payload = useRef<IPayload>();
    const [dispatchd, setDispatchd] = useState(false);

    const updateStatus = (
      { ok }: { ok: boolean | undefined } = { ok: undefined },
    ) => {
      status.current = {
        str: createStatusStr(),
        ok,
        current: s_current.current,
      };
      console.log(
        status?.current.str,
        `background: #1f1f1f; color: ${s_current.current.includes("error") ? "error" : s_current.current.includes("idle") ? "yellow" : "green"};`,
      );
    };

    const cancel = () => {
      updateStatus({ ok: undefined });
      return;
    };

    const dispatch: IDispatch = (clientPayload, toCall) => {
      payload.current = { ...clientPayload };
      s_current.current = "init:active";
      message.current = "dispatched";
      to_call.current = toCall || noop;
      updateStatus();
      setDispatchd(!dispatchd);
    };

    const reset = () => {
      payload.current = undefined;
      setDispatchd(false);
    };

    useEffect(() => {
      if (!dispatchd) {
        s_current.current = "init:idle";
        message.current = "not dispatched yet";
        return cancel();
      }

      if (!payload?.current) {
        s_current.current = "cancelled";
        message.current = "no payload data";
        return cancel();
      }

      s_current.current = "started";
      message.current = "loading payload data";
      updateStatus();

      if (setter) {
        setter({
          ..._context,
          ...payload.current,
          history: [..._context.history, status.current.str],
        });
      }

      init.current = true;

      s_current.current = "in progress";
      message.current = "calling functions";
      updateStatus({ ok: undefined });

      if (typeof to_call?.current === "function")
        to_call.current(payload.current);

      s_current.current = "completed";
      message.current = "success";
      updateStatus({ ok: true });

      if (cb && cb?.length > 0) {
        cb.forEach((_cb) => {
          _cb();
        });
      }

      reset();

      return () => {
        s_current.current = "ended";
        message.current = "exit 0";
        updateStatus();
        reset();
      };
    }, [dispatchd]);

    return [status?.current?.ok, dispatch];
  };

const BuildAction = (Component: ICreateAction, options: IActionBack) => {
  return Component(options);
};

/* private */

// const ADecorateChars = BuildAction(CreateAction, {
//   action: "hydrate",
//   type: "rickmorty",
//   verb: "decorate character",
//   context: RMContext,
//   //to-do: chained actions
//   //cb: [() => decorateRMCharacters()]
// });

/* public */

export const ALogin = BuildAction(CreateAction, {
  action: "login",
  type: "auth",
  verb: "load user",
  context: AuthContext,
});

export const ALogout = BuildAction(CreateAction, {
  action: "logout",
  type: "auth",
  verb: "unload user",
  context: AuthContext,
});

export const ALoadChars = BuildAction(CreateAction, {
  action: "hydrate",
  type: "rickmorty",
  verb: "load characters",
  context: RMContext,
});

export const AUnloadChars = BuildAction(CreateAction, {
  action: "hydrate",
  type: "rickmorty",
  verb: "unload characters",
  context: RMContext,
});

export const AAddToFavoriteChars = BuildAction(CreateAction, {
  action: "update_db",
  type: "rickmorty",
  verb: "add char to favorites",
  context: LogContext,
});

/* tmp-public */
export const ADecorateChars = BuildAction(CreateAction, {
  action: "hydrate",
  type: "rickmorty",
  verb: "decorate characters",
  context: RMContext,
  // to-do: chained actions
  // cb: [() => decorateRMCharacters()]
});

export { ALogin as ALogIn, ALogout as ALogOut };
