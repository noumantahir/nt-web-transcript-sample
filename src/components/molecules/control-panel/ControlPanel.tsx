import { IconButton } from 'components/atoms';
import { PlayButton } from 'components/elements';
import React from 'react';
import { View } from 'react-native';
import styles from './ControlPanel.styles';

interface Props {
  isPlaying: boolean;
  isDisabled: boolean;
  onTogglePlayback: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const ControlPanel = ({
  onTogglePlayback,
  onNext,
  onPrevious,
  isPlaying,
  isDisabled
}: Props) => {

  return (
    <View style={styles.container}>
      <View style={styles.controlPanel}>
        <IconButton iconName='controller-fast-backward' onPress={onPrevious} />
        <PlayButton isPlaying={isPlaying} isDisabled={isDisabled} onPress={onTogglePlayback} />
        <IconButton iconName='controller-fast-forward' onPress={onNext} />
      </View>
    </View>
  );
};



export default ControlPanel;