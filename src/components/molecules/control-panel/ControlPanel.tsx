import { IconButton, ProgressBar } from 'components/atoms';
import { PlayButton } from 'components/elements';
import React from 'react';
import { View } from 'react-native';
import styles from './ControlPanel.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TimeTracker } from './children';
import Animated, { BounceIn } from 'react-native-reanimated';

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


  const _renderAnimatedIcon = (iconName: string, animDelay: number, onPress: () => void,) => {
    <Animated.View entering={BounceIn.delay(animDelay)} >
      <IconButton iconName='controller-fast-backward' onPress={onPrevious} />
    </Animated.View>
  }

  return (
    <View style={_containerStyle}>
      <ProgressBar maxProgress={duration} progress={currentTime} />
      <TimeTracker elapsed={currentTime} total={duration} />
      <View style={styles.controlPanel}>
        <IconButton iconName='controller-fast-backward' animateWithDelay={1300} onPress={onPrevious} />
        <PlayButton isPlaying={isPlaying} isDisabled={isDisabled} onPress={onTogglePlayback} />
        <IconButton iconName='controller-fast-forward' animateWithDelay={1300} onPress={onNext} />
      </View>
    </View>
  );
};



export default ControlPanel;