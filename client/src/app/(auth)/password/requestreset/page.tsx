import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import RequestPasswordReset from '@/components/auth/password/RequestPasswordReset';
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

const RequestResetPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/account");

  return <RequestPasswordReset />;
};
export default RequestResetPage;
