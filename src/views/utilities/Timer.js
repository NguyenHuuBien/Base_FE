import React, { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';

const MyTimer = ({ expiryTimestamp }) => {
    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

    useEffect(() => {
        start()

        return () => restart()
    }, [])

    return (
        <div style={{ textAlign: 'end', marginBottom: '20px' }}>
            <div style={{ fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.68)',
                    color: '#fff',
                    height: '35px',
                    width: '30px',
                    borderRadius: '4px',
                    fontWeight: '600',
                    margin: '0px 5px'
                }}>
                    <span >
                        {days}
                    </span>
                </div>
                :
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.68)',
                    color: '#fff',
                    height: '35px',
                    width: '30px',
                    borderRadius: '4px',
                    fontWeight: '600',
                    margin: '0px 5px'
                }}>
                    <span >
                        {hours}
                    </span>
                </div>
                :
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.68)',
                    color: '#fff',
                    height: '35px',
                    width: '30px',
                    borderRadius: '4px',
                    fontWeight: '600',
                    margin: '0px 5px'
                }}>
                    <span >
                        {minutes}
                    </span>
                </div>:
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.68)',
                    color: '#fff',
                    height: '35px',
                    width: '30px',
                    borderRadius: '4px',
                    fontWeight: '600',
                    margin: '0px 5px'
                }}>
                    <span >
                        {seconds}
                    </span>
                </div>
            </div>
        </div >
    );
}

export default MyTimer