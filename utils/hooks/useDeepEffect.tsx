import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";
import { useEffect, useRef } from "react";

export default function useDeepEffect(effectFunc: () => void, deps: any[]) {
  const isFirst = useRef(true);
  const prevDeps = useRef(cloneDeep(deps));

  useEffect(() => {
    const isSame = prevDeps.current.every((obj: any, index: number) => {
      const same = isEqual(obj, deps[index]);
      return same;
    });

    if (isFirst.current || !isSame) {
      effectFunc();
    }

    isFirst.current = false;
    prevDeps.current = cloneDeep(deps);
  }, deps);
}
