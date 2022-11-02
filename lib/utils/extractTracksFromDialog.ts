import { TIME_BETWEEN_CHAR_MS } from '../constants/duration';
import { TRACK_TYPE_DIALOGUE } from '../constants/trackTypes';

export const extractTracksFromDialog = (
  dialog: Element,
  initialState: any,
  timestampStartAt: number
) => {
  const trackMap = { ...initialState };
  const children = [...dialog.children];

  for (const childElement of children) {
    const actionType = childElement.getAttribute('data-action-type');
    const target = childElement.getAttribute('data-action-target');
    const actionId = childElement.getAttribute('data-action-id');
    const timestamp =
      timestampStartAt + dialog.innerHTML.indexOf(childElement.outerHTML) * TIME_BETWEEN_CHAR_MS;

    if (!trackMap[actionType]) {
      trackMap[actionType] = [];
    }

    trackMap[actionType].push({ actionId, actionType, timestamp, target });

    childElement.remove();
  }

  const dialogueDuration = dialog.textContent.length * TIME_BETWEEN_CHAR_MS;

  if (!trackMap[TRACK_TYPE_DIALOGUE]) {
    trackMap[TRACK_TYPE_DIALOGUE] = [];
  }

  trackMap[TRACK_TYPE_DIALOGUE].push({
    dialog: dialog.textContent,
    duration: dialogueDuration,
    timestamp: timestampStartAt,
  });

  return { trackMap, dialogueDuration };
};
