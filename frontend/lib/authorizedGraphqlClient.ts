import { GraphQLClient } from "graphql-request";
import { cookies } from "next/headers";

export async function getAuthorizedClient() {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    return new GraphQLClient(process.env.GRAPHQL_URL!, {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        },
    });
}