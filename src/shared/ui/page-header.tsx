import { memo } from "react";

type PageHeaderProps = {
  left?: React.ReactNode;
  title?: string;
  subtitle?: string;
  right?: React.ReactNode;
  user?: React.ReactNode;
};

export const PageHeader = memo(function PageHeader({ left, title, subtitle, right, user }: PageHeaderProps) {
  return (
    <>
      <div className="justify-between items-baseline hidden sm:flex">
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

      <div className="sm:hidden">
        {user}
        <div className="flex justify-between items-baseline ">
          <div>
            <h2 className="text-xl">{title}</h2>
            <p className="text-muted-foreground text-sm">{subtitle}</p>
          </div>
          <div>{left}</div>
        </div>
      </div>

      <div className="sm:hidden fixed bottom-0 left-0 right-0 py-1 px-2 bg-white w-full z-20">{right}</div>
    </>
  );
});
