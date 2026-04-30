interface Props {
  title: string;
}

const DashboardHeader = ({ title }: Props) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <h1 className="text-xl sm:text-2xl font-semibold ">{title}</h1>
      <p className="text-[14px]">
        Welcome back manage your{" "}
        <span className="font-medium ">{title.toLowerCase()}</span> here
      </p>
    </div>
  );
};

export default DashboardHeader;
