import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/** Stap 6: profielfoto — een URL volstaat; uploaden kan later in de Studio. */
export function TourAvatarStep({
  avatarUrl,
  displayName,
  onAvatarUrl,
}: {
  avatarUrl: string;
  displayName: string;
  onAvatarUrl: (value: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Je profielfoto</h2>
        <p className="text-sm text-muted-foreground">
          Plak de link naar een foto. Na registratie kan je in de Studio een bestand uploaden.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-muted text-lg font-semibold">
          {avatarUrl ? (
            <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            (displayName.trim()[0] ?? "R").toUpperCase()
          )}
        </span>
        <div className="w-full space-y-2">
          <Label htmlFor="tour-avatar">Foto-URL</Label>
          <Input
            id="tour-avatar"
            value={avatarUrl}
            onChange={(e) => onAvatarUrl(e.target.value)}
            placeholder="https://…/foto.jpg"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
