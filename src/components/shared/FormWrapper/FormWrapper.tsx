interface FormWrapperI {
  children: React.ReactNode;
  title: string;
  btnTitle: string;
  onSubmit: () => void;
  showMobileForm?: boolean;
}

export const FormWrapper: React.FC<FormWrapperI> = ({
  children,
  btnTitle,
  title,
  onSubmit,
  showMobileForm = false,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`
        space-y-6 
        ${
          !showMobileForm
            ? "bg-white/80 dark:bg-gray-900 backdrop-blur-sm rounded-2xl shadow-xl p-6"
            : "bg-transparent"
        }
      `}
    >
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        {title}
      </h2>
      {children}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
      >
        {btnTitle}
      </button>
    </form>
  );
};
