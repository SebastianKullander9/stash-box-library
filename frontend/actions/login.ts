"use server";

import { graphqlClient } from "@/lib/graphqlClient";
import { LOGIN } from "@/graphql/mutations";

export async function loginAction(email: string, password: string) {
    const data = await graphqlClient.request<{login: string}>(LOGIN, { email, password });
    return data.login;
}