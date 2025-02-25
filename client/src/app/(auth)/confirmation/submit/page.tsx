import ConfirmationSubmit from "@/components/auth/confirmation/ConfirmationSubmit";

type Props = {
  searchParams: {
    confirmation?: string;
  };
};

const page = async ({ searchParams }: Props) => {
  return <ConfirmationSubmit confirmationToken={searchParams?.confirmation} />;
};

export default page;
