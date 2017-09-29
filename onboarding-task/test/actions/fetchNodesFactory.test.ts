import { fetchNodesFactory } from '../../src/actions/fetchNodesFactory';
import { fetchNodesFailure } from '../../src/actions/actionCreators';

describe('fetchNodesFactory', () => {
  const id = 'bf2c5661-bd00-4e10-9d2a-2562823041e3';
  const text = 'testing text';
  const node = {
    id,
    text,
  };
  const nodesArray = [node];
  const fetchRequest = jest.fn(() => ({type: 'FETCH_HAS_BEEN_REQUESTED'}));
  const fetchFailure = jest.fn(input => input);

  it('dispatches getNodes fetch request action', () => {
    const myFetch = jest.fn(() => Promise.resolve(nodesArray));
    const fetchSuccess = jest.fn(input => input);
    const dispatch = jest.fn(input => input);

    const fetchNodes = fetchNodesFactory({
      getNodes: myFetch,
      fetchRequest,
      fetchFailure,
      fetchSuccess,
      parseFetchedNodes: jest.fn(input => input)
    });

    return fetchNodes()(dispatch).then(() => {
      expect(fetchRequest.mock.calls.length).toEqual(1);
      expect(dispatch.mock.calls[0][0]).toEqual({type: 'FETCH_HAS_BEEN_REQUESTED'});
    });
  });

  it('getNodesFetch method has been called', () => {
    const myFetch = jest.fn(() => Promise.resolve(nodesArray));
    const fetchSuccess = jest.fn(input => input);
    const dispatch = jest.fn(input => input);

    const fetchNodes = fetchNodesFactory({
      getNodes: myFetch,
      fetchRequest,
      fetchFailure,
      fetchSuccess,
      parseFetchedNodes: jest.fn(input => input)
    });

    return fetchNodes()(dispatch).then(() => expect(myFetch.mock.calls.length).toEqual(1));
  });

  it('performs successful getNodesFetch and returns correct data ', () => {
    const myFetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify({ok: true}))));
    const fetchSuccess = jest.fn(input => input);
    const dispatch = jest.fn(input => input);

    const fetchNodes = fetchNodesFactory({
      getNodes: myFetch,
      fetchRequest: jest.fn(() => null),
      fetchFailure,
      fetchSuccess,
      parseFetchedNodes: jest.fn(() => nodesArray)
    });

    return fetchNodes()(dispatch).then(() => {
      expect(fetchSuccess.mock.calls.length).toEqual(1);
      const dispatchCallArguments = dispatch.mock.calls[1][0];

      expect(dispatchCallArguments).toEqual(nodesArray);
    });
  });

  it('returns getNodesFetch failure action after failing to fetch', () => {
    const myFetch = jest.fn(() => Promise.reject(new Response(JSON.stringify({ok: false}))));
    const newFetchFailure = jest.fn(fetchNodesFailure);
    const dispatch = jest.fn(input => input);

    const fetchNodes = fetchNodesFactory({
      getNodes: myFetch,
      fetchRequest: jest.fn(() => null),
      fetchFailure: newFetchFailure,
      fetchSuccess: jest.fn(() => null),
      parseFetchedNodes: jest.fn(() => nodesArray)
    });

    return fetchNodes()(dispatch).then(() => {
      expect(newFetchFailure.mock.calls.length).toEqual(1);
    });
  });
});
