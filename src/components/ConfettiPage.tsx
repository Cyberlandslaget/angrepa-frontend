import React, { useEffect } from 'react';

import Confetti from 'react-confetti';
import { useReward } from 'react-rewards';


function ConfettiPage() {
    const {reward: balloonsReward1} = useReward('balloonsReward1', 'balloons', {lifetime: 6000, elementSize: 24, elementCount: 15, spread: 130, startVelocity: 5, decay: 0.9999, zIndex: 499});
    const {reward: balloonsReward2} = useReward('balloonsReward2', 'balloons', {lifetime: 6000, elementSize: 24, elementCount: 15, spread: 130, startVelocity: 5, decay: 0.9999, zIndex: 499});
    const {reward: balloonsReward3} = useReward('balloonsReward3', 'balloons', {lifetime: 6000, elementSize: 24, elementCount: 15, spread: 130, startVelocity: 5, decay: 0.9999, zIndex: 499});
    const {reward: balloonsReward4} = useReward('balloonsReward4', 'balloons', {lifetime: 6000, elementSize: 24, elementCount: 15, spread: 130, startVelocity: 5, decay: 0.9999, zIndex: 499});
    const {reward: balloonsReward5} = useReward('balloonsReward5', 'balloons', {lifetime: 6000, elementSize: 24, elementCount: 15, spread: 130, startVelocity: 5, decay: 0.9999, zIndex: 499});

    const {reward: emojiReward1} = useReward('emojiReward1', 'emoji', {"emoji": ["🇳🇴"], spread: 110, startVelocity: 5.5, decay: 0.9999, lifetime: 6000, elementCount: 24, elementSize: 48, zIndex: 500})
    const {reward: emojiReward2} = useReward('emojiReward2', 'emoji', {"emoji": ["🇳🇴"], spread: 110, startVelocity: 5.5, decay: 0.9999, lifetime: 6000, elementCount: 24, elementSize: 48, zIndex: 500})
    const {reward: emojiReward3} = useReward('emojiReward3', 'emoji', {"emoji": ["🇳🇴"], spread: 110, startVelocity: 5.5, decay: 0.9999, lifetime: 6000, elementCount: 24, elementSize: 48, zIndex: 500})
    
    useEffect( () => {
      balloonsReward1()
      balloonsReward2()
      balloonsReward3()
      balloonsReward4()
      balloonsReward5()

      emojiReward1()
      emojiReward2()
      emojiReward3()
    }, [])

    return (
      <div>
        <Confetti   
            width={1920}
            height={1080}
            numberOfPieces={1500}
            tweenDuration={100000}
            recycle={false}
        />
        <span id="balloonsReward1" style={{position: 'absolute', left: 0, right: 0, marginLeft: "auto", marginRight: "auto", width: "1px", paddingTop: "300px"}}/>
        <span id="balloonsReward2" style={{position: 'absolute', left: "35%", right: 0, marginLeft: "auto", marginRight: "auto", width: "1px", paddingTop: "300px"}}/>
        <span id="balloonsReward3" style={{position: 'absolute', left: "70%", right: 0, marginLeft: "auto", marginRight: "auto", width: "1px", paddingTop: "300px"}}/>
        <span id="balloonsReward4" style={{position: 'absolute', left: 0, right: "35%", marginLeft: "auto", marginRight: "auto", width: "1px", paddingTop: "300px"}}/>
        <span id="balloonsReward5" style={{position: 'absolute', left: 0, right: "70%", marginLeft: "auto", marginRight: "auto", width: "1px", paddingTop: "300px"}}/>
        <span id="emojiReward1" style={{position: 'absolute', left: 0, right: 0, marginLeft: "auto", marginRight: "auto", width: "1px", paddingTop: "300px"}}/>
        <span id="emojiReward2" style={{position: 'absolute', left: "50%", right: 0, marginLeft: "auto", marginRight: "auto", width: "1px", paddingTop: "300px"}}/>
        <span id="emojiReward3" style={{position: 'absolute', left: 0, right: "50%", marginLeft: "auto", marginRight: "auto", width: "1px", paddingTop: "300px"}}/>
        <video id="video" controls autoPlay width="720" src='/norsk_flag.mp4' style={{ position: "absolute", left: "calc(50% - 360px)", top: "calc(50% - 202px)", zIndex: 497 }} className='animate-spin [animation-duration:4.66s]'></video>
      </div>
    );
  }

export default ConfettiPage;