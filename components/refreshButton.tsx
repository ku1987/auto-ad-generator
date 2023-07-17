import { MouseEventHandler } from "react";
import { Loader } from "./loader";

export const RefreshButton = (
  isRefreshing: boolean,
  queueId: number,
  handleRefresh: MouseEventHandler<HTMLButtonElement>
) => {
  if (isRefreshing) {
    return <Loader />;
  }

  if (!queueId) {
    return <></>;
  }

  return (
    <button
      className="bg-neutral-500 hover:bg-neutral-400 w-24 text-white font-bold py-2 px-4 rounded mt-2"
      onClick={handleRefresh}
    >
      Refresh
    </button>
  );
};
