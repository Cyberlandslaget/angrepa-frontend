import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { executionLogAtom, exploitsAtom } from 'utils/atoms';
import { ExecutionType } from 'utils/types';

export default function useUpdateExecutions() {
  const setExecutions = useSetAtom(executionLogAtom);

  const updateExecutions = useCallback(
    (newExecutions: ExecutionType[]) => {
      setExecutions((prev) => {
        const prevExecutions = prev?.filter(
          (e) => !newExecutions.some((n) => n.id === e.id)
        );
        return [...(prevExecutions ?? []), ...newExecutions];
      });
    },
    [setExecutions]
  );

  return updateExecutions;
}
