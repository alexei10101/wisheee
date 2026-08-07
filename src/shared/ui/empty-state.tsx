import type { ReactNode } from "react";

type EmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-12 text-center sm:py-16">
      {icon && (
        <div className="mb-4 grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
          {icon}
        </div>
      )}
      <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
      {description && (
        <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
