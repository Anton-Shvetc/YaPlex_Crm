interface MainPageClientCardI {
  name: string;
  company?: string;
  dealsCount?: number;
}

export const MainPageClientCard: React.FC<MainPageClientCardI> = ({
  name,
  company,
  dealsCount = 0,
}) => {
  return (
    <div className="flex flex-col justify-between p-4 h-[126px] rounded-lg shadow-md bg-white">
      <div>
        <div className="font-bold text-gray-900 text-base">{name}</div>
        <div className="text-gray-500 text-sm font-normal mt-1">{company}</div>
      </div>
      {dealsCount ||
        (dealsCount === 0 && (
          <div className="flex items-center gap-1">
            <p className="text-emerald-500 font-bold text-lg">{dealsCount}</p>
            <p>сделок</p>
          </div>
        ))}
    </div>
  );
};
