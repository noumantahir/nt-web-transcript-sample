import { useState, useEffect } from "react";

export const useAudio = (src: string | string[]) => {
    const [audio] = useState(new Audio(src));
    const [playing, setPlaying] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [isEnded, setIsEnded] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);

    const _toggle = () => {
        setPlaying(!playing);
        if(isEnded){
            setIsEnded(false);
        }
    }

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    },
        [playing]
    );

    useEffect(() => {
        audio.addEventListener('ended', () => {
            setPlaying(false);
            setIsEnded(true);
        });
        audio.addEventListener("canplaythrough", () => {
            setIsReady(true);
         
        });

        audio.addEventListener('timeupdate', () => {
            setCurrentTime(audio.currentTime * 1000);
        })

        return () => {
            audio.addEventListener("canplaythrough", () => { });
            audio.addEventListener("timeupdate", () => { });
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    const _seek = (timeMillis: number) => {
        const timeSec = timeMillis / 1000
        if (timeSec < audio.duration) {
            audio.currentTime = timeSec;
        }
    }

    return {
        isReady,
        playing,
        currentTime: currentTime,
        duration: audio.duration * 1000,
        seek: _seek,
        toggle: _toggle
    };
};
