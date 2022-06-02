const Loading = () => {
  return (
    <div className="space-y-4">
      <h1 className="h-20 pb-2 text-3xl font-bold text-left rounded-lg md:text-6xl text-orangeDTTV -rotate-2 bg-neutral-100 dark:bg-neutral-800 animate-pulse"></h1>
      <div className="space-y-4 rounded-lg bg-neutral-100 dark:bg-neutral-800 animate-pulse">
        <p className="text-xl font-bold bg-neutral-100 dark:bg-neutral-800 "></p>
        <div className="flex flex-col items-center content-center space-y-2">
          <div className="flex space-x-2">
            <div className="h-10 text-3xl border-b-4 text-orangeDTTV border-orangeDTTV -rotate-3 animate-pulse bg-neutral-100"></div>
            <p className="h-20 text-xl font-light bg-neutral-100 dark:bg-neutral-800"></p>
          </div>
          <div className="flex space-x-2">
            <span className="h-10 text-3xl border-b-4 text-orangeDTTV bg-neutral-100 dark:bg-neutral-800 border-orangeDTTV -rotate-3"></span>
            <p className="text-xl font-light bg-neutral-100 dark:bg-neutral-800 animate-pulse"></p>
          </div>
          <div className="flex space-x-2">
            <span className="h-10 text-3xl border-b-4 text-orangeDTTV bg-neutral-100 dark:bg-neutral-800 border-orangeDTTV -rotate-3"></span>
            <p className="space-y-2 text-xl font-light bg-neutral-100 dark:bg-neutral-800 animate-pulse"></p>
          </div>
        </div>
      </div>
      <div className="h-40 rounded-lg bg-neutral-100 dark:bg-neutral-800 animate-pulse">
        <p className="text-xl font-bold bg-neutral-200 dark:bg-neutral-800"></p>
      </div>
    </div>
  );
};
export default Loading;
