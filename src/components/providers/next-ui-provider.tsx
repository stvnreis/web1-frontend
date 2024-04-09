'use client'

import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";

export const NextUiProvider = ({children}: {children: ReactNode}) => {
  return <NextUIProvider>{children}</NextUIProvider>
}