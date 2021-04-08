import './index.css'
import { useState, useEffect, useRef } from 'react';
import SetLength from './components/SetLength'
import { FaPlayCircle, FaPause, FaSync } from 'react-icons/fa'
import { useInterval } from './hooks/useInterval'
import alarm from './sounds/beep.mp3'

function App() {
  const time = (num) => {
    let mins = Math.floor(num / 60);
    let secs = num - mins * 60;
    if (secs < 10) {
      secs = '0' + secs
    }
    if (mins < 10) {
      mins = '0' + mins
    }
    return mins + ':' + secs
  }
  const [breakTime, setbreakTime] = useState(5 * 60)
  const [sessionTime, setsessionTime] = useState(1 * 60)
  const [stage, setstage] = useState(true)
  const [startStop, setstartStop] = useState(true)
  const [currTime, setcurrTime] = useState(1 * 60)
  const [display, setdisplay] = useState(time(currTime))
  const beep = useRef()

  useEffect(() => { setdisplay(time(currTime)) }, [currTime])

  useEffect(() => {
    if (currTime === 0 && stage === true) {
      beep.current.play()
      setstage(false)
      setcurrTime(breakTime)
    } else if (currTime === 0 && stage === false) {
      setstage(true)
      setcurrTime(sessionTime)
    }
  }, [currTime, breakTime, sessionTime, stage])

  useInterval(() => setcurrTime(x => x - 1), startStop ? null : 1000)

  const playPause = () => {
    setstartStop(!startStop)
  }

  const resetClock = () => {
    setsessionTime(25*60)
    setbreakTime(5*60)
    setcurrTime(25*60)
    setcurrTime(sessionTime)
    setstage(true)
    !startStop && playPause()
  }

  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
      <div className="counters">
        <div><SetLength title="Break" time={time} stage={stage} currTime={currTime} setcurrTime={setcurrTime} state={breakTime} set={setbreakTime} /></div>
        <div><SetLength title="Session" time={time} stage={stage} currTime={currTime} setcurrTime={setcurrTime} state={sessionTime} set={setsessionTime} startStop={startStop} /></div>
      </div>
      <div className="currTime">
        <div className="stageHeading">{stage ? 'Session' : 'Break'}</div>
        <div className="countdown">{display}</div>
        <div className="timerIcons">
          <div id="start_stop" style={{ cursor: 'pointer' }} onClick={playPause}>{startStop ? <FaPlayCircle /> : <FaPause />}</div>
          <div id="reset" onClick={resetClock} style={{ cursor: 'pointer' }}>< FaSync /></div>
        </div>
      </div>
      <audio id="beep" src={alarm} ref={beep} />
    </div>
  );
}

export default App;
