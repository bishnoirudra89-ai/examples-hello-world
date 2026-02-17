import { Client } from "https://deno.land/x/postgres/mod.ts";

const client = new Client(Deno.env.get("DATABASE_URL")!);
await client.connect();

Deno.serve(async (req) => {
  const url = new URL(req.url);

  if (url.pathname === "/users") {
    const result = await client.queryObject(
      "select id, email, name from users limit 10"
    );
    return Response.json(result.rows);
  }

  return new Response("ok");
});
