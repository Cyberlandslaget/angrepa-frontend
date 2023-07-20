import { RefObject, useCallback, useEffect, useState } from 'react';
import { DragDirection } from './enums';

export default function useResizeableComponent(
  resizableRef: RefObject<HTMLElement | null>
) {
  const [activeHandler, setActiveHandler] = useState<DragDirection | null>(
    null
  );

  const mouseMove = useCallback(
    (e: MouseEvent) => {
      if (resizableRef === null) return;
      if (activeHandler === DragDirection.Row) {
        // Get the current mouse position and calculate current percentage of the screen
        const pos = 100 - ((e.clientY - 15) / window.innerHeight) * 100;
        if (pos < 4 || pos > 87) return;
        (
          resizableRef.current as HTMLElement
        ).style.gridTemplateRows = `1fr 0.2rem ${pos}%`;
      } else if (activeHandler === DragDirection.Column) {
        const pos = 100 - ((e.clientX + 10) / window.innerWidth) * 100;
        if (pos < 20 || pos > 80) return;
        (
          resizableRef.current as HTMLElement
        ).style.gridTemplateColumns = `1fr 0.2rem ${pos}%`;
      }
    },
    [resizableRef, activeHandler]
  );

  const removeListeners = useCallback(() => {
    window.removeEventListener('mousemove', mouseMove);
    window.removeEventListener('mouseup', removeListeners);
  }, [mouseMove]);

  const mouseUp = useCallback(() => {
    setActiveHandler(null);
    removeListeners();
  }, [setActiveHandler, removeListeners]);

  useEffect(() => {
    if (activeHandler !== null) {
      window.addEventListener('mousemove', mouseMove);
      window.addEventListener('mouseup', mouseUp);
    }
    return () => {
      removeListeners();
    };
  }, [activeHandler, mouseMove, mouseUp, removeListeners]);

  return {
    setActiveHandler,
  };
}
