import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Progress from 'react-native-progress';


const ProgressCircle = ({ loading }: {loading:boolean}) => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 1) {
                    clearInterval(interval);
                    return 0;
                }
                return oldProgress + 0.01;
            });
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <>
            {loading && <Progress.Circle 
            size={50} 
            progress={progress} 
            formatText={() => `${Math.round(progress * 100)}%`}
            showsText={true} />}

        </>
    )
}

export default ProgressCircle