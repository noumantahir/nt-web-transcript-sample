import { TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo'; // Use your preferred icon library
import styles from './IconButton.styles';
import { Colors } from 'theme';

interface Props {
  iconName: string;
  disabled?: boolean;
  size?: number;
  color?: string;
  onPress: () => void;
}


export const IconButton = ({ iconName, disabled, size, color, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={styles.iconButton}
    >
      <Icon name={iconName} size={size || 24} color={color || Colors.textBlack} />
    </TouchableOpacity>

  )
}
