import React, { useEffect } from 'react';

import Confetti from 'react-confetti';
import { useReward } from 'react-rewards';
import { useChain, useSpring, animated, useSpringRef } from '@react-spring/web'


function ConfettiPage() {
    // set the spawning rules for the balloons and norwegian emoji flags
    const {reward: balloonsReward1} = useReward('balloonsReward1', 'balloons', {lifetime: 6000, elementSize: 24, elementCount: 15, spread: 130, startVelocity: 5, decay: 0.9999, zIndex: 499});
    const {reward: balloonsReward2} = useReward('balloonsReward2', 'balloons', {lifetime: 6000, elementSize: 24, elementCount: 15, spread: 130, startVelocity: 5, decay: 0.9999, zIndex: 499});
    const {reward: balloonsReward3} = useReward('balloonsReward3', 'balloons', {lifetime: 6000, elementSize: 24, elementCount: 15, spread: 130, startVelocity: 5, decay: 0.9999, zIndex: 499});
    const {reward: balloonsReward4} = useReward('balloonsReward4', 'balloons', {lifetime: 6000, elementSize: 24, elementCount: 15, spread: 130, startVelocity: 5, decay: 0.9999, zIndex: 499});
    const {reward: balloonsReward5} = useReward('balloonsReward5', 'balloons', {lifetime: 6000, elementSize: 24, elementCount: 15, spread: 130, startVelocity: 5, decay: 0.9999, zIndex: 499});

    const {reward: emojiReward1} = useReward('emojiReward1', 'emoji', {"emoji": ["🇳🇴"], spread: 110, startVelocity: 5.5, decay: 0.9999, lifetime: 6000, elementCount: 24, elementSize: 48, zIndex: 500})
    const {reward: emojiReward2} = useReward('emojiReward2', 'emoji', {"emoji": ["🇳🇴"], spread: 110, startVelocity: 5.5, decay: 0.9999, lifetime: 6000, elementCount: 24, elementSize: 48, zIndex: 500})
    const {reward: emojiReward3} = useReward('emojiReward3', 'emoji', {"emoji": ["🇳🇴"], spread: 110, startVelocity: 5.5, decay: 0.9999, lifetime: 6000, elementCount: 24, elementSize: 48, zIndex: 500})
    
    // spawn these effects upon the component loading
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


    // css for the text and flag
    const flagStyle = {position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 497} as React.CSSProperties;
    const textStyle = {position: "absolute", left: "50%", top: "20%", transform: "translate(-50%, -50%)", zIndex: 497} as React.CSSProperties;
    
    // define spring refences, used by the useChain
    const expandSizeVideoRef = useSpringRef()
    const spinVideoRef = useSpringRef()
    const expandTextRef = useSpringRef()
    const spinTextRef = useSpringRef()
    const fadeEntirePageRef = useSpringRef()
    const spinTextRef2 = useSpringRef()
    
    // define the springs, these are used for defining the animations
    const expandSizeVideoSpring = useSpring({ref: expandSizeVideoRef,from: { width: 0 },to: { width: 960 }, config: { duration: 1500 }})
    const spinVideoSpring = useSpring({ref: spinVideoRef,from: { y: -100, transform: "rotate(0deg)" },to: { y: 150, transform: "rotate(720deg)" }, config: { duration: 1000 }})
    const expandTextSpring = useSpring({ref: expandTextRef,from: { width: 0 },to: { width: 1280 }, config: { duration: 2000 }})
    const spinTextSpring = useSpring({ref: spinTextRef,from: { transform: "rotate(0deg)" },to: { transform: "rotate(720deg)" }, config: { duration: 400 }})
    const spinTextSpring2 = useSpring({ref: spinTextRef2,from: { transform: "rotate(720deg)" },to: { transform: "rotate(8200deg)" }, config: { duration: 1200 }})
    const fadeEntirePageSpring = useSpring({ref: fadeEntirePageRef,from: { opacity: 1 },to: { opacity: 0 }, config: { duration: 10000 }})
   
    // define the use chain, it consists of what spring to play, and the time in seconds to play them after loading
    useChain([ expandSizeVideoRef, spinVideoRef, expandTextRef, spinTextRef, spinTextRef2, fadeEntirePageRef ], [0, 2.5, 4, 8, 15, 19]) 
    
    
    return (
      <animated.div id="confettiPage" style={{...fadeEntirePageSpring}}>
        {/* define the falling confetti itself */}
        <Confetti width={1920} height={1080} numberOfPieces={1500} tweenDuration={100000} recycle={false} />
        {/* spawn the balloons and norwegian flags */}
        <span id="balloonsReward1" style={{position: 'absolute', left: 0, right: 0, marginLeft: "auto", marginRight: "auto", width: "1px", paddingTop: "300px"}}/>
        <span id="balloonsReward2" style={{position: 'absolute', left: "35%", right: 0, marginLeft: "auto", marginRight: "auto", width: "1px", paddingTop: "300px"}}/>
        <span id="balloonsReward3" style={{position: 'absolute', left: "70%", right: 0, marginLeft: "auto", marginRight: "auto", width: "1px", paddingTop: "300px"}}/>
        <span id="balloonsReward4" style={{position: 'absolute', left: 0, right: "35%", marginLeft: "auto", marginRight: "auto", width: "1px", paddingTop: "300px"}}/>
        <span id="balloonsReward5" style={{position: 'absolute', left: 0, right: "70%", marginLeft: "auto", marginRight: "auto", width: "1px", paddingTop: "300px"}}/>
        <span id="emojiReward1" style={{position: 'absolute', left: 0, right: 0, marginLeft: "auto", marginRight: "auto", width: "1px", paddingTop: "300px"}}/>
        <span id="emojiReward2" style={{position: 'absolute', left: "50%", right: 0, marginLeft: "auto", marginRight: "auto", width: "1px", paddingTop: "300px"}}/>
        <span id="emojiReward3" style={{position: 'absolute', left: 0, right: "50%", marginLeft: "auto", marginRight: "auto", width: "1px", paddingTop: "300px"}}/>
        
        {/* div for norwegian flag */}
        <div style={flagStyle}>
          <animated.div id="video" style={{...expandSizeVideoSpring, ...spinVideoSpring}}>
            <video id="video" autoPlay src='/norsk_flag.mp4' width="100%"></video>
          </animated.div>
        </div>

        {/* div for the "norge!!!!" text */}
        <div style={textStyle}>
          <animated.div id="text" style={{...expandTextSpring, ...spinTextSpring, ...spinTextSpring2}}>
            <img alt="norge!!!" src='/norge!!!!.gif' style={{margin: "0 auto"}} width="100%"></img>
          </animated.div>
        </div>

      </animated.div>
    );
  }

export default ConfettiPage;