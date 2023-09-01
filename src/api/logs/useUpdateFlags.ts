import { useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { flagLogAtom } from 'utils/atoms';
import { FlagType } from 'utils/types';

export default function useUpdateFlags() {
  const setFlags = useSetAtom(flagLogAtom);

  const updateFlags = useCallback(
    (newFlags: FlagType[]) => {
      setFlags((prev) => {
        const prevFlags = prev?.filter(
          (e) => !newFlags.some((n) => n.id === e.id)
        );
        return [...(prevFlags ?? []), ...newFlags];
      });
    },
    [setFlags]
  );

  return updateFlags;
}
