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

  return (
    <View style={[styles.container, isEven ? styles.alignLeft : styles.alignRight]}>
      <Text preset={TextPresets.LABEL}>{data.speaker}</Text>
 
      <View style={[styles.chatBubble, activeIndex == index && styles.activeBubble]}>
        <Text preset={TextPresets.BODY}>{data.message}</Text>
      </View>
    </View>
  )
}

