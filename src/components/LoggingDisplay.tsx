import { useVirtualizer } from '@tanstack/react-virtual';
import React from 'react';
import { DataType, LoggingDisplayProps } from '../utils/types';
import { useAtomValue } from 'jotai';
import { sensorFlagAtom } from 'utils/atoms';

const exploitDataParser = (data: DataType) => {
  return (
    <div
      className={`log grid gap-1 w-full h-full brightness-90 [grid-template-columns:1fr_4rem] items-center text-center text-sm ${
        data.status ?? ''
      }`}
      title={data.raw}
    >
      <p className="text-left text-ellipsis whitespace-nowrap overflow-hidden pl-1 [color:var(--logBackgroundColor)]">
        {data.raw}
      </p>
      <span className="rounded-sm [background-color:var(--logBackgroundColor)] [color:var(--logColor)]">
        {data.status}
      </span>
    </div>
  );
};
const flagSubmissionDataParser = (data: DataType, sensor: boolean) => {
  return (
    <div
      className={`log grid gap-1 w-full h-full brightness-90 [grid-template-columns:2.25rem_2.25rem_8rem_1fr_3rem] items-center text-center text-sm ${
        data.code ?? ''
      }`}
    >
      <span className="secondaryColor rounded-sm py-[0.1rem]" title="tick">
        {data.tick}
      </span>
      <span className="secondaryColor rounded-sm py-[0.1rem]" title="team">
        {data.team}
      </span>
      <span className="secondaryColor rounded-sm py-[0.1rem]" title="service">
        {data.service}
      </span>
      <p
        title={data.raw}
        className="text-left text-ellipsis whitespace-nowrap overflow-hidden pl-1 [color:var(--logBackgroundColor)]"
      >
        {sensor
          ? data.output?.replace(
              /(.*)?\{(.*)?(.{5})\}(.*)/g,
              '$1{$2' + 'x'.repeat(5) + '}$4'
            )
          : data.output}
      </p>
      <span
        className="rounded-sm [background-color:var(--logBackgroundColor)] [color:var(--logColor)]"
        title="code"
      >
        {data.code}
      </span>
    </div>
  );
};

const LoggingDisplay = ({ data, parser }: LoggingDisplayProps) => {
  // The scrollable element for your list
  const parentRef = React.useRef(null);
  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 28,
  });
  const sensor = useAtomValue(sensorFlagAtom);

  return (
    <>
      {/* The scrollable element for your list */}
      <div ref={parentRef}>
        {/* The large inner element to hold all of the items */}
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {/* Only the visible items in the virtualizer, manually positioned to be in view */}
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {parser === 'submission'
                ? flagSubmissionDataParser(data[virtualItem.index], sensor)
                : exploitDataParser(data[virtualItem.index])}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default LoggingDisplay;
