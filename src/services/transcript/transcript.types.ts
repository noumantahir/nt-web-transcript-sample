

export interface TranscriptEntry {
    speaker: string;    // The name of the speaker
    message: string;    // The text of the message
    duration: number;   // Duration of the message (e.g., how long the message lasts)
    startTime: number;  // Start time of the message (timestamp)
    endTime: number; // End time of the message (timestamp)
}


export interface TranscriptMeta {
    pause: number;    // The pause time between phrases
    speakers: Speaker[];  // An array of speakers in the conversation
}


interface Phrase {
    words: string;  // The content of the phrase
    time: number;   // The time associated with the phrase (e.g., timestamp or duration)
}

interface Speaker {
    name: string;   // Name of the speaker
    phrases: Phrase[];  // An array of phrases spoken by the speaker
}
