import { fetchNodesFactory } from '../../src/actions/fetchNodesFactory.ts';
import { fetchNodesSuccess } from '../../src/actions/actionCreators.ts';

describe('fetchNodesFactory', () => {
  const id = 'bf2c5661-bd00-4e10-9d2a-2562823041e3';
  const text = 'testing text';
  const node = {
    id,
    text,
  };
  const nodesArray = [node];
  const fetchRequest = jest.fn(() => ({ type: 'FETCH_HAS_BEEN_REQUESTED' }));
  const fetchFailure = jest.fn(input => input);

  it('dispatches fetch request action', () => {
    const myFetch = jest.fn(() => Promise.resolve(nodesArray));
    const fetchSuccess = jest.fn(input => input);
    const dispatch = jest.fn(input => input);

    const fetchNodes = fetchNodesFactory({
      fetch: myFetch,
      fetchRequest,
      fetchFailure,
      fetchSuccess,
    });

    return fetchNodes()(dispatch).then(() => {
      expect(fetchRequest.mock.calls.length).toEqual(1);
      expect(dispatch.mock.calls[0][0]).toEqual({ type: 'FETCH_HAS_BEEN_REQUESTED' });
    });
  });

  it('fetch method has been called', () => {
    const myFetch = jest.fn(() => Promise.resolve(nodesArray));
    const fetchSuccess = jest.fn(input => input);
    const dispatch = jest.fn(input => input);

    const fetchNodes = fetchNodesFactory({
      fetch: myFetch,
      fetchRequest,
      fetchFailure,
      fetchSuccess,
    });

    return fetchNodes()(dispatch).then(() => expect(myFetch.mock.calls.length).toEqual(1));
  });

  it('performs successful fetch and returns correct data ', () => {
    const myFetch = () => ({
      response: { ok: true },
      then: () => Promise.resolve(nodesArray),
    });
    const fetchSuccess = jest.fn(fetchNodesSuccess);
    const dispatch = jest.fn(input => input);

    const fetchNodes = fetchNodesFactory({
      fetch: myFetch,
      fetchRequest: () => null,
      fetchFailure,
      fetchSuccess,
    });

    return fetchNodes()(dispatch).then(() => {
      expect(fetchSuccess.mock.calls.length).toBe(1);
      const actualOutput = dispatch.mock.calls[1][0];

      expect(actualOutput).toEqual(fetchNodesSuccess(nodesArray));
      expect(actualOutput.payload.nodes).toEqual(nodesArray);
    });
  });
});
