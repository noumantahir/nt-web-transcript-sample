import { IconButton, ProgressBar } from 'components/atoms';
import { PlayButton } from 'components/elements';
import React from 'react';
import { View } from 'react-native';
import styles from './ControlPanel.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  isPlaying: boolean;
  isDisabled: boolean;
  duration: number;
  currentTime: number;
  onTogglePlayback: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const ControlPanel = ({
  isPlaying,
  isDisabled,
  currentTime,
  duration,
  onTogglePlayback,
  onNext,
  onPrevious
}: Props) => {

  const insets = useSafeAreaInsets();


  const _containerStyle = {
    ...styles.container,
    paddingBottom: insets.bottom > 0 ? insets.bottom : 18, //makes sure bottom spacing is consistent
  }

  return (
    <View style={_containerStyle}>
      <ProgressBar maxProgress={duration} progress={currentTime} />
      <View style={styles.controlPanel}>
        <IconButton iconName='controller-fast-backward' onPress={onPrevious} />
        <PlayButton isPlaying={isPlaying} isDisabled={isDisabled} onPress={onTogglePlayback} />
        <IconButton iconName='controller-fast-forward' onPress={onNext} />
      </View>
    </View>
  );
};



export default ControlPanel;