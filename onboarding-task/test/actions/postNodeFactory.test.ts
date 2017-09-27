import { postNodeFactory } from '../../src/actions/postNodeFactory';
import {
  postNodeFailure,
  postNodeRequest
} from '../../src/actions/actionCreators';
import {
  POST_NODE_SUCCESS,
} from '../../src/actions/actionTypes';

describe('postNodeFactory', () => {
  const id = 'bf2c5661-bd00-4e10-9d2a-2562823041e3';
  const text = 'testing text';
  const node = {
    id,
    text,
  };
  const postFailure = jest.fn(input => input);
  const postRequest = jest.fn(() => 'REQUEST_HAS_BEEN_CALLED');

  it('dispatches post request action', () => {
    const myFetch = () => Promise.resolve(node);
    const postSuccess = jest.fn(input => input);
    const dispatch = jest.fn(input => input);

    const postNode = postNodeFactory({
      fetch: myFetch,
      postRequest,
      postSuccess,
      postFailure,
    });

    return postNode(text)(dispatch).then(() => {
      expect(postRequest.mock.calls.length).toEqual(1);
      expect(dispatch.mock.calls[0][0]).toEqual('REQUEST_HAS_BEEN_CALLED');
    });
  });

  it('fetch method has been called', () => {
    const myFetch = jest.fn(() => Promise.resolve(node));
    const postSuccess = jest.fn(input => input);
    const dispatch = jest.fn(input => input);

    const postNode = postNodeFactory({
      fetch: myFetch,
      postRequest,
      postFailure,
      postSuccess,
    });

    return postNode(text)(dispatch).then(() => expect(myFetch.mock.calls.length).toEqual(1));
  });

  it('performs successful post action and returns correct data ', () => {
    const myFetch = () => ({
      response: {ok: true},
      then: () => Promise.resolve({
        id,
        text,
      }),
    });
    const postSuccess = jest.fn(input => ({
      type: POST_NODE_SUCCESS,
      payload: {
        id: input.id,
        text: input.text,
      },
    }));
    const dispatch = jest.fn(input => input);

    const postNode = postNodeFactory({
      fetch: myFetch,
      postRequest: postNodeRequest,
      postSuccess,
      postFailure,
    });

    return postNode(text)(dispatch).then(() => {
      const dispatchCallArguments = dispatch.mock.calls[1][0];

      expect(dispatchCallArguments.type).toEqual(POST_NODE_SUCCESS);
      expect(dispatchCallArguments.payload.text).toEqual(node.text);
    });
  });

  it('returns correct error message after failing to post', () => {
    const myFetch = () => ({
      response: {ok: false},
      then: () => Promise.reject(text)
    });
    const newPostFailure = jest.fn(postNodeFailure);
    const postSuccess = jest.fn(input => input);
    const dispatch = jest.fn(input => input);

    const postNode = postNodeFactory({
      fetch: myFetch,
      postRequest: postNodeRequest,
      postSuccess,
      postFailure: newPostFailure
    });

    return postNode(text)(dispatch).then(() => {
      expect(newPostFailure.mock.calls.length).toEqual(1);
    });
  });
});
