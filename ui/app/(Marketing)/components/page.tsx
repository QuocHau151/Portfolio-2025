export default function Components() {
  return (
    <div className="relative mx-auto mb-20 flex w-[70vw] items-start justify-center gap-10">
      <div className="sticky top-[150px] mt-10 basis-1/5 space-y-4">
        <h1 className="text-[30px] font-bold">All Components</h1>

        <div className="mb-5 w-full rounded-lg border border-neutral-400 px-4 py-2 text-neutral-400">
          Search
        </div>

        {/* Đây là div chứa danh sách và có scroll */}
        <div className="scrollbar-thin scrollbar-thumb-neutral-500 scrollbar-track-black flex h-[70vh] flex-col gap-1 overflow-y-scroll pr-2">
          <p className="font-bold">Text Animation</p>
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="px-4 py-2 text-neutral-400">
              <h1>{`Component ${i + 1}`}</h1>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-[50px] grid h-full basis-4/5 grid-cols-2 gap-5">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="flex flex-col items-start justify-center gap-3 rounded-lg p-4 text-neutral-400"
          >
            <div className="mb-3 h-[500px] w-full rounded-2xl border border-neutral-400"></div>
            <h1 className="text-xl font-bold text-white">{`Component ${i + 1}`}</h1>
            <p className="line-clamp-2 text-sm text-neutral-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              suscipit ipsum est neque eligendi natus inventore dolor beatae,
              magnam animi velit tempora placeat, sed adipisci tempore voluptate
              vitae in et!
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
