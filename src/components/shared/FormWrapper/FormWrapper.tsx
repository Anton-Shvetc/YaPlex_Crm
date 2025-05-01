
interface FormWrapperI {
  children: React.ReactNode;
  title: string;
  btnTitle: string;
  onSubmit: () => void;
}

export const FormWrapper: React.FC<FormWrapperI> = ({
    children,
    btnTitle,
    title,
    onSubmit,
  }) => {
    return (
      <form onSubmit={onSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">{title}</h2>
        {children}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          {btnTitle}
        </button>
      </form>
    )
  }