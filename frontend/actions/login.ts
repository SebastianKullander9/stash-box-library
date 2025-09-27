"use server";

import { graphqlClient } from "@/lib/graphqlClient";
import { ClientError } from "graphql-request";
import { LOGIN } from "@/graphql/mutations";
import { cookies } from "next/headers";

export async function loginAction(email: string, password: string) {
    try {
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

        return token;
    } catch (err: unknown) {
        if (err instanceof ClientError) {
            const graphQLError = err.response.errors?.[0];
            throw new Error(graphQLError?.message || "Login failed");
        }
        throw err;
    }
}