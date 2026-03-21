"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { usePathname } from "next/navigation";

const BreadcrumbHeader = () => {
  const pathname = usePathname();
  const paths = pathname === "/dashboard" ? [""] : pathname.split("/");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink href={path === "" ? "/dashboard" : `/${path}`} className="font-bold">
                {path === "" ? "home" : path}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < paths.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbHeader;
