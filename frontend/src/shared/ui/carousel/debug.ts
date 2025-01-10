type CreateDebugHelpersParams = {
  debugName?: string;
  subscribe: () => void;
  unSubscribe: () => void;
};

export function createDebugHelpers({debugName, subscribe, unSubscribe}: CreateDebugHelpersParams) {
  let count = 0;

  const logCount = () => {
    console.log('@count of ' + debugName, count);
  };

  const subscribeWithDebug = () => {
    count += 1;
    logCount();
    subscribe();
  };

  const unSubscribeWithDebug = () => {
    count -= 1;
    logCount();
    unSubscribe();
  };

  return {count, subscribeWithDebug, unSubscribeWithDebug, logCount};
}
