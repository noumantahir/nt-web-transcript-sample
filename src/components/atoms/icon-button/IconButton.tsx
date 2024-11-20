import { Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Entypo';
import styles from './IconButton.styles';
import { Colors } from 'theme';
import Animated, { BounceIn, useAnimatedStyle } from 'react-native-reanimated';
interface Props {
  iconName: string;
  disabled?: boolean;
  size?: number;
  color?: string;
  animateWithDelay?: number;
  onPress: () => void;
}


export const IconButton = ({ iconName, disabled, size, color, animateWithDelay, onPress }: Props) => {

  const isWeb = Platform.OS === 'web';
  const [visible, setVisible] = useState(!isWeb || !animateWithDelay);

  //handles web delayed animation glitch issue
  if (isWeb && animateWithDelay) {
    setTimeout(() => {
      setVisible(true);
    }, animateWithDelay + 20) //extra delay to avoid momentary glitch
  }

  //animate if animateWithDelay is passed, else render default
  const animation = animateWithDelay !== undefined
    ? BounceIn.delay(animateWithDelay)
    : undefined;


  // wrapping style around reanimated helps avoid 
  //manual style manipulation warning
  const _wrapperStyle = useAnimatedStyle(() => ({
    opacity: visible ? 1 : 0, // manipulate opacity
  }));

  return (
    <Animated.View entering={animation} style={_wrapperStyle}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={styles.iconButton}
      >
        <Icon name={iconName} size={size || 24} color={color || Colors.textBlack} />
      </TouchableOpacity>
    </Animated.View>


  )
}
