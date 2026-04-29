"use client";

import { createContext, useContext } from "react";

export const ContentCardContext = createContext<{ useIcons: boolean }>({
  useIcons: false,
});

export function useContentCard() {
  return useContext(ContentCardContext);
}
