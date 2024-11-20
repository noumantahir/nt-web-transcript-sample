import { Platform, View } from 'react-native'
import React, { useState } from 'react'
import { TranscriptEntry } from 'services/transcript/transcript.types'
import styles from '../styles/TranscriptItem.styles'
import { Text, TextPresets } from 'components/atoms'
import Animated, { BounceIn, BounceInLeft, BounceInRight, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors'

interface Props {
  data: TranscriptEntry,
  index: number,
  activeIndex: number
}

export const TranscriptItem = ({ data, index, activeIndex }: Props) => {

  const isWeb = Platform.OS === 'web';
  const [visible, setVisible] = useState(!isWeb);

  const isEven = index % 2 === 0;
  const isActive = activeIndex == index

  //compiel dynamic styles
  const _containerStyle = [
    styles.container,
    { opacity: visible ? 1 : 0 },
    isEven ? styles.alignLeft : styles.alignRight,
  ];
  const _textStyle = isActive ? styles.activeTextStyle : undefined;
  const _bubbleStyle = [styles.chatBubble, isActive && styles.activeBubble];


  const _animDelay = index * 150
  //handles delay animation glitch on web
  if (isWeb) {
    setTimeout(() => {
      setVisible(true);
    }, _animDelay + 20); // extra delay to avoid momentary glitch on web
  }

  
  return (
    <Animated.View entering={FadeInDown.delay(_animDelay)} style={_containerStyle}>
      <Text preset={TextPresets.LABEL} style={_textStyle}>{data.speaker}</Text>
      <View style={_bubbleStyle}>
        <Text preset={TextPresets.BODY} style={_textStyle}>{data.message}</Text>
      </View>
    </Animated.View >
  )
}

