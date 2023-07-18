import { useVirtualizer } from '@tanstack/react-virtual';
import React from 'react';

type DataType = {
  team?: number;
  tick?: number;
  code?: string;
  output?: string;
  timestamp?: Date;
  service?: string;

  status?: string;
  raw?: string;
};
type LoggingDisplayType = {
  data: DataType[];
  parser: 'exploit' | 'submission';
};

export const exploitDataParser = (data: DataType) => {
  return (
    <div className={`flex w-full h-full ${data.status ?? ''}`} title={data.raw}>
      <p>{data.raw}</p>
      <span className="status">{data.status}</span>
    </div>
  );
};
export const flagSubmissionDataParser = (data: DataType) => {
  return (
    <div className={`flex w-full h-full ${data.code ?? ''}`}>
      <span className="status tick" title="tick">
        {data.tick}
      </span>
      <span className="status teamid" title="team">
        {data.team}
      </span>
      <span className="status service" title="service">
        {data.service}
      </span>
      <p title={data.raw}>{data.output}</p>
      <span className="status" title="code">
        {data.code}
      </span>
    </div>
  );
};

const LoggingDisplay = ({ data, parser }: LoggingDisplayType) => {
  // The scrollable element for your list
  const parentRef = React.useRef(null);

  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  return (
    <>
      {/* The scrollable element for your list */}
      <div
        ref={parentRef}
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          overflow: 'auto', // Make it scroll!
          width: '100%',
          position: 'relative',
        }}
      >
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
                ? flagSubmissionDataParser(data[virtualItem.index])
                : exploitDataParser(data[virtualItem.index])}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default LoggingDisplay;
