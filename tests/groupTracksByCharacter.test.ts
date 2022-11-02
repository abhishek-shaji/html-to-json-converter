import { parseElementsFromString } from '../lib/utils/parseElementsFromString';
import { groupTracksByCharacter } from '../lib/utils/groupTracksByCharacter';
import { TRACK_TYPE_DIALOGUE } from '../lib/constants/trackTypes';

const CHARACTER_NAME_LUCY = 'lucy';
const LUCY_DIALOG = 'Lorem ipsum dolor sit ame';
const CHARACTER_NAME_TIM = 'tim';
const TIM_DIALOG = 'nisi ut aliquip ex ea';

const mockContent = `
  <div class='character'>${CHARACTER_NAME_LUCY}</div>
  <div class='dialog'>${LUCY_DIALOG}</div>
  <div class='character'>${CHARACTER_NAME_TIM}</div>
  <div class='dialog'>${TIM_DIALOG}</div>
`;

describe('groupTracksByCharacter', () => {
  it('should properly group dialog and action data by character name', () => {
    const elements = parseElementsFromString(mockContent);

    const response = groupTracksByCharacter(elements);

    expect(response).toMatchSnapshot();
    expect(response[CHARACTER_NAME_LUCY][TRACK_TYPE_DIALOGUE].length).toEqual(1);
    expect(response[CHARACTER_NAME_LUCY][TRACK_TYPE_DIALOGUE][0].dialog).toEqual(LUCY_DIALOG);
    expect(response[CHARACTER_NAME_LUCY][TRACK_TYPE_DIALOGUE][0].timestamp).toEqual(0);
    expect(response[CHARACTER_NAME_LUCY][TRACK_TYPE_DIALOGUE][0].duration).toEqual(1750);

    expect(response[CHARACTER_NAME_TIM][TRACK_TYPE_DIALOGUE].length).toEqual(1);
    expect(response[CHARACTER_NAME_TIM][TRACK_TYPE_DIALOGUE][0].dialog).toEqual(TIM_DIALOG);
    expect(response[CHARACTER_NAME_TIM][TRACK_TYPE_DIALOGUE][0].timestamp).toEqual(1750);
    expect(response[CHARACTER_NAME_TIM][TRACK_TYPE_DIALOGUE][0].duration).toEqual(1470);
  });
});
