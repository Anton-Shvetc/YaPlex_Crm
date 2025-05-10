import { ButtonUi } from "@/components/ui/ButtonUi";
import { useLoaderStore } from "@/store/useLoaderStore";

interface FormWrapperI {
  children: React.ReactNode;
  title?: string;
  btnTitle?: string;
  onSubmit: () => void;
  additionalStyle?: string;
  primaryAction?: {
    text: string;
    onClick?: () => void;
    className?: string;
    type: "button" | "submit";
  } ;
  secondaryAction?: {
    text: string;
    variant?: string;
    onClick?: () => void;
  };
}

export const FormWrapper: React.FC<FormWrapperI> = ({
  children,
  btnTitle = "",
  title = "",
  onSubmit,
  additionalStyle = "",
  primaryAction,
  secondaryAction,
}) => {
  const { isLoading } = useLoaderStore();

  return (
    <form onSubmit={onSubmit} className={`space-y-4 ${additionalStyle}`}>
      {title && (
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          {title}
        </h2>
      )}
      <div className="space-y-4">
        {children}
      </div>
      {/* 
 TODO - пока нужно для авторизации, регистрации, потом тоже перевести на primaryAction и тд */}
      {btnTitle && (
        <button
          type="submit"
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          {btnTitle}
        </button>
      )}

      {(primaryAction || secondaryAction) && (
        <div className="mt-8 flex flex-col md:flex-row gap-3">
          {primaryAction && (
            <ButtonUi
              type="submit"
              variant="primary"
              disabled={isLoading}
              label={primaryAction.text}
              onClick={primaryAction.onClick}
              className="w-full"
            />
          )}
          {secondaryAction && (
            <ButtonUi
              type="button"
              disabled={isLoading}
              label={secondaryAction.text}
              onClick={secondaryAction.onClick}
              className="hidden md:block"
            />
          )}
        </div>
      )}
    </form>
  );
};
