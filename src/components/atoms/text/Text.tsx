import React from 'react';
import { Text as RNText, TextStyle, TextProps, StyleProp } from 'react-native';
import styles from './Text.styles';


export enum TextPresets {
  TITLE = 'title',
  LABEL = 'label',
  BODY = 'body',
  CAPTION = 'caption',
}

interface Props extends TextProps {
  preset?: TextPresets;
  style?: TextStyle|TextStyle[];
}

// Text Component
export const Text = ({ preset = TextPresets.BODY, style, ...props }: Props) => {
  
  // Map presets to styles
  const presetStyles = {
    [TextPresets.TITLE]: styles.titleText,
    [TextPresets.LABEL]: styles.labelText,
    [TextPresets.BODY]: styles.bodyText,
    [TextPresets.CAPTION]: styles.captionText,
  };

  return (
    <RNText style={[presetStyles[preset], style]} {...props} />
  );
};


export default Text;
