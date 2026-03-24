import { memo } from "react";

type PageHeaderProps = {
  style?: string;
  left?: React.ReactNode;
  title?: string;
  subtitle?: string;
  right?: React.ReactNode;
  user?: React.ReactNode;
};

export const PageHeader = memo(function PageHeader({ style, left, title, subtitle, right, user }: PageHeaderProps) {
  return (
    <div className={`flex justify-between items-baseline ${style}`}>
      <div>
        <div>
          <div className="flex gap-5">
            {left} {user}
          </div>
          <h2 className="text-3xl mt-5">{title}</h2>
        </div>
        <p className="text-muted-foreground text-xl">{subtitle}</p>
      </div>

      <div>{right}</div>
    </div>
  );
});
