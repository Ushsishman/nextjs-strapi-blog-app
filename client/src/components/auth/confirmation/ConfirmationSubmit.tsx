/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";

type Props = {
  confirmationToken?: string;
};

export function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-zinc-100 rounded-sm px-4 py-8 mb-8">{children}</div>
  );
}

const ConfirmationSubmit = async ({ confirmationToken }: Props) => {
  if (!confirmationToken || confirmationToken === "") {
    return (
      <Wrapper>
        <h2 className="font-bold text-lg mb-4">Error</h2>
        <p>Token is not valid.</p>
      </Wrapper>
    );
  }

  try {
    const strapiResponse = await fetch(
      `${process.env.STRAPI_BACKEND_URL}/api/auth/email-confirmation?confirmation=${confirmationToken}`,
    );

    if (!strapiResponse.ok) {
      let error = "";
      const contentType = strapiResponse.headers.get("content-type");

      if (contentType === "application/json; charset=utf-8") {
        const data = await strapiResponse.json();
        error = data.error.message;
      } else {
        error = strapiResponse.statusText;
      }

      return (
        <Wrapper>
          <h2 className="font-bold text-lg mb-4">Error</h2>
          <p>Error: {error}</p>
        </Wrapper>
      );
    }
  } catch (error: any) {
    return (
      <Wrapper>
        <h2 className="font-bold text-lg mb-4">Error</h2>
        <p>{error.message}</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h2 className="font-bold text-lg mb-4">Email confirmed.</h2>
      <p>
        Your email was successfully verified. You can now
        <Link href="/signin" className="underline">
          login
        </Link>
        .
      </p>
    </Wrapper>
  );
};

export default ConfirmationSubmit;
