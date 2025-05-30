import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ParamProps } from "@/utils/types/appNode";
import React, { ChangeEvent, FocusEvent, useEffect, useId, useState } from "react";

type InputComponent = typeof Input | "textarea";

const StringParam = ({ param, value, updateNodeParamValue, disabled }: ParamProps) => {
  const [internalValue, setInternalValue] = useState(value);
  const id = useId();

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  let Component: InputComponent = Input;
  if (param.variant === "textarea") {
    Component = "textarea";
  }

  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="text-red-500 px-2">*</p>}
      </Label>
      <Component
        disabled={disabled}
        id={id}
        className="text-xs"
        value={internalValue}
        placeholder="Enter value here"
        onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setInternalValue(e.target.value)}
        onBlur={(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => updateNodeParamValue(e.target.value)}
      />
      {param.helperText && (
        <p className="text-muted-foreground px-2">{param.helperText}</p>
      )}
    </div>
  );
};

export default StringParam;
