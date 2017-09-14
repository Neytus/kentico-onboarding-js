import { IAction } from './IAction';
interface IFetchNodesDependencies {
  route: string;
  fetchRequest: any;
  fetchSuccess: any;
  fetchFailure: any;
  parseFetchedNodes: any;
}

export const fetchNodesFactory = (dependencies: IFetchNodesDependencies) => {
    return (dispatch: Dispatch): Promise<IAction> => {
      dispatch(dependencies.fetchRequest());
      return fetch(dependencies.route)
        .then(response => response.json())
        .then(json => dependencies.parseFetchedNodes(json))
        .then(nodes => dispatch(dependencies.fetchSuccess(nodes)))
        .catch(error => {
          return dispatch(dependencies.fetchFailure(error.message));
        });
    };
};


