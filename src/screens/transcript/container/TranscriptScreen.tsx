import { useState, useEffect } from 'react';
import {  SafeAreaView, FlatList } from 'react-native';
import { useAudio } from 'services/hooks';
import { parseInterleavedTranscript } from 'services/transcript';
import { TranscriptEntry } from 'services/transcript/transcript.types';
import { TranscriptItem } from '../children';
import { ControlPanel } from 'components/molecules';
import { Header } from 'components/elements';
import styles from '../styles/TranscriptScreen.styles'


export const TranscriptScreen = () => {

  //load audio file
  const player = useAudio(require("assets/audio/transcript_audio.mp3"));


  const [interleaved, setInterleaved] = useState<TranscriptEntry[]>([]);

  //load transcript on launch
  useEffect(() => {
    _loadTranscript()
  }, [])


  //fetch transcript
  const _loadTranscript = async () => {
    const _interleaved = await parseInterleavedTranscript();
    setInterleaved(_interleaved);
  }


  const _onTogglePlayback = () => {
    if (player.isReady) {
      console.log('toggle playback', player.isReady, player.playing)
      player.toggle();
    }
  }

  const _onNext = () => {
    
  }

  const _onPrevious = () => {
  
  }

  const renderItem = ({ item, index }: { item: TranscriptEntry, index: number }) =>
    <TranscriptItem data={item} index={index}  />;


  return (

    <SafeAreaView style={styles.container}>
      <Header title='Interleaved Transcript' />

      <FlatList
        data={interleaved}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        extraData={player.currentTime}
      />

      <ControlPanel
        onTogglePlayback={_onTogglePlayback}
        onNext={_onNext}
        onPrevious={_onPrevious}
        isPlaying={player.playing}
        isDisabled={!player.isReady}
      />

    </SafeAreaView>

  )
}

export default TranscriptScreen

