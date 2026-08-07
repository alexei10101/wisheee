import { Button } from "@/shared/ui/kit/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="group relative size-9 overflow-hidden rounded-full border border-border/70 bg-background/60 shadow-sm transition-all duration-300 hover:border-primary/40 hover:bg-accent hover:shadow-md hover:shadow-primary/10"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
      title={isDark ? "Светлая тема" : "Тёмная тема"}
    >
      <Sun
        data-theme-icon
        className="absolute size-[18px] scale-100 rotate-0 text-amber-500 dark:scale-0 dark:-rotate-90"
      />
      <Moon
        data-theme-icon
        className="absolute size-[17px] scale-0 rotate-90 text-violet-300 dark:scale-100 dark:rotate-0"
      />
      <span className="sr-only">Сменить тему</span>
    </Button>
  );
}
