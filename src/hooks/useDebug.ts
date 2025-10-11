import { useEffect, useState } from "react";

export default function useDebug(): boolean {
  const [isDebug, setIsDebug] = useState<boolean>(false);

  useEffect(() => {
    const checkHash = (): void => {
      const currentHash: string = window.location.hash;
      if (
        currentHash === "#debug" &&
        window.location.host !== "spicemyway.com"
      ) {
        setIsDebug(true);
      } else {
        setIsDebug(false);
      }
    };

    checkHash();

    window.addEventListener("hashchange", checkHash);

    return () => {
      window.removeEventListener("hashchange", checkHash);
    };
  }, []);

  return isDebug;
}
