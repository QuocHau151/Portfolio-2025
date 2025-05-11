"use client";
import {
  useComponentQuery,
  useGetTypeComponentQuery,
} from "@/queries/useComponent";
import Image from "next/image";

export default function Components() {
  const { data: listTypeComponent } = useGetTypeComponentQuery();
  const dataType = listTypeComponent?.payload.data;
  const { data: listComponent } = useComponentQuery();
  const dataComponent = listComponent?.payload.data;

  return (
    <div className="relative mx-auto mb-20 flex w-full items-start justify-center gap-10 lg:w-[80%]">
      <div className="sticky top-[150px] mt-10 hidden basis-1/5 space-y-4 lg:block">
        <h1 className="text-[30px] font-bold whitespace-nowrap">
          All Components
        </h1>
        <div className="mb-10 w-full rounded-lg border border-neutral-400 px-4 py-2 text-neutral-400">
          Search
        </div>
        {/* Đây là div chứa danh sách và có scroll */}
        {dataType?.map((item, index) => (
          <div
            key={index}
            className="scrollbar-thin scrollbar-thumb-neutral-500 scrollbar-track-black flex h-min flex-col gap-1 overflow-y-scroll pr-2"
          >
            <h1 className="mb-3 font-bold">{item.name}</h1>
            {item.components.map((cpn, i) => (
              <div key={i} className="px-4 py-1 text-neutral-400">
                <h1>{cpn.name}</h1>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-[50px] grid h-full basis-full grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {dataComponent?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-start justify-center gap-3 rounded-lg p-4 text-neutral-400"
          >
            <div className="mb-3 aspect-square w-full overflow-hidden rounded-2xl border border-neutral-400">
              <Image
                src={item.image}
                alt={item.name}
                width={500}
                height={500}
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>
            <h1 className="text-xl font-bold text-white">{item.name}</h1>
            <p className="line-clamp-2 text-sm text-neutral-400">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
