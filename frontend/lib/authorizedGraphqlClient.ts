import { GraphQLClient } from "graphql-request";
import { cookies } from "next/headers";

export async function getAuthorizedClient() {
    if (!process.env.GRAPHQL_URL) {
        throw new Error("GRAPHQL_URL is not set — check your .env file");
    }

    console.log("GRAPHQL_URL:", process.env.GRAPHQL_URL);

    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    return new GraphQLClient(process.env.GRAPHQL_URL!, {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        },
    });
}
