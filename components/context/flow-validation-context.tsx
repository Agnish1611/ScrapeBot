import { AppNodeMissingInputs } from "@/utils/types/appNode";
import { createContext, Dispatch, useState } from "react";

type FLowValidationContextType  = {
    invalidInputs: AppNodeMissingInputs[];
    setInvalidInputs: Dispatch<AppNodeMissingInputs[]>;
    clearErrors: () => void;
}

export const FlowValidationContext = createContext<FLowValidationContextType | null>(null);

export function FlowValidationContextProvider({children}: {children: React.ReactNode}) {
    const [invalidInputs, setInvalidInputs] = useState<AppNodeMissingInputs[]>([]);

    const clearErrors = () => {
        setInvalidInputs([]);
    }

    return (
        <FlowValidationContext.Provider value={{invalidInputs, setInvalidInputs, clearErrors}}>
            {children}
        </FlowValidationContext.Provider>
    )
}