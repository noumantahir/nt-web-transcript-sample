import React, { useEffect } from 'react'
import { IconButton } from 'components/atoms';
import styles from './PlayButton.styles';
import { View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withRepeat, withTiming, Easing, withDelay } from 'react-native-reanimated';
import { Animations } from 'theme';

interface Props {
  isDisabled: boolean;
  isPlaying: boolean;
  onPress: () => void;
}

export const PlayButton = ({ isDisabled, isPlaying, onPress }: Props) => {

  const pulse = useSharedValue(1); // Shared value for scaling

  // Start the pulse animation
  useEffect(() => {
    pulse.value = Animations.pulseAnimation;
  }, []);

  // Animated style
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  return (

    <View style={styles.wrapper}>
      <Animated.View style={!isPlaying && animatedStyle} >
        <IconButton
          iconName={'controller-play'}
          disabled={isDisabled}
          onPress={onPress}
          size={40}
          color={isPlaying ? '#DBA604' : undefined}
          animateWithDelay={900}
        />
      </Animated.View>
    </View >
  )
}