import postgres from "https://deno.land/x/postgresjs@v3.4.4/mod.js";

const sql = postgres(Deno.env.get("DATABASE_URL")!, {
  ssl: "require",
});

Deno.serve(async (req) => {
  const url = new URL(req.url);

  if (url.pathname === "/health") {
    return Response.json({ status: "ok" });
  }

  if (url.pathname === "/users") {
    const rows = await sql`
      select id, email, name
      from users
      limit 10
    `;
    return Response.json(rows);
  }

  return new Response("API running");
});
