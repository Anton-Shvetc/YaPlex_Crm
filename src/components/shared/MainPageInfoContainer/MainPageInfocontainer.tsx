import { clsx } from "clsx";

interface MainPageInfoProps {
  title: string;
  children?: React.ReactNode | null;
  isGrid?: boolean;
  pageType?: string;
  actionButton?: React.ReactNode | null;
}

export const MainPageInfoContainer: React.FC<MainPageInfoProps> = ({
  title,
  children,

  isGrid = true,
  actionButton,
}) => {
  return (
    <div>
      {title}

      <div
        className={clsx(
          "w-full",
          isGrid
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            : "flex flex-col gap-2"
        )}
      >
        {children || "Нет данных"}
      </div>

      {actionButton}
    </div>
  );
};
