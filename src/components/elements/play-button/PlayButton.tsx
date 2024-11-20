import React from 'react'
import { IconButton } from 'components/atoms';
import styles from './PlayButton.styles';
import { View } from 'react-native';

interface Props {
  isDisabled: boolean;
  isPlaying: boolean;
  onPress: () => void;
}

export const PlayButton = ({ isDisabled, isPlaying, onPress }: Props) => {
  return (
    <View style={styles.wrapper}>
      <IconButton
        iconName={'controller-play'}
        disabled={isDisabled}
        onPress={onPress}
        size={40}
        color={isPlaying ? '#DBA604' : undefined}
      />
    </View>

  )
}
