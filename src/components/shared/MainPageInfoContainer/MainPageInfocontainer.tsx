interface MainPageInfoProps {
  title: string;
  children?: React.ReactNode;
}

export const MainPageInfoContainer: React.FC<MainPageInfoProps> = ({
  title,
  children,
}) => (
  <div>
    {title}

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
      {children}
    </div>
  </div>
);
