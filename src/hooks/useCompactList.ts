import { useState } from "react";

const KEY = "compactList";

export function useCompactList(): [boolean, (value: boolean) => void] {
  const [compact, setCompact] = useState(
    () => localStorage.getItem(KEY) === "true",
  );

  function update(value: boolean) {
    localStorage.setItem(KEY, String(value));
    setCompact(value);
  }

  return [compact, update];
}
