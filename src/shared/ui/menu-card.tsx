import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { Card } from "./kit/card";

type MenuCardProps = {
  title: string;
  description: string;
  link: string;
  icon?: React.ReactNode;
  badge?: string;
};

export function MenuCard({ title, description, link, icon, badge }: MenuCardProps) {
  return (
    <Link
      to={link}
      className="group block h-full rounded-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Card className="h-full min-h-42 gap-0 border-border/60 bg-card/80 p-5 py-5 backdrop-blur-md hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
        <div className="flex items-start justify-between">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-200 group-hover:-rotate-2 motion-reduce:transform-none motion-reduce:transition-none">
            {icon}
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
        </div>

        <div className="mt-5">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold tracking-tight">{title}</h3>

            {badge && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {badge}
              </span>
            )}
          </div>

          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
      </Card>
    </Link>
  );
}
