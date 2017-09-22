import { IAction } from './IAction';
import { IFetchedNode } from './actionCreators';
import { DEFAULT_ROUTE } from '../constants/routes';
interface IPostNodeDependencies {
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
  postRequest: () => IAction;
  postSuccess: (node: IFetchedNode) => IAction;
  postFailure: (text: string) => IAction;
}

export const postNodeFactory = (text: string, dependencies: IPostNodeDependencies): ((dispatch: Dispatch) => Promise<IAction>) => {
  return (dispatch: Dispatch): Promise<IAction> => {
    dispatch(dependencies.postRequest());
    return fetch(DEFAULT_ROUTE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({text}),
    })
      .then(response => response.json())
      .then(json => dispatch(dependencies.postSuccess({id: json.id, text: json.text})))
      .catch(error => {
        return dispatch(dependencies.postFailure(error.message));
      });
  };
};
