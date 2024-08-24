interface Props {
  name: string;
}

// List 컴포넌트 정의
const List = ({ name }: Props) => {
  return (
    <div className="m-[3px] px-[20px] w-[317px] h-[52px] bg-[#f2f2f2] flex items-center text-2xl">
      {name}
    </div>
  );
};

export default List;
