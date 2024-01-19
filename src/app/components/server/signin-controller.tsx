// signin-controller.tsx
"use server";
import { getProviders } from "next-auth/react";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@auth";
import { VSignIn } from "@components/client";

interface ISignInData {
  providers?: IAuthProviders[];
  redirect?: {
    destination?: string;
  };
}

interface IAuthProviders {
  id?: string;
  name?: string;
}

async function getProvidersData(): Promise<ISignInData> {
  // to-do: default logged in ssr behavior (link to ticket)
  // const session = await getServerSession(authOptions);
  // if (session) {
  //   return { redirect: { destination: "/" } };
  // }

  const providers = (await getProviders()) as unknown as IAuthProviders[];

  return { providers: providers ?? [] };
}

export const CSignIn = async () => {
  const props: ISignInData = await getProvidersData();
  const providers: IAuthProviders[] = props?.providers || [];
  return <VSignIn providers={providers} />;
  // return <div>LOREM</div>
};
