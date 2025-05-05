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
  };
  secondaryAction?: {
    text: string;
    onClick: () => void;
    className?: string;
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
  return (
    <form onSubmit={onSubmit} className={`space-y-4 ${additionalStyle}`}>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        {title}
      </h2>
      {children}

      {btnTitle && (
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          {btnTitle}
        </button>
      )}

      {(primaryAction || secondaryAction) && (
        <div className="mt-6 flex gap-3">
          {primaryAction && (
            <button
              type={primaryAction.type}
              className={`w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors ${
                primaryAction.className || ""
              }`}
              onClick={primaryAction.onClick}
            >
              {primaryAction.text}
            </button>
          )}
          {secondaryAction && (
            <button
              type="button"
              className={`w-full px-4 py-2 bg-gray-200 dark:bg-transparent text-gray-800 dark:text-white border border-gray-400 dark:border-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors ${
                secondaryAction.className || ""
              }`}
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.text}
            </button>
          )}
        </div>
      )}
    </form>
  );
};
