import React, { useEffect } from 'react';
import { Alert, Easing, View } from 'react-native';

import styles from './ProgressBar.styles';
import Animated, { LinearTransition, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface Props {
    maxProgress: number;
    progress: number
}

export const ProgressBar = ({ progress = 0, maxProgress = 0 }: Props) => {

    const width = useSharedValue(0);


    useEffect(() => {
        const _precent = maxProgress ? Math.ceil((progress / maxProgress) * 100) : 0;
        width.value = _precent ? withTiming(_precent, {
            duration:300,
            easing:Easing.ease,
        }) : 0;
    }, [progress])


    const _fillStyle = useAnimatedStyle(() => {
        return {
            ...styles.fillBar,
            width: `${width.value}%`,
        };
    });

    return (
        <View style={styles.container}>
            <Animated.View style={_fillStyle} />
        </View>
    );
};
