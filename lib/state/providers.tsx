/* eslint-disable react-hooks/exhaustive-deps */
// providers.tsx
"use client";
import type { IAuthContext, IRMContext } from "@types";
import { useContext, useState, useEffect, useRef } from "react";
import { SessionProvider } from "next-auth/react";
import { AuthContext, RMContext } from "@state";

export function RootProviders({ children }: { children: React.ReactNode }) {
  const authContext = useContext<IAuthContext>(AuthContext);
  const [authState, setAuthState] = useState<IAuthContext>({ ...authContext });
  const init = useRef(false);

  useEffect(() => {
    if (!init.current && authContext && !authState?.setter) {
      setAuthState({ ...authState, setter: setAuthState, initd: true });
      console.log("Flux: --- auth context loaded ---");
      init.current = true;
    }
  }, [JSON.stringify(authContext)]);

  if (!authState?.initd) return;

  return (
    <SessionProvider>
      <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
    </SessionProvider>
  );
}

export function RickMortyProvider({ children }: { children: React.ReactNode }) {
  const rmContext = useContext<IRMContext>(RMContext);
  const [rmState, setRMState] = useState<IRMContext>({ ...rmContext });
  const init = useRef(false);

  useEffect(() => {
    if (!init.current && rmContext && !rmState?.setter) {
      setRMState({ ...rmState, setter: setRMState, initd: true });
      console.log("Flux: --- rickmorty context loaded ---");
      init.current = true;
    }
  }, [JSON.stringify(rmContext)]);

  if (!rmState?.initd) return;

  return <RMContext.Provider value={rmState}>{children}</RMContext.Provider>;
}
