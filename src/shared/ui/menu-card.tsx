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
    <Link to={link} className="group">
      <Card className="apply h-50 w-50 rounded-2xl border-border/60 bg-card/70 backdrop-blur-md p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            {icon}
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{title}</h3>

            {badge && (
              <span
                className="
                  rounded-full
                  bg-primary/10
                  px-2
                  py-0.5
                  text-xs
                  font-medium
                  text-primary
                ">
                {badge}
              </span>
            )}
          </div>

          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </Card>
    </Link>
  );
}
