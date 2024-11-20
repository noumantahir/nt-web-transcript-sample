import React from 'react';
import { Alert, View } from 'react-native';

import styles from './ProgressBar.styles';

interface Props {
    maxProgress: number;
    progress: number
}

export const ProgressBar = ({ progress = 0, maxProgress = 0 }: Props) => {

    const _percent = maxProgress ? Math.ceil((progress / maxProgress) * 100) : 0;

    const _fillStyle = {
        ...styles.fillBar,
        width: `${_percent}%`,
    }

    return (
        <View style={styles.container}>
            <View style={_fillStyle} />
        </View>
    );
};
