"use server";

import { graphqlClient } from "@/lib/graphqlClient";
import { ClientError } from "graphql-request";
import { LOGIN } from "@/graphql/mutations/authMutations";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type LoginState={
    error?: string;
} | null;

export async function loginAction( prevState: LoginState, formData: FormData) {
    try {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password) {
            return { error: "Email and password are required" };
        }

        const data = await graphqlClient.request<{ login: string }>(LOGIN, { email, password });
        const token = data.login;

        const cookieStore = await cookies();

        cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24,
        });
    } catch (err: unknown) {
        if (err instanceof ClientError) {
            const graphQLError = err.response.errors?.[0];
            return { 
                error: graphQLError?.message || "Invalid credentials" 
            };
        }
        return { error: "An unexpected error occurred. Please try again." };
    }

    redirect("/admin");
}