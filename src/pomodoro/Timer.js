import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import { secondsToDuration } from "../utils/duration";
import { minutesToDuration } from "../utils/duration"
function Timer({
  focusInterval,
  breakInterval,
  isTimerRunning,
  session,
  setSession,
  sessionHandler
}) {


useInterval(
    () => {
      if (session.timer === 0) { 
      new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
        //play the alarm
      return sessionHandler();
      }
      const timer = session.timer - 1
      return setSession({...session, timer});
    },
    isTimerRunning ? 1000 : null
  );


  return (
    <div className="row mb-2">
      <div className="col">
        {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
        <h2 data-testid="session-title">
          {session.mode} for {minutesToDuration(session.mode === "Focusing" ? focusInterval : breakInterval)} minutes
        </h2>
        {/* TODO: Update message below to include time remaining in the current session */}
        <p className="lead" data-testid="session-sub-title">
          {secondsToDuration(session.timer)} remaining
        </p>
      </div>
    </div>
  );
}

export default Timer;
