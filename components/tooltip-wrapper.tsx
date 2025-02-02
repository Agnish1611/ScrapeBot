'use client';

import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface Props {
    children: React.ReactNode;
    content: React.ReactNode;
    side?: "top" | "bottom" | "left" | "right";
}

const TooltipWrapper = (props: Props) => {
    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>{props.children}</TooltipTrigger>
                <TooltipContent side={props.side}>{props.content}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default TooltipWrapper;