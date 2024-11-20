import { useEffect, useState, useRef } from 'react';
import SoundPlayer from 'react-native-sound-player';

export const useAudio = (asset: number) => {

    const progressPollRef = useRef<NodeJS.Timeout | null>(null);

    const [isReady, setIsReady] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    //load asset on launch
    useEffect(() => {
        loadAudio();
    }, []);


    //update current progress time every x milliseconds
    //also makes sure interval is only set while audio is being played
    useEffect(() => {
        if (playing) {
            progressPollRef.current = setInterval(async () => {
                const info = await SoundPlayer.getInfo();
                setCurrentTime(info.currentTime * 1000)
                console.log('audio info', info)
            }, 100)
        } else {
            _clearProgressPoll()
        }
        return _clearProgressPoll
    }, [playing])



    // Load the audio file when the component mounts
    const loadAudio = async () => {
        try {
            // Load the local audio file
            SoundPlayer.loadAsset(asset);

            const info = await SoundPlayer.getInfo();
            setDuration(info.duration * 1000);
            setIsReady(true);
        } catch (error) {
            console.error('Error loading sound:', error);
            setIsReady(false);
        }
    };


    //clear interval when needed
    const _clearProgressPoll = () => {
        if (progressPollRef.current) {
            clearInterval(progressPollRef.current)
            progressPollRef.current = null
        }
    }


    // Toggle play/pause
    const _toggle = () => {
        if (playing) {
            SoundPlayer.pause();
            setPlaying(false);
        } else {
            SoundPlayer.play();
            setPlaying(true);
        }
    };


    // Seek to a specific time
    const _seek = (timeMillis: number) => {
        SoundPlayer.seek(timeMillis / 1000);
        setCurrentTime(timeMillis / 1000);
    };


    return {
        isReady,
        playing,
        currentTime,
        duration,
        seek: _seek,
        toggle: _toggle,
    };
};

