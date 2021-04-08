import { FaArrowDown, FaArrowUp } from 'react-icons/fa'

const SetLength = ({ title, state, set, time, setcurrTime, currTime, stage, startStop }) => {
    const countUp = () => {
        if (state >= 59*60) {
            return
        }

        set(state + 60)
        if (stage === true & title === 'Session')  {
            setcurrTime(currTime + 60)
        } else if (stage === false & title === 'Break') {
            setcurrTime(currTime + 60)
        }
    }
    
    const countDown = () => {
        if (state <= 60) {
            return
        }
        set(state - 60)
        if (stage === true & title === 'Session')  {
            setcurrTime(currTime - 60)
        } else if (stage === false & title === 'Break') {
            setcurrTime(currTime - 60)
        }
    }
    
    return (
        <div>
            <h3>{title} Length</h3>
            <div className="settime">
                <FaArrowUp style={{cursor: 'pointer', paddingRight: 20}} onClick={startStop && countUp}/>
                {time(state)}
                <FaArrowDown style={{cursor: 'pointer', paddingLeft: 20}} onClick={startStop && countDown}/>
            </div>
        </div>
    )
}

export default SetLength
