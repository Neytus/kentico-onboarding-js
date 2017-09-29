import { checkStatus } from '../../src/utils/checkStatus';

describe('checkStatus function', () => {
  it('returns original response if its ok ', () => {
    const responseSuccess = { ok: true } as Response;

    const actualOutput = checkStatus(responseSuccess);

    expect(actualOutput).toEqual(responseSuccess);
  });

  it('throws an error if the response is not ok', () => {
    const responseFail = {ok: false} as Response;

    expect(() => checkStatus(responseFail)).toThrowError();
  });
});
