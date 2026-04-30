interface Props {
  title: string;
}

const DashboardHeader = ({ title }: Props) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <h1 className="text-xl sm:text-2xl font-semibold ">{title}</h1>
      <p className="text-[14px] text-gray-300 dark:text-gray-500">
        Welcome to <span className="font-medium ">{title.toLowerCase()}</span>{" "}
        management
      </p>
    </div>
  );
};

export default DashboardHeader;
