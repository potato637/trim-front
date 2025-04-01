import React, { createContext, ReactNode, useState } from "react";

interface UrlContextI {
  prevUrl: string | null;
  setPrevUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

export const UrlContext = createContext<UrlContextI | undefined>(undefined);

export const UrlContextProvider = ({ children }: { children: ReactNode }) => {
  const [prevUrl, setPrevUrl] = useState<string | null>(null);

  const value = {
    prevUrl,
    setPrevUrl,
  };

  return <UrlContext.Provider value={value}>{children}</UrlContext.Provider>;
};
