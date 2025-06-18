interface MainPageTaskCardI {
  name: string;
  deal?: string | undefined;
  deadline?: string;
  status?: string;
}

export const MainPageTaskCard: React.FC<MainPageTaskCardI> = ({
  name,
  deal,
  deadline,
  status,
}) => {
  return (
    <div className="flex flex-col justify-between p-4 h-[126px] rounded-lg shadow-md bg-white dark:bg-gray-800">
      <div>
        <div className="font-bold text-gray-900 text-base dark:text-white">
          {name}
        </div>
        <div className="text-gray-500 text-sm font-normal mt-1 dark:text-white">
          {deal}
        </div>
      </div>

      <div className="flex items-center gap-1">
        {deadline && <p className="">{deadline}</p>}

        <p>{status}</p>
      </div>
    </div>
  );
};
