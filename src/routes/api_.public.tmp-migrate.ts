import { createFileRoute } from "@tanstack/react-router";

/** Tijdelijke migratieloper (wordt na gebruik verwijderd). */
const files = import.meta.glob("/db/**/*.sql", { query: "?raw", import: "default", eager: true }) as Record<
  string,
  string
>;

/** Splitst SQL op puntkomma's buiten string- en dollar-quotes. */
function split(sqlText: string): string[] {
  const out: string[] = [];
  let cur = "";
  let i = 0;
  let tag: string | null = null;
  let quote: string | null = null;
  while (i < sqlText.length) {
    const ch = sqlText[i]!;
    const rest = sqlText.slice(i);
    if (!quote && !tag) {
      if (rest.startsWith("--")) {
        const nl = sqlText.indexOf("\n", i);
        i = nl === -1 ? sqlText.length : nl;
        continue;
      }
      const m = /^\$[A-Za-z_]*\$/.exec(rest);
      if (m) {
        tag = m[0];
        cur += tag;
        i += tag.length;
        continue;
      }
      if (ch === "'" || ch === '"') {
        quote = ch;
        cur += ch;
        i++;
        continue;
      }
      if (ch === ";") {
        if (cur.trim()) out.push(cur.trim());
        cur = "";
        i++;
        continue;
      }
    } else if (tag) {
      if (rest.startsWith(tag)) {
        cur += tag;
        i += tag.length;
        tag = null;
        continue;
      }
    } else if (quote) {
      if (ch === quote) quote = null;
    }
    cur += ch;
    i++;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

export const Route = createFileRoute("/api_/public/tmp-migrate")({
  server: {
    handlers: {
      GET: async () => {
        const { sql } = await import("@/lib/neon");
        const names = Object.keys(files).sort();
        const report: { file: string; ok: number; errors: string[] }[] = [];
        for (const name of names) {
          const statements = split(files[name]!);
          let ok = 0;
          const errors: string[] = [];
          for (const statement of statements) {
            try {
              await sql.query(statement);
              ok++;
            } catch (error) {
              errors.push(
                `${statement.slice(0, 90).replace(/\s+/g, " ")} → ${
                  error instanceof Error ? error.message : String(error)
                }`,
              );
            }
          }
          report.push({ file: name, ok, errors });
        }
        return Response.json({ report });
      },
    },
  },
});
