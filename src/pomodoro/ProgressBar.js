import React from "react";

function ProgressBar({focusInterval, breakInterval, session }) {
  return (
    <div className="row mb-2">
      <div className="col">
        <div className="progress" style={{ height: "20px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={session.mode === "Focusing" ? (1 - session.timer / (focusInterval * 60)) * 100 : (1 - session.timer / (breakInterval * 60)) * 100} // TODO: Increase aria-valuenow as elapsed time increases
            style={session.mode === "Focusing" ? { width: `${(1 - session.timer / (focusInterval * 60)) * 100}%` } : { width: `${(1 - session.timer / (breakInterval * 60)) * 100}%` } } // TODO: Increase width % as elapsed time increases
          />
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
