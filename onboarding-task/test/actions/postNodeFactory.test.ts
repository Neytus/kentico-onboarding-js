import { postNodeFactory } from '../../src/actions/postNodeFactory';

describe('postNodeFactory', () => {
  const id = 'bf2c5661-bd00-4e10-9d2a-2562823041e3';
  const text = 'testing text';
  const node = {
    id,
    text,
  };
  const identityFunction = jest.fn((input: any) => input);
  const postRequest = jest.fn(() => 'REQUEST_HAS_BEEN_CALLED');
  const idGenerator = jest.fn(() => '6267be54-5dbd-4ced-9c90-3a197ddb5107');

  it('dispatches post request action', () => {
    const myFetch = () => Promise.resolve(new Response(JSON.stringify({ok: true})));
    const dispatch = identityFunction;

    const postNode = postNodeFactory({
      postNodeFetch: myFetch,
      postNodeRequest: postRequest,
      postNodeOptimistically: identityFunction,
      postNodeSuccess: identityFunction,
      postNodeFailure: identityFunction,
      parseFetchedNode: identityFunction,
      idGenerator
    });

    return postNode(text)(dispatch).then(() => {
      expect(postRequest.mock.calls.length).toEqual(1);
      expect(dispatch.mock.calls[0][0]).toEqual('REQUEST_HAS_BEEN_CALLED');
    });
  });

  it('postNodeFetch method has been called', () => {
    const myFetch = jest.fn(() => Promise.resolve(node));
    const dispatch = identityFunction;

    const postNode = postNodeFactory({
      postNodeFetch: myFetch,
      postNodeRequest: postRequest,
      postNodeOptimistically: identityFunction,
      postNodeFailure: identityFunction,
      postNodeSuccess: identityFunction,
      parseFetchedNode: identityFunction,
      idGenerator,
    });

    return postNode(text)(dispatch).then(() => expect(myFetch.mock.calls.length).toEqual(1));
  });

  it('performs successful post action and returns correct data ', () => {
    const myFetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify({ok: true}))));
    const postSuccess = jest.fn(input => ({
      type: 'POST_NODE_SUCCESS',
      payload: {
        id: input.id,
        text: input.text,
      },
    }));
    const dispatch = jest.fn(input => input);

    const postNode = postNodeFactory({
      postNodeFetch: myFetch,
      postNodeRequest: identityFunction,
      postNodeOptimistically: identityFunction,
      postNodeSuccess: postSuccess,
      postNodeFailure: identityFunction,
      parseFetchedNode: jest.fn(() => ({id, text})),
      idGenerator,
    });

    return postNode(text)(dispatch).then(() => {
      const dispatchCallArguments = dispatch.mock.calls[1][0];

      expect(dispatchCallArguments.type).toEqual('POST_NODE_SUCCESS');
      expect(dispatchCallArguments.payload.text).toEqual(node.text);
    });
  });

  it('returns correct error message after failing to post', () => {
    const myFetch = jest.fn(() => Promise.reject(new Response(JSON.stringify({ok: false}))));
    const newPostFailure = jest.fn(() => 'Posting a node has failed.');
    const dispatch = identityFunction;

    const postNode = postNodeFactory({
      postNodeFetch: myFetch,
      postNodeRequest: identityFunction,
      postNodeOptimistically: identityFunction,
      postNodeSuccess: identityFunction,
      postNodeFailure: newPostFailure,
      parseFetchedNode: identityFunction,
      idGenerator,
    });

    return postNode(text)(dispatch).then(() => {
      expect(newPostFailure.mock.calls.length).toEqual(1);
    });
  });
});
