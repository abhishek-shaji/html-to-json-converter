const formatTracks = (trackMap) =>
  Object.keys(trackMap).reduce((accum, type) => {
    return [
      ...accum,
      {
        type,
        actions: trackMap[type],
      },
    ];
  }, []);

export const formatTrackGroups = (trackGroupData) =>
  Object.keys(trackGroupData).reduce(
    (accum, target) => {
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
