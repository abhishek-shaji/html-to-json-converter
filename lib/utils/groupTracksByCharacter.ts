import { CLASS_NAME_DIALOG } from '../constants/classNames';
import { extractTracksFromDialog } from './extractTracksFromDialog';

export const groupTracksByCharacter = (elements: NodeListOf<Element>) => {
  const targets = {};
  let offset = 0;

  for (const [elementIndex, element] of elements.entries()) {
    const isDialog = element.classList.contains(CLASS_NAME_DIALOG);

    if (isDialog) {
      const character = elements[elementIndex - 1].innerHTML;

      if (!targets[character]) {
        targets[character] = {};
      }

      const { trackMap, dialogueDuration } = extractTracksFromDialog(
        element,
        targets[character],
        offset
      );

      offset = offset + dialogueDuration;

      targets[character] = trackMap;
    }
  }

  return targets;
};
