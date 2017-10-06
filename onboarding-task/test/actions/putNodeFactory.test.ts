import { putNodeFactory } from '../../src/actions/putNodeFactory';

describe('putNodeFactory', () => {

  const id = 'ef081749-250b-4c35-af07-4ff4364bafa1';
  const text = 'some random text';
  const nodeDataToPut = {id, text};
  const identityFunction = jest.fn((input: any) => input);

  const putRequest = jest.fn(() => ({
    type: 'PUT_REQUEST'
  }));

  it('dispatches putNodeRequest action', () => {
    const myFetch = jest.fn(() => Promise.resolve(nodeDataToPut));
    const dispatch = identityFunction;

    const putNode = putNodeFactory({
      putNodeRequest: putRequest,
      putNodeFetch: myFetch,
      putNodeSuccess: identityFunction,
      putNodeFailure: identityFunction,
    });

    return putNode(nodeDataToPut)(dispatch).then(() => {
      expect(putRequest.mock.calls.length).toEqual(1);
      expect(dispatch.mock.calls[0][0]).toEqual({type: 'PUT_REQUEST'});
    });
  });

  it('calls putNodeFetch method', () => {
    const myFetch = jest.fn(() => Promise.resolve(nodeDataToPut));
    const dispatch = identityFunction;

    const putNode = putNodeFactory({
      putNodeRequest: putRequest,
      putNodeFetch: myFetch,
      putNodeSuccess: identityFunction,
      putNodeFailure: identityFunction,
    });

    return putNode(nodeDataToPut)(dispatch).then(() => expect(myFetch.mock.calls.length).toEqual(1));
  });

  it('dispatches putNodeSuccess action correctly', () => {
    const myFetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify({ok: true}))));
    const dispatch = identityFunction;
    const putNodeSuccess = jest.fn(() => 'SUCCESSFUL_UPDATE');

    const putNode = putNodeFactory({
      putNodeRequest: putRequest,
      putNodeFetch: myFetch,
      putNodeSuccess,
      putNodeFailure: identityFunction,
    });

    return putNode(nodeDataToPut)(dispatch).then(() => {
      expect(putNodeSuccess.mock.calls.length).toEqual(1);
      const dispatchCallArguments = dispatch.mock.calls[1][0];

      expect(dispatchCallArguments).toEqual(nodeDataToPut);
    });
  });

  it('dispatches putNodeFailure correctly', () => {
    const myFetch = jest.fn(() => Promise.reject(new Response(JSON.stringify({ok: false}))));
    const dispatch = identityFunction;
    const putNodeFailure = jest.fn(() => 'deleting failed');

    const putNode = putNodeFactory({
      putNodeRequest: putRequest,
      putNodeFetch: myFetch,
      putNodeSuccess: identityFunction,
      putNodeFailure: putNodeFailure,
    });

    return putNode(nodeDataToPut)(dispatch).then(() =>
      expect(putNodeFailure.mock.calls.length).toEqual(1));
  });
});
