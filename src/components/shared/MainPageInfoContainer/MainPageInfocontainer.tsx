interface MainPageInfoProps {
  title: string;
}

export const MainPageInfoContainer: React.FC<MainPageInfoProps> = ({
  title,
}) => <div>{title}</div>;
