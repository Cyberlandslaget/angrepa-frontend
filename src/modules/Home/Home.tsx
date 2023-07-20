import Navigation from 'components/Navigation';
import {
  DUMMY_EXPLOIT_LOG,
  DUMMY_FLAGSUBMISSION_LOG,
  DUMMY_SCOREBOARD_DATA,
} from 'utils/constants';
import LoggingDisplay from 'components/LoggingDisplay';
import SimpleDisplay from 'components/SimpleDisplay';
import { useState } from 'react';
import { HomePanelEnum } from 'utils/enums';
import PinButtonsWrapper from 'components/PinButtonsWrapper';

export default function Home() {
  const [pin, setPin] = useState(HomePanelEnum.Simple);
  const [fullscreen, setFullscreen] = useState<HomePanelEnum | null>(null);

  const updatePin = (display: HomePanelEnum) => {
    console.log(display);
    setPin(display);
  };

  const updateFullscreen = (display: HomePanelEnum) => {
    if (fullscreen === display) setFullscreen(null);
    else setFullscreen(display);
  };

  return (
    <main className="w-full h-full grid grid-cols-2 [grid-template-rows:2.75rem_1fr_14rem] gap-3">
      <Navigation className="[grid-column:span_2]" />

      <PinButtonsWrapper
        pin={pin === HomePanelEnum.Simple}
        fullscreen={fullscreen === HomePanelEnum.Simple}
        updateFullscreen={() => updateFullscreen(HomePanelEnum.Simple)}
        updatePin={() => updatePin(HomePanelEnum.Simple)}
      >
        <SimpleDisplay
          data={{
            scoreboard: DUMMY_SCOREBOARD_DATA,
            flag: DUMMY_FLAGSUBMISSION_LOG,
          }}
        />
      </PinButtonsWrapper>

      <PinButtonsWrapper
        pin={pin === HomePanelEnum.Runner}
        fullscreen={fullscreen === HomePanelEnum.Runner}
        updateFullscreen={() => updateFullscreen(HomePanelEnum.Runner)}
        updatePin={() => updatePin(HomePanelEnum.Runner)}
      >
        <LoggingDisplay data={DUMMY_EXPLOIT_LOG} parser={'exploit'} />
      </PinButtonsWrapper>

      <PinButtonsWrapper
        pin={pin === HomePanelEnum.Submission}
        fullscreen={fullscreen === HomePanelEnum.Submission}
        updateFullscreen={() => updateFullscreen(HomePanelEnum.Submission)}
        updatePin={() => updatePin(HomePanelEnum.Submission)}
      >
        <LoggingDisplay data={DUMMY_FLAGSUBMISSION_LOG} parser={'submission'} />
      </PinButtonsWrapper>
    </main>
  );
}
