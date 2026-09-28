import createOAClient, { type Middleware } from "openapi-fetch";
import type { paths } from "./schema";

/**
 * Creates a typed OpenApi client over the book book metadata API.
 *
 * @returns typed OpenApi client
 */
export function createClient({ baseUrl }: { baseUrl: string }) {
  const client = createOAClient<paths>({
    baseUrl,
  });

  return client;
}

/**
 * Conveience middleware for setting the Authorization header.
 * @param authorization content of the Authorization header
 * @returns middleware that sets the Authorization header
 * @usage
 * ```ts
 * const client = createClient({ baseUrl: "https://api.example.com" })
 * const authClient = client.use(authorizationMiddleware("Bearer YOUR_API_TOKEN"))
 * ```
 */
export function authorizationMiddleware(authorization: string): Middleware {
  return {
    async onRequest({ request }) {
      request.headers.set("Authorization", `${authorization}`);
    },
  };
}
