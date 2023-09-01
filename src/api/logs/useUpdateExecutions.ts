import { useSetAtom } from "jotai";
import { executionLogAtom } from "utils/atoms";
import { ExecutionType } from "utils/types";

export default function useUpdateExecutions() {
  const setExecutions = useSetAtom(executionLogAtom);

  const updateExecutions = (newExecutions: ExecutionType[]) => {
    setExecutions((prev) => {
      const prevExecutions = prev?.filter(e => !newExecutions.some(n => n.id === e.id));
      return [...(prevExecutions ?? []), ...newExecutions];
    });
  };

  return updateExecutions;
}