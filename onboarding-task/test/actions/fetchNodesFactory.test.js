import { fetchNodesFactory } from '../../src/actions/fetchNodesFactory.ts';
import {
  FETCH_NODES_SUCCESS,
  FETCH_NODES_REQUEST,
} from '../../src/actions/actionTypes.ts';
import { fetchNodesRequest } from '../../dist/src/actions/actionCreators';

describe('fetchNodesFactory', () => {
  const id = 'bf2c5661-bd00-4e10-9d2a-2562823041e3';
  const text = 'testing text';
  const node = {
    id,
    text,
  };
  const nodesArray = new Array(node);
  const fetchFailure = jest.fn(input => input);
  const parseFetchedNodes = jest.fn(input => input);

  it('dispatches fetched data correctly', () => {
    const myFetch = () => Promise.resolve(nodesArray);
    const fetchSuccess = jest.fn(input => input);
    const dispatch = jest.fn(input => input);

    const fetchNodes = fetchNodesFactory({
      fetch: myFetch,
      fetchRequest: fetchNodesRequest,
      fetchFailure,
      fetchSuccess,
      parseFetchedNodes,
    });

    return fetchNodes(dispatch).then(() => {
      expect(dispatch.mock.calls[0][0].type).toEqual(FETCH_NODES_REQUEST);
    });
  });

  it('performs successful fetch and returns correct data ', () => {
    const myFetch = () => ({
      response: { ok: true },
      then: () => Promise.resolve(nodesArray),
    });
    const fetchSuccess = jest.fn(input => ({
      type: FETCH_NODES_SUCCESS,
      payload: {
        nodes: input,
      },
    }));
    const dispatch = jest.fn(input => input);

    const fetchNodes = fetchNodesFactory({
      fetch: myFetch,
      fetchRequest: fetchNodesRequest,
      fetchFailure,
      fetchSuccess,
      parseFetchedNodes,
    });

    return fetchNodes(dispatch).then(() => {
      const actualOutput = dispatch.mock.calls[1][0];

      expect(actualOutput.type).toEqual(FETCH_NODES_SUCCESS);
      expect(actualOutput.payload.nodes).toEqual(nodesArray);
    });
  });
});
