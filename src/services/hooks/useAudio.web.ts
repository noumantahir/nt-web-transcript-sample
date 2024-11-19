import { useState, useEffect } from "react";

export const useAudio = (src: string | string[]) => {
    const [audio] = useState(new Audio(src));
    const [playing, setPlaying] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    const _toggle = () => setPlaying(!playing);

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    },
        [playing]
    );

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        audio.addEventListener("canplaythrough", () => {
            setIsReady(true);
        });

        audio.addEventListener('timeupdate', () => {
            setCurrentTime(Math.round(audio.currentTime * 1000) / 1000);
        })

        return () => {
            audio.addEventListener("canplaythrough", () => { });
            audio.addEventListener("timeupdate", () => { });
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    const _seek = (timeMillis: number) => {
        if (timeMillis < audio.duration) {
            audio.currentTime = timeMillis;
        }
    }

    return {
        isReady,
        playing,
        currentTime: currentTime,
        duration: audio.duration,
        seek: _seek,
        toggle: _toggle
    };
};
