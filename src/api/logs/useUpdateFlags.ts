import { useSetAtom } from "jotai";
import { flagLogAtom } from "utils/atoms";
import { FlagType } from "utils/types";

export default function useUpdateFlags() {
  const setFlags = useSetAtom(flagLogAtom);

  const updateFlags = (newFlags: FlagType[]) => {
    setFlags((prev) => {
      const prevFlags = prev?.filter(e => !newFlags.some(n => n.id === e.id));
      return [...(prevFlags ?? []), ...newFlags];
    });
  };

  return updateFlags;
}