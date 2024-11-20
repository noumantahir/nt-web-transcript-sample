import { IconButton } from 'components/atoms';
import { PlayButton } from 'components/elements';
import React from 'react';
import { View } from 'react-native';
import styles from './ControlPanel.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

  const insets = useSafeAreaInsets();


  const _containerStyle = {
    ...styles.container,
    paddingBottom:insets.bottom > 0 ? insets.bottom : 18, //makes sure bottom spacing is consistent
  }

  return (
    <View style={_containerStyle}>
      <View style={styles.controlPanel}>
        <IconButton iconName='controller-fast-backward' onPress={onPrevious} />
        <PlayButton isPlaying={isPlaying} isDisabled={isDisabled} onPress={onTogglePlayback} />
        <IconButton iconName='controller-fast-forward' onPress={onNext} />
      </View>
    </View>
  );
};



export default ControlPanel;