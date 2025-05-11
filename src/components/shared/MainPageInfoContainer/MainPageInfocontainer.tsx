import { ButtonUi } from "@/components/ui/ButtonUi";
import { useModalStore } from "@/store/modalStore";
import { useLoaderStore } from "@/store/useLoaderStore";
import { clsx } from "clsx";
import { useForm } from "react-hook-form";

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
  pageType,
  isGrid = true,
  actionButton,
}) => {
  const { isLoading } = useLoaderStore();

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
