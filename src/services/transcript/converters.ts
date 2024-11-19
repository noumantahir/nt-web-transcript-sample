import { InterleavedItem, TranscriptMeta } from "./transcript.types";


export const convertMetaToInterleave = (rawData: TranscriptMeta) => {

    if(!rawData){
        throw new Error("Invalid data");
    }

    const { pause, speakers } = rawData;

    // Prepare arrays for each speaker's phrases
    const speakerQueues = speakers.map(speaker =>
        speaker.phrases.map(phrase => ({
            speaker: speaker.name,
            message: phrase.words,
            time: phrase.time
        }))
    );

    const result: InterleavedItem[] = [];
    let startTime = 0;
    let index = 0;

    // Interleave and adjust times
    while (speakerQueues.some(queue => queue.length > 0)) {
        // Get the next speaker's phrase, if available
        const queue = speakerQueues[index % speakerQueues.length];
        if (queue.length > 0) {
            const phrase = queue.shift();

            if (phrase) {
                if (result.length > 0) {
                    const previousItem = result[index - 1];
                    startTime = previousItem.startTime + previousItem.duration + pause;
                }

                result.push({
                    speaker: phrase.speaker,
                    message: phrase.message,
                    startTime: startTime,
                    duration: phrase?.time
                });
            }
        }
        index++;
    }

    return result;

}