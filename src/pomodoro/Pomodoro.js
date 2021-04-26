import React, { useState } from "react";
import classNames from "../utils/class-names";
import Timer from "./Timer";
import TimerSetter from "./TimerSetter";
import ProgressBar from "./ProgressBar"



function Pomodoro() {

  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusInterval, setFocusInterval] = useState(25);
  const [breakInterval, setBreakInterval] = useState(5);
  const [disabled, setDisabled] = useState(false);
  const [display, setDisplay] = useState({display: "none"})
  // const [timer, setTimer] = useState(focusInterval * 60)
  const [session, setSession] = useState({mode: "Focusing", timer: focusInterval* 60})

  function sessionHandler() {
    if (session.mode === "Focusing") {
      return setSession({mode: "On Break", timer: breakInterval * 60})
    }
    return setSession({mode: "Focusing", timer: focusInterval * 60})
  }



//   function handleFocusUp() {
//    if (parseFloat(focusInterval) < 60)
//    setFocusInterval(minutesToDuration(parseFloat(focusInterval) + 5));
//    setTimer((parseFloat(focusInterval) + 5) * 60);
// }

// function handleFocusDown() {
//   if (parseFloat(focusInterval) > 5)
//   setFocusInterval(minutesToDuration(parseFloat(focusInterval) - 5))
//   setTimer((parseFloat(focusInterval) + 5) * 60);
// }

// function handleBreakUp() {
//   if (parseFloat(breakInterval) < 15)
//   setBreakInterval(minutesToDuration(parseFloat(breakInterval)+ 1));

// }

// function handleBreakDown() {
//  if (parseFloat(breakInterval) > 1)
//  setBreakInterval(minutesToDuration(parseFloat(breakInterval) - 1));
// }


function handleFocusUp() {
  setFocusInterval((focusInterval) => focusInterval < 60 ? focusInterval + 5 : focusInterval);
  if (session.mode === "Focusing") {
  setSession ({...session, timer: (focusInterval < 60 ? focusInterval + 5 : focusInterval) * 60});
  }
}

function handleFocusDown() {
  setFocusInterval((focusInterval) => focusInterval > 5 ? focusInterval - 5 : focusInterval);
  if (session.mode === "Focusing") {
  setSession({...session, timer: (focusInterval > 5 ? focusInterval - 5 : focusInterval) * 60}); 
  }
}
function handleBreakUp() {
  setBreakInterval((breakInterval) => breakInterval < 15 ? breakInterval + 1 : breakInterval);
  if (session.mode === "On Break") {
  setSession({...session, timer: (breakInterval <15 ? breakInterval + 1 : breakInterval) * 60})
  }
}
function handleBreakDown() {
  setBreakInterval((breakInterval) => breakInterval > 1 ? breakInterval - 1 : breakInterval);
  if (session.mode === "On Break") {
  setSession({...session, timer: (breakInterval > 1 ? breakInterval - 1 : breakInterval) * 60})
  }
}
        // if(timer === 0) {
        //   setTimer(parseFloat(breakInterval) * 60 - 1);
        // }

  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
    setDisabled((prevState) => !prevState);
    setDisplay({display: "block"});
  }

  function handleStop() {
    setIsTimerRunning(false);
    setFocusInterval(25);
    setBreakInterval(5);
    setDisabled(false);
    setDisplay({display: "none"});
  }

  return (
    <div className="pomodoro">
        <TimerSetter 
        focusInterval={focusInterval}
        breakInterval={breakInterval}
        handleFocusDown={handleFocusDown} 
        handleFocusUp={handleFocusUp}
        handleBreakDown={handleBreakDown}
        handleBreakUp={handleBreakUp}
        playPause={playPause}
        disabled={disabled}/>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
              disabled={!disabled}
              onClick={handleStop}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <div style={display}>
       <Timer focusInterval={focusInterval} breakInterval={breakInterval} isTimerRunning={isTimerRunning} session={session} setSession={setSession} sessionHandler={sessionHandler}/> 
        <div>
         {isTimerRunning ? 
         null : <h3>PAUSED</h3>}
        </div>
        <ProgressBar focusInterval={focusInterval} breakInterval={breakInterval} session={session}/>
      </div>
      </div>
  );
}

export default Pomodoro;

