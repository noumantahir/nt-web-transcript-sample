import { Text, TextPresets } from 'components/atoms';
import React from 'react';
import { View } from 'react-native';
import styles from './TimeTracker.styles';


interface Props {
    elapsed: number;
    total: number
}

export const TimeTracker = ({ total = 0, elapsed = 0 }: Props) => {

    return (
        <View style={styles.container}>
            <View style={styles.timeWrapper}>
                <Text preset={TextPresets.CAPTION} >{formatTime(elapsed)}</Text>
                <Text preset={TextPresets.CAPTION} >{formatTime(total)}</Text>
            </View>
        </View>
    );
};



    // formate time millis in format '00:00'
const formatTime = (millis: number) => {
    const totalSeconds = Math.floor(millis / 1000); 
    const minutes = Math.floor(totalSeconds / 60); 
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};


export default TimeTracker;
