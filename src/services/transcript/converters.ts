import { TranscriptEntry, TranscriptMeta } from "./transcript.types";

/**
 * To be to effectively process and render transcription data in an array
 * it is best to convert meta data into a single interleaved array to feed directly
 * into flatlist
 * 
 * Another thing this converter does is calculate at what time a phrase would start
 * based on the duration of last phrase and total time played, this would help in triggering
 * exact moment to highlight during audio playback.
 * @param rawData - The transcription metadata .
 * 
 * @returns TranscriptEntry[] - An array of interleaved transcript entries.
 * @throws Error if rawData is invalid.
 */
export const parseInterleavedData = (rawData: TranscriptMeta) => {

    if (!rawData) {
        throw new Error("Invalid data");
    }

    const { pause, speakers } = rawData;

    let result: TranscriptEntry[] = [];
    let startTime = 0;
    let maxPhrases = 0;

    //get max number of phrases per speaker
    //this logic handle edge case of having uneven conversation
    speakers.forEach((speaker) => {
        maxPhrases = maxPhrases < speaker.phrases.length ? speaker.phrases.length : maxPhrases
    })

    //iterate for max number of phrases
    for (let index = 0; index < maxPhrases; index++) {
        //tap each phrase sequencially
        speakers.forEach((speaker) => {

            //check if phrase exist for speaker in queue
            const phrase = speaker.phrases[index];
            if (phrase) {

                //calcaulate phrase start time based on last ending phrase
                //skips this step for first phrase, since it always starts at 0
                if (result.length > 0) {
                    const previousItem = result[result.length - 1];
                    startTime = previousItem.startTime + previousItem.duration + pause;
                }

                //convert to porcessable array item and push to returning array
                result.push({
                    speaker: speaker.name,
                    message: phrase.words,
                    startTime: startTime,
                    duration: phrase?.time
                });
            }
        })
    }

    return result;
}