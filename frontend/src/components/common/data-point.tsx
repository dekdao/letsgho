interface DataPointProps {
  topic: string;
  data: string;
}
export function DataPoint({ topic, data }: DataPointProps) {
  return (
    <div className="rounded-full py-2 px-6 border-gray-200 border-[1px] flex-col justify-center text-center">
      <h1>{topic}</h1>
      <p className=" text-xl">{data}</p>
    </div>
  );
}
