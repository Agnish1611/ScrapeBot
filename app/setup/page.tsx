import { setupUser } from "@/actions/billing/setupUser";
import React from "react";

const page = async () => {
  return await setupUser();
};

export default page;
