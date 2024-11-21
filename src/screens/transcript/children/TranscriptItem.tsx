import { Platform, Pressable, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TranscriptEntry } from 'services/transcript/transcript.types'
import styles from '../styles/TranscriptItem.styles'
import { Text, TextPresets } from 'components/atoms'
import Animated, { FadeInDown, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { Animations } from 'theme'

interface Props {
  data: TranscriptEntry,
  index: number,
  activeIndex: number,
  onPress: (index: number) => void,
}

export const TranscriptItem = ({ data, index, activeIndex, onPress }: Props) => {

  const isWeb = Platform.OS === 'web';
  const [visible, setVisible] = useState(!isWeb);
  const scale = useSharedValue(1);

  const isEven = index % 2 === 0;
  const isActive = activeIndex == index


  //compile dynamic styles
  const _containerStyle = [
    styles.container,
    { opacity: visible ? 1 : 0 },
    isEven ? styles.alignLeft : styles.alignRight,
  ];
  const _textStyle = isActive ? styles.activeTextStyle : undefined;
  const _bubbleStyle = [styles.chatBubble, isActive && styles.activeBubble];


  const _animDelay = index * 150
  //handles delay animation glitch on web
  useEffect(() => {
    if (isWeb) {
      setTimeout(() => {
        setVisible(true);
      }, _animDelay + 20); // extra delay to avoid momentary glitch on web
    }
  }, [])


  //trigger animation on tile becomes active
  useEffect(() => {
    if (isActive) {
      scale.value = Animations.quickSelection;
    }
  }, [isActive]);

  // selected tile animated style
  const animatedBubbleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));


  const _onPress = () => {
    onPress(index)
  }


  return (
    <Animated.View entering={FadeInDown.delay(_animDelay)}>
      <View style={_containerStyle}>
        <Text preset={TextPresets.LABEL} style={_textStyle}>{data.speaker}</Text>

        <Animated.View style={[_bubbleStyle, animatedBubbleStyle]}>
          <Pressable onPress={_onPress}>
            <Text preset={TextPresets.BODY} style={_textStyle}>{data.message}</Text>
          </Pressable>
        </Animated.View>
      </View>
    </Animated.View >
  )
}

