import { setupUser } from "@/actions/billing/setupUser";

const page = async () => {
  return await setupUser();
};

export default page;
