import { useState, useEffect } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useAudio } from 'services/hooks';
import { parseInterleavedTranscript } from 'services/transcript';
import { TranscriptEntry } from 'services/transcript/transcript.types';
import { TranscriptItem } from '../children';
import { ControlPanel } from 'components/molecules';
import { Header } from 'components/elements';
import styles, { CONTENT_WIDTH_THRESHOLD } from '../styles/TranscriptScreen.styles'


const SWICTH_BUFFER_MS = 700; //Buffer to decide whether jump to previous phrase or replay current phrase

export const TranscriptScreen = () => {

  const dims = useWindowDimensions();
  const player = useAudio(require("assets/audio/transcript_audio.mp3"));

  const [interleaved, setInterleaved] = useState<TranscriptEntry[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);


  //load transcript on launch
  useEffect(() => {
    _loadTranscript()
  }, [])


  //this hook handles phrase index chnage based on active phrase end time
  //and current time of player
  useEffect(() => {

    const phraseEndingSec = interleaved[activeIndex]?.endTime;

    //change phrase if player has passed the ending time of current phrase
    if (phraseEndingSec && player.currentTime >= phraseEndingSec) {
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
      player.toggle();

      //set active index to start if playback was reset
      //else skip this stop to support play/pause
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

  // Check if width is greater than 700
  const isWideScreen = dims.width > CONTENT_WIDTH_THRESHOLD;


  const _containerStyle = [
    styles.container,
    [isWideScreen && styles.wideContainer]
  ]

  const _contentStyle = [
    styles.content,
    [isWideScreen && styles.wideContent]
  ]

  return (
    <SafeAreaView
      style={_containerStyle}
      edges={['right', 'top', 'left']}>

      <View style={_contentStyle}>
        <Header />

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
          duration={player.duration}
          currentTime={player.currentTime}
        />


      </View >
    </SafeAreaView>

  )
}

export default TranscriptScreen

