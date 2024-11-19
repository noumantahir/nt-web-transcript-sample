import { TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo'; // Use your preferred icon library
import styles from './IconButton.styles';

interface Props {
  iconName:string;
  disabled?:boolean;
  onPress:()=>void;
}


export const IconButton = ({iconName, disabled, onPress}:Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={styles.iconButton}
    >
      <Icon name={iconName} size={32} color={'#000'} />
    </TouchableOpacity>

  )
}
