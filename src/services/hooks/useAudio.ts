import { useState, useEffect, useRef } from 'react';
import Sound from 'react-native-sound';

Sound.setCategory('Playback'); // Required for iOS playback


export const useAudio = (src: string) => {

    const [playing, setPlaying] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const audio = useRef<Sound | null>(new Sound(src));
    const intervalRef = useRef<NodeJS.Timeout | null>();


    useEffect(() => {

        if (audio.current?.isLoaded) {

            setDuration(audio.current.getDuration());
            setIsReady(true);

            // Listen for current time updates
            intervalRef.current = setInterval(() => {
                if (audio.current) {
                    audio.current.getCurrentTime((time) => {
                        setCurrentTime(time);  // Update current time
                    });
                }
            }, 100);
        }

        return _cleanup;

    }, [src, audio.current?.isLoaded]);


    // Cleanup: remove the interval and audio instance on unmount
    const _cleanup = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        if (audio.current) {
            audio.current.release();  // Free up the audio resources
        }
    }


    // Toggle play/pause state
    const _toggle = () => {
        if (audio.current) {
            if (playing) {
                audio.current.pause();
            } else {
                audio.current.play((success) => {
                    if (!success) {
                        console.log('Playback failed');
                    }
                });
            }
            setPlaying(!playing);
        }
    };


    // Seek to a specific time
    const _seek = (seconds: number) => {
        if (audio.current) {
            audio.current.setCurrentTime(seconds);  // Set the audio to the desired position
            setCurrentTime(seconds);
        }
    };



    // Return the necessary states and methods
    return {
        isReady,
        playing,
        currentTime,
        duration,
        seek: _seek,
        toggle: _toggle,
    };

}