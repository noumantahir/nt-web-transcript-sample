import rawTranscriptMeta from 'assets/metadata/transcript_meta.json';
import { TranscriptMeta } from './transcript.types';
import { parseInterleavedData } from './converters';

export const parseInterleavedTranscript = async () => {

    try{
        const rawData = rawTranscriptMeta as TranscriptMeta

        if(!rawData){
            throw new Error("Failed to parse json file");
        }

        const data = parseInterleavedData(rawData);

        if(!data){
            throw new Error("Failed to convert meta to interleaved array")
        }

        return data;

    } catch(err){
        console.warn("failed to parse transcript data")
        return [];
    }

    
}