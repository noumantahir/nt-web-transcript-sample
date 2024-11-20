import { View } from 'react-native'
import React from 'react'
import { TranscriptEntry } from 'services/transcript/transcript.types'
import styles from '../styles/TranscriptItem.styles'
import { Text, TextPresets } from 'components/atoms'

interface Props {
  data: TranscriptEntry,
  index: number,
  activeIndex: number
}

export const TranscriptItem = ({ data, index, activeIndex }: Props) => {

  const isEven = index % 2 === 0;
  const isActive = activeIndex == index

  const _containerStyle = [styles.container, isEven ? styles.alignLeft : styles.alignRight];
  const _textStyle = isActive ? styles.activeTextStyle : undefined;
  const _bubbleStyle = [styles.chatBubble, isActive && styles.activeBubble];

  return (
    <View style={_containerStyle}>
      <Text preset={TextPresets.LABEL} style={_textStyle}>{data.speaker}</Text>
      <View style={_bubbleStyle}>
        <Text preset={TextPresets.BODY} style={_textStyle}>{data.message}</Text>
      </View>
    </View>
  )
}

