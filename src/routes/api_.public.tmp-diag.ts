import { createFileRoute } from "@tanstack/react-router";

/** Tijdelijke diagnose van het databaseschema (wordt na de controle verwijderd). */
export const Route = createFileRoute("/api_/public/tmp-diag")({
  server: {
    handlers: {
      GET: async () => {
        const { sql } = await import("@/lib/neon");
        const tables = (await sql`
          select table_name from information_schema.tables
           where table_schema = 'public' order by table_name
        `) as { table_name: string }[];
        let profileColumns: string[] = [];
        let profileCount = 0;
        try {
          const cols = (await sql`
            select column_name from information_schema.columns
             where table_schema = 'public' and table_name = 'profiles'
             order by column_name
          `) as { column_name: string }[];
          profileColumns = cols.map((c) => c.column_name);
          const rows = (await sql`select count(*)::int as n from public.profiles`) as {
            n: number;
          }[];
          profileCount = rows[0]?.n ?? 0;
        } catch (error) {
          profileColumns = [String(error)];
        }
        return Response.json({
          tables: tables.map((t) => t.table_name),
          profileColumns,
          profileCount,
        });
      },
    },
  },
});
