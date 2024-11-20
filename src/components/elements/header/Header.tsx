import React from 'react';
import { View } from 'react-native';
import styles from './Header.styles';
import { Text, TextPresets } from 'components/atoms';

interface Props {
  title?: string
}

export const Header = ({ title }: Props) => {
  return (
    <View style={styles.container}>
      {!!title && <Text preset={TextPresets.TITLE}>{title}</Text>}
    </View>
  );
};

