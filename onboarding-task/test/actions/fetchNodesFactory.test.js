import { fetchNodesFactory } from '../../src/actions/fetchNodesFactory.ts';
import { FETCH_NODES_SUCCESS } from '../../src/actions/actionTypes.ts';

describe('fetchNodesFactory', () => {
  const id = 'bf2c5661-bd00-4e10-9d2a-2562823041e3';
  const text = 'testing text';
  const node = {
    id,
    text,
  };
  const nodesArray = new Array(node);

  it('performs successful fetch and returns correct data ', () => {
    const fetchRequest = jest.fn(input => input);
    const fetchFailure = jest.fn(input => input);
    const parseFetchedNodes = jest.fn(input => input);

    const myFetch = () => ({
      response: { ok: true },
      then: () => Promise.resolve(nodesArray),
    });
    const dispatch = jest.fn(input => input);

    const fetchSuccess = jest.fn(input => ({
      type: FETCH_NODES_SUCCESS,
      payload: {
        nodes: input,
      },
    }));

    const fetchNodes = fetchNodesFactory({
      fetch: myFetch,
      fetchRequest,
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
