"use client";

import {
  ConvexReactClient,
  AuthLoading,
  Unauthenticated,
  Authenticated,
} from "convex/react";
import { ReactNode } from "react";
import { ClerkProvider, useAuth,SignIn } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { TbLoader3 } from "react-icons/tb";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated>{children}</Authenticated>

        <Unauthenticated>
          <div className="flex flex-col justify-center items-center min-h-screen">
          <SignIn/>
          </div>
        </Unauthenticated>

        <AuthLoading>
          <div className="h-[89vh] w-full flex items-center justify-center">
            <TbLoader3 size={56} className="animate-spin" />
          </div>
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
