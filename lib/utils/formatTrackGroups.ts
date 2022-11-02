import { OutputType, TrackType } from '../types/output';

const formatTracks = (trackMap): TrackType[] =>
  Object.keys(trackMap).reduce((accum: TrackType[], type): TrackType[] => {
    return [
      ...accum,
      {
        type,
        actions: trackMap[type],
      },
    ];
  }, []);

export const formatTrackGroups = (trackGroupData): OutputType =>
  Object.keys(trackGroupData).reduce(
    (accum: OutputType, target): OutputType => {
      return {
        trackGroups: [
          ...accum.trackGroups,
          {
            target,
            tracks: formatTracks(trackGroupData[target]),
          },
        ],
      };
    },
    {
      trackGroups: [],
    }
  );
