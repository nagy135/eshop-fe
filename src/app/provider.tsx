"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import BucketProvider from "./contexts/bucket";
import UserProvider from "./contexts/user";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <BucketProvider>{children}</BucketProvider>
        </UserProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
