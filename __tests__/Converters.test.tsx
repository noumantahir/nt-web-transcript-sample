import { parseInterleavedData } from "services/transcript/converters";
import { TranscriptMeta } from "services/transcript/transcript.types";


describe('convertMetaToInterleave', () => {
  it('should throw an error if rawData is null or undefined', () => {
    expect(() => parseInterleavedData (null as unknown as TranscriptMeta)).toThrow('Invalid data');
    expect(() => parseInterleavedData(undefined as unknown as TranscriptMeta)).toThrow('Invalid data');
  });

  it('should interleave phrases and calculate correct times', () => {
    const rawData: TranscriptMeta = {
      pause: 100,
      speakers: [
        {
          name: 'John',
          phrases: [
            { words: 'this is one phrase.', time: 900 },
            { words: 'now the second phrase.', time: 900 },
            { words: 'now the second phrase.', time: 900 },
          ],
        },
        {
          name: 'Jack',
          phrases: [
            { words: 'another speaker here.', time: 900 },
            { words: 'saying her second phrase.', time: 900 }, 
          ],
        },
      ],
    };

    const result = parseInterleavedData(rawData);

    expect(result).toEqual([
      { speaker: 'John', message: 'this is one phrase.', startTime: 0, duration: 900, endTime: 900 },
      { speaker: 'Jack', message: 'another speaker here.', startTime: 1000, duration: 900, endTime: 1900 },
      { speaker: 'John', message: 'now the second phrase.', startTime: 2000, duration: 900, endTime: 2900 },
      { speaker: 'Jack', message: 'saying her second phrase.', startTime: 3000, duration: 900, endTime: 3900 },
      { speaker: 'John', message: 'now the second phrase.', startTime: 4000, duration: 900, endTime: 4900 },
    ]);
  });

  it('should return an empty array if speakers have no phrases', () => {
    const rawData: TranscriptMeta = {
      pause: 250,
      speakers: [
        { name: 'John', phrases: [] },
        { name: 'Jack', phrases: [] },
      ],
    };

    const result = parseInterleavedData(rawData);

    expect(result).toEqual([]);
  });

  it('should handle single speaker with multiple phrases', () => {
    const rawData: TranscriptMeta = {
      pause: 100,
      speakers: [
        {
          name: 'John',
          phrases: [
            { words: 'hello', time: 1000 },
            { words: 'world', time: 2000 },
          ],
        },
      ],
    };

    const result = parseInterleavedData(rawData);

    expect(result).toEqual([
      { speaker: 'John', message: 'hello', startTime: 0, duration: 1000, endTime: 1000 },
      { speaker: 'John', message: 'world', startTime: 1100, duration: 2000, endTime: 3100 },
    ]);
  });

  it('should handle edge case with empty input data', () => {
    const rawData: TranscriptMeta = {
      pause: 100,
      speakers: [],
    };

    const result = parseInterleavedData(rawData);

    expect(result).toEqual([]);
  });
});