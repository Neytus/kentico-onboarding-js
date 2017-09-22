import { IAction } from './IAction';
import { IFetchedNode } from './actionCreators';
import { DEFAULT_ROUTE } from '../constants/routes';

interface IFetchNodesDependencies {
  fetch: Fetch;
  fetchRequest: () => IAction;
  fetchSuccess: (nodes: Array<IFetchedNode>) => IAction;
  fetchFailure: (text: string) => IAction;
}

const parseFetchedNodes = (nodes: Array<IFetchedNode>): Array<IFetchedNode> => nodes.map(({id, text}) => ({id, text}));

export const fetchNodesFactory = (dependencies: IFetchNodesDependencies): ((dispatch: Dispatch) => Promise<IAction>) => {
    return (dispatch: Dispatch): Promise<IAction> => {
      dispatch(dependencies.fetchRequest());
      return fetch(DEFAULT_ROUTE)
        .then(response => response.json())
        .then(json => parseFetchedNodes(json))
        .then(nodes => dispatch(dependencies.fetchSuccess(nodes)))
        .catch(error => {
          return dispatch(dependencies.fetchFailure(error.message));
        });
    };
};
