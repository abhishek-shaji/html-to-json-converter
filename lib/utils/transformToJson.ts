import { groupTracksByCharacter } from './groupTracksByCharacter';
import { formatTrackGroups } from './formatTrackGroups';

export const transformToJson = (elements: NodeListOf<Element>) => {
  const targets = groupTracksByCharacter(elements);
  const formattedData = formatTrackGroups(targets);

  return JSON.stringify(formattedData, null, 2);
};
