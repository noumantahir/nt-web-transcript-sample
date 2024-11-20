import { useState, useEffect } from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { useAudio } from 'services/hooks';
import { parseInterleavedTranscript } from 'services/transcript';
import { TranscriptEntry } from 'services/transcript/transcript.types';
import { TranscriptItem } from '../children';
import { ControlPanel } from 'components/molecules';
import { Header } from 'components/elements';
import styles from '../styles/TranscriptScreen.styles'


const SWICTH_BUFFER_MS = 700; //Buffer to decide whether jump to previous phrase or replay current phrase

export const TranscriptScreen = () => {

  //load audio file
  const player = useAudio(require("assets/audio/transcript_audio.mp3"));

  const [interleaved, setInterleaved] = useState<TranscriptEntry[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  //load transcript on launch
  useEffect(() => {
    _loadTranscript()
  }, [])

  useEffect(() => {

    const phraseEndingSec = interleaved[activeIndex]?.endTime || -1;

    if (player.currentTime > phraseEndingSec) {
      const nextIndex = activeIndex + 1
      const nextPhrase = interleaved[nextIndex];
      setActiveIndex(nextPhrase ? nextIndex : -1)
    }

  }, [player.currentTime])



  //fetch transcript
  const _loadTranscript = async () => {
    const _interleaved = await parseInterleavedTranscript();
    setInterleaved(_interleaved);
  }


  const _onTogglePlayback = () => {
    if (player.isReady) {
      console.log('toggle playback', player.isReady, player.playing)
      player.toggle();

      if (activeIndex < 0) {
        setActiveIndex(0);
      }
    }
  }

  //safely seek to phrase requested
  const _seek = (toIndex: number) => {
    if (toIndex >= 0 && toIndex < interleaved.length) {
      const toPhrase = interleaved[toIndex];
      player.seek(toPhrase.startTime);
      setActiveIndex(toIndex);
    }
  }

  //seek to phrase track
  const _onNext = () => _seek(activeIndex + 1);

   //if less than 500 ms has passed in duration of track,
  //seek to previous phrase, else reset current
  const _onPrevious = () => {
   
    const toIndex =
      activeIndex > 0 &&
        player.currentTime < (interleaved[activeIndex].startTime + SWICTH_BUFFER_MS) ?
        activeIndex - 1 : activeIndex;
    _seek(toIndex)

  }


  const renderItem = ({ item, index }: { item: TranscriptEntry, index: number }) =>
    <TranscriptItem data={item} index={index} activeIndex={activeIndex} />;


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

