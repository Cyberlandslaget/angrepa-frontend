import { ReactNode } from 'react';

export default function PinButtonsWrapper({
  pin,
  fullscreen,
  updatePin,
  updateFullscreen,
  className = '',
  children,
}: {
  pin: boolean;
  fullscreen: boolean;
  updatePin: () => void;
  updateFullscreen: () => void;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`tertiaryColor w-full h-full p-2 rounded-md overflow-auto ${
        pin ? '!order-1 [grid-column:span_3] simple' : ''
      } ${
        fullscreen
          ? 'absolute z-20 mt-[3.5rem] top-3 left-3 [width:calc(100%-1.5rem)] [height:calc(100%-2.25rem-2.75rem)] fullscreen'
          : ''
      } ${className}`}
    >
      <div className="secondaryColor sticky flex top-0 w-[6.85rem] h-6 -my-1 z-10 -translate-y-2 -translate-x-2 rounded-br-md text-xs gap-1 p-1 items-center [.simple_&]:w-[7.75rem]">
        <button
          className="px-2 bg-slate-950 bg-opacity-60 text-[0.6rem] rounded-sm hover:bg-black transition-all [.simple_&]:!bg-black [.simple_&]:cursor-default"
          onClick={updatePin}
        >
          {pin ? 'Pinned' : 'Pin'}
        </button>
        <button
          className="px-2 bg-slate-950 bg-opacity-60 text-[0.6rem] rounded-sm hover:bg-black transition-all [.fullscreen_&]:!bg-black"
          onClick={updateFullscreen}
        >
          Fullscreen
        </button>
      </div>
      {children}
    </div>
  );
}
