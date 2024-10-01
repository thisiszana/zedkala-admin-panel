"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function ReactQueryClientProvider({ children }) {
  const query = new QueryClient();
  return <QueryClientProvider client={query}>{children}</QueryClientProvider>;
}
