import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Progress from 'react-native-progress';
import { rgbaArrayToRGBAColor } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';


const ProgressCircle = ({ loading, width }: {loading:boolean,width:number}) => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        if (loading) {
            setProgress(0);
        }
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
            {loading && <Progress.Bar 
            
            progress={progress}
            width={width} 
            height={20} 
            borderColor='#FF7991'
            borderRadius={10}
            borderWidth={1}
            animationType='timing'
            color='#FF7991'
             /> }

        </>
    )
}

export default ProgressCircle