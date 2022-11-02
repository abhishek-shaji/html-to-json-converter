import { formatTrackGroups } from '../lib/utils/formatTrackGroups';

const mockData = {
  CH_medusa: {
    EM: [
      { actionId: 'EM_Laughing', actionType: 'EM', timestamp: 700, target: 'CH_genius' },
      { actionId: 'EM_Laughing', actionType: 'EM', timestamp: 700, target: 'CH_lucy' },
    ],
    DI: [
      {
        dialog: 'Every day I asked the cards when my baby was coming back. Isn’t that right, Lysi?',
        duration: 5670,
        timestamp: 0,
      },
    ],
  },
  CH_lucy: { DI: [{ dialog: 'Yes, Mama.', duration: 700, timestamp: 5670 }] },
  CH_genius: { DI: [{ dialog: 'Can’t breathe...', duration: 1120, timestamp: 6370 }] },
};

describe('formatTrackGroups', () => {
  it('should properly transform track group data to the desired output format', () => {
    const output = formatTrackGroups(mockData);

    expect(output).toMatchSnapshot();
  });
});
