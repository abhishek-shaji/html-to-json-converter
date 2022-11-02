import { JSDOM } from 'jsdom';
import { extractTracksFromDialog } from '../lib/utils/extractTracksFromDialog';
import {
  TRACK_TYPE_ANIMATION,
  TRACK_TYPE_DIALOGUE,
  TRACK_TYPE_EMOTION,
} from '../lib/constants/trackTypes';

const mockHtmlWithoutActions = `
<div class="dialog">Test Dialog</div>
`;

const mockHtmlWithActions = `
<div class="dialog">Test Dialog with actions <span class="text__action" data-action-type="EM" data-action-target="CH_genius" data-action-id="EM_Laughing">Laughing</span>test<span class="text__action" data-action-type="EM" data-action-target="CH_lucy" data-action-id="EM_Laughing">Laughing</span>test<span class="text__action" data-action-type="AN" data-action-target="CH_genius" data-action-id="AN_Wave">Wave</span>Test dialog?</div>
`;

describe('extractTracksFromDialog', () => {
  it('should properly extract dialog data fom dialog element that contains no actions', () => {
    const { window } = new JSDOM(mockHtmlWithoutActions);

    const dialogElement = window.document.querySelector('.dialog');

    const response = extractTracksFromDialog(dialogElement, {}, 0);

    expect(response).toMatchSnapshot();
    expect(response.dialogueDuration).toEqual(770);
    expect(response.trackMap[TRACK_TYPE_DIALOGUE][0].dialog).toEqual('Test Dialog');
    expect(response.trackMap[TRACK_TYPE_DIALOGUE][0].timestamp).toEqual(0);
  });

  it('should extract dialog and action data fom dialog element that contains multiple actions', () => {
    const { window } = new JSDOM(mockHtmlWithActions);

    const dialogElement = window.document.querySelector('.dialog');

    const response = extractTracksFromDialog(dialogElement, {}, 0);

    expect(response).toMatchSnapshot();
    expect(response.dialogueDuration).toEqual(3150);
    expect(response.trackMap[TRACK_TYPE_DIALOGUE].length).toEqual(1);
    expect(response.trackMap[TRACK_TYPE_EMOTION].length).toEqual(2);
    expect(response.trackMap[TRACK_TYPE_ANIMATION].length).toEqual(1);
  });

  it('should properly calculate timestamp when a dialog element with emotion and animation is passed', () => {
    const { window } = new JSDOM(mockHtmlWithActions);

    const dialogElement = window.document.querySelector('.dialog');

    const response = extractTracksFromDialog(dialogElement, {}, 0);

    expect(response).toMatchSnapshot();
    expect(response.dialogueDuration).toEqual(3150);
    expect(response.trackMap[TRACK_TYPE_DIALOGUE][0].timestamp).toEqual(0);
    expect(response.trackMap[TRACK_TYPE_EMOTION][0].timestamp).toEqual(1750);
    expect(response.trackMap[TRACK_TYPE_EMOTION][1].timestamp).toEqual(2030);
    expect(response.trackMap[TRACK_TYPE_ANIMATION][0].timestamp).toEqual(2310);
  });

  it('should properly calculate timestamp when a dialog element with emotion and animation is passed with offset', () => {
    const { window } = new JSDOM(mockHtmlWithActions);

    const dialogElement = window.document.querySelector('.dialog');

    const response = extractTracksFromDialog(dialogElement, {}, 1000);

    expect(response).toMatchSnapshot();
    expect(response.dialogueDuration).toEqual(3150);
    expect(response.trackMap[TRACK_TYPE_DIALOGUE][0].timestamp).toEqual(1000);
    expect(response.trackMap[TRACK_TYPE_EMOTION][0].timestamp).toEqual(2750);
    expect(response.trackMap[TRACK_TYPE_EMOTION][1].timestamp).toEqual(3030);
    expect(response.trackMap[TRACK_TYPE_ANIMATION][0].timestamp).toEqual(3310);
  });
});
