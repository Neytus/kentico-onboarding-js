import { addNodeFactory } from '../../src/actions/postNodeFactory';

describe('addNodeFactory', () => {
  const id = 'bf2c5661-bd00-4e10-9d2a-2562823041e3';
  const text = 'testing text';
  const node = {
    id,
    text,
  };
  const identityFunction = jest.fn((input: any) => input);
  const postRequest = jest.fn(() => 'REQUEST_HAS_BEEN_CALLED');
  const idGenerator = jest.fn(() => '6267be54-5dbd-4ced-9c90-3a197ddb5107');

  it('dispatches addNodeRequest action', () => {
    const myFetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify({ok: true}))));
    const dispatch = identityFunction;

    const postNode = addNodeFactory({
      addNodeFetch: myFetch,
      addNodeRequest: postRequest,
      addNodeOptimistically: identityFunction,
      addNodeSuccess: identityFunction,
      addNodeFailure: identityFunction,
      parseFetchedNode: identityFunction,
      idGenerator
    });

    return postNode(text)(dispatch).then(() => {
      expect(postRequest.mock.calls.length).toEqual(1);
      expect(dispatch.mock.calls[0][0]).toEqual('REQUEST_HAS_BEEN_CALLED');
    });
  });

  it('dispatches optimistic post action with correct data', () => {
    const myFetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify({ok: true}))));
    const dispatch = identityFunction;
    const optimisticPost = jest.fn(() => 'something');

    const postNode = addNodeFactory({
      addNodeFetch: myFetch,
      addNodeRequest: postRequest,
      addNodeOptimistically: optimisticPost,
      addNodeSuccess: identityFunction,
      addNodeFailure: identityFunction,
      parseFetchedNode: identityFunction,
      idGenerator
    });

    return postNode(text)(dispatch).then(() => {
      expect(optimisticPost.mock.calls.length).toEqual(1);

      const dispatchCallArguments = dispatch.mock.calls[1][0];
      const expectedId = idGenerator();

      expect(dispatchCallArguments.id).toEqual(expectedId);
      expect(dispatchCallArguments.text).toEqual(text);
    });
  });

  it('addNodeFetch method has been called', () => {
    const myFetch = jest.fn(() => Promise.resolve(node));
    const dispatch = identityFunction;

    const postNode = addNodeFactory({
      addNodeFetch: myFetch,
      addNodeRequest: postRequest,
      addNodeOptimistically: identityFunction,
      addNodeFailure: identityFunction,
      addNodeSuccess: identityFunction,
      parseFetchedNode: identityFunction,
      idGenerator,
    });

    return postNode(text)(dispatch).then(() => expect(myFetch.mock.calls.length).toEqual(1));
  });

  it('dispatches addNodeSuccess action correctly ', () => {
    const temporaryId = idGenerator();
    const myFetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify({ok: true}))));
    const parseFetchedNode = jest.fn(() => ({id, text}));
    const postSuccess = jest.fn(() => ({
      type: 'ADD_NODE_SUCCESS',
      payload: {
        id,
        text,
        temporaryId,
      },
    }));
    const dispatch = jest.fn(input => input);

    const postNode = addNodeFactory({
      addNodeFetch: myFetch,
      addNodeRequest: identityFunction,
      addNodeOptimistically: identityFunction,
      addNodeSuccess: postSuccess,
      addNodeFailure: identityFunction,
      parseFetchedNode,
      idGenerator,
    });

    return postNode(text)(dispatch).then(() => {
      expect(postSuccess.mock.calls.length).toEqual(1);
      expect(dispatch.mock.calls[2][0]).toEqual(postSuccess());
    });
  });

  it('dispatches addNodeFailure correctly', () => {
    const myFetch = jest.fn(() => Promise.reject(new Response(JSON.stringify({ok: false}))));
    const newPostFailure = jest.fn(() => 'Posting a node has failed.');
    const dispatch = identityFunction;

    const postNode = addNodeFactory({
      addNodeFetch: myFetch,
      addNodeRequest: identityFunction,
      addNodeOptimistically: identityFunction,
      addNodeSuccess: identityFunction,
      addNodeFailure: newPostFailure,
      parseFetchedNode: identityFunction,
      idGenerator,
    });

    return postNode(text)(dispatch).then(() => {
      expect(newPostFailure.mock.calls.length).toEqual(1);
    });
  });
});
