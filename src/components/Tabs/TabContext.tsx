"use client";

import React, { createContext } from 'react';

interface Payload {
    value: string,
    unrendere?: boolean,
}

export const TabsContext = createContext<Payload>({} as Payload);

export default function TabContext({value, unrendere, children}:Readonly<Payload & {children?:React.ReactNode}>) {
    return (
        <TabsContext.Provider value={{value, unrendere}}>
            {children}
        </TabsContext.Provider>
    )
}

