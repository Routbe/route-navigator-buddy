import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Laatste stap: alles staat klaar → door naar het gewone registratievenster. */
export function TourAccountStep({
  handle,
  displayName,
  onRegister,
}: {
  handle: string;
  displayName: string;
  onRegister: () => void;
}) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Bewaar je profiel</h2>
        <p className="text-sm text-muted-foreground">
          Maak een account aan of log in. Alles wat je hierboven koos is al veilig bewaard en wordt
          automatisch op je profiel gezet zodra je binnen bent — ook als je de e-maillink op een
          ander toestel opent.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 text-sm">
        <p className="text-muted-foreground">Jouw eerste adres</p>
        <p className="mt-1 font-medium">rout.be/u/{handle || "jouwnaam12"}</p>
        {displayName ? <p className="mt-1 text-muted-foreground">{displayName}</p> : null}
      </div>

      <Button type="button" className="h-12 w-full" onClick={onRegister}>
        Registreren of inloggen
        <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
      </Button>

      <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        Je concept blijft tijdelijk bewaard tot je profiel live staat. Daarna wordt het gewist.
      </p>
    </div>
  );
}
