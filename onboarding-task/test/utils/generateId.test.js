import { generateId } from '../../src/utils/generateId';

describe('generateId', () => {
  it('generates ID in GUID format', () => {
    const guidRegex = new RegExp('^[0-9a-fA-F]{32}$');
    const match = guidRegex.exec(generateId());
    expect(match.index).toBe(0);
  });
});
