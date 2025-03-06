"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { ConfirmationNewRequestFormStateT } from "./NewRequest";

const formSchema = z.object({
  email: z.string().email("Enter a valid email.").trim(),
});

export default async function confirmNewRequestAction(
  prevState: ConfirmationNewRequestFormStateT,
  formData: FormData,
) {
  const validatedFields = formSchema.safeParse({
    email: formData.get("email"),
  });
  if (!validatedFields.success) {
    return {
      error: true,
      inputErrors: validatedFields.error.flatten().fieldErrors,
      message: "Please verify your data.",
    };
  }
  const { email } = validatedFields.data;

  try {
    const strapiResponse: any = await fetch(
      process.env.STRAPI_BACKEND_URL + "/api/auth/send-email-confirmation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        cache: "no-cache",
      },
    );

    if (!strapiResponse.ok) {
      const response = {
        error: true,
        message: "",
      };

      const contentType = strapiResponse.headers.get("content-type");
      if (contentType === "application/json; charset=utf-8") {
        const data = await strapiResponse.json();

        if (data.error.message !== "Already confirmed") {
          response.message = data.error.message;
          return response;
        }
      } else {
        response.message = strapiResponse.statusText;
        return response;
      }
    }
  } catch (error: any) {
    return {
      error: true,
      message: "message" in error ? error.message : error.statusText,
    };
  }

  redirect("/confirmation/message");
}
