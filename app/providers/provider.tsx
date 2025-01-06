"use client";
import { ClerkProvider } from "@clerk/clerk-react";
import { ThemeProvider } from "@/themes/theme-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
    publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange>
        <NuqsAdapter>
          {children}
        </NuqsAdapter>
      </ThemeProvider>
    </ClerkProvider>
  );
}