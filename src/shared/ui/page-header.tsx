import { memo } from "react";

type PageHeaderProps = {
  left?: React.ReactNode;
  title?: string;
  subtitle?: string | null;
  right?: React.ReactNode;
  user?: React.ReactNode;
};

export const PageHeader = memo(function PageHeader({
  left,
  title,
  subtitle,
  right,
  user,
}: PageHeaderProps) {
  return (
    <header className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-6">
      <div className="min-w-0">
        {(left || user) && (
          <div className="mb-4 flex min-w-0 flex-wrap items-center gap-3 sm:mb-5">
            {left}
            {user}
          </div>
        )}
        {title && <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>}
        {subtitle?.trim() && (
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {subtitle}
          </p>
        )}
      </div>
      {right && (
        <div className="relative z-20 flex w-full items-center sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">
          {right}
        </div>
      )}
    </header>
  );
});
