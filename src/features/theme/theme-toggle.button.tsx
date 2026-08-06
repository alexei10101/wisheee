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
      <Sun className="absolute size-[18px] rotate-0 scale-100 text-amber-500 transition-all duration-500 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-[17px] rotate-90 scale-0 text-violet-300 transition-all duration-500 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Сменить тему</span>
    </Button>
  );
}
