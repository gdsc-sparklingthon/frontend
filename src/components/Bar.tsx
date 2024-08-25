interface BarProps {
  disable: boolean;
  percentage: number | undefined;
}

const Bar = ({ disable, percentage }: BarProps) => {
  return (
    <div>
      <p className="text-base text-black">진척도</p>
      <div className="relative w-full h-[22px] bg-[#f2f2f2]">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#FFE091] to-[#FFA674]"
          // style={{ width: '80%' }}
          style={{ width: disable ? '80%' : `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>0</span>
        <span>27</span>
      </div>
    </div>
  );
};

export default Bar;
