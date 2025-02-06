'use client';
import { ParamProps } from '@/utils/types/appNode';
import React from 'react'

const BrowserInstanceParam = ({param}: ParamProps) => {
  return (
    <p className="text-xs">{param.name}</p>
  )
}

export default BrowserInstanceParam