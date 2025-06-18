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
  const getDealWord = (count: number) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) return "сделка";
    if (
      lastDigit >= 2 &&
      lastDigit <= 4 &&
      !(lastTwoDigits >= 12 && lastTwoDigits <= 14)
    ) {
      return "сделки";
    }
    return "сделок";
  };

  return (
    <div className="flex flex-col justify-between p-4 h-[126px] rounded-lg shadow-md bg-white dark:bg-gray-800 dark:text-white">
      <div>
        <div className="font-bold text-gray-900 text-base dark:text-white">{name}</div>
        <div className="text-gray-500 text-sm font-normal mt-1 dark:text-white">{company}</div>
      </div>
      {(dealsCount || dealsCount === 0) && (
        <div className="flex items-center gap-1">
          <p className="text-emerald-500 font-bold text-lg">{dealsCount}</p>
          <p>{getDealWord(dealsCount)}</p>
        </div>
      )}
    </div>
  );
};
