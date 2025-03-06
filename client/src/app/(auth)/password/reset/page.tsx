import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import ResetPassword from "@/components/auth/password/ResetPassword";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    code?: string;
  };
};

const page = async ({ searchParams }: Props) => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/account");

  return <ResetPassword code={searchParams.code} />;
};

export default page;
