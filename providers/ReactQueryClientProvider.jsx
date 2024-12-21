"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const query = new QueryClient();
export default function ReactQueryClientProvider({ children }) {
  return <QueryClientProvider client={query}>{children}</QueryClientProvider>;
}
