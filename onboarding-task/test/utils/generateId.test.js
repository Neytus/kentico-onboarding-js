import { generateId } from '../../src/utils/generateId.ts';

describe('generateId', () => {
  it('generates ID in GUID format', () => {
    const guidRegex = new RegExp('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');

    expect(generateId()).toMatch(guidRegex);
  });
});
