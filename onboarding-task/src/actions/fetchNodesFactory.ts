import { IAction } from './IAction';
import { INodeContent, IServerNode } from '../models/NodeContent';

interface IFetchNodesDependencies {
  getNodes: () => Promise<Array<IServerNode>>;
  fetchRequest: () => IAction;
  fetchSuccess: (nodes: Array<INodeContent>) => IAction;
  fetchFailure: (text: string) => IAction;
  parseFetchedNodes: (nodes: Array<IServerNode>) => Array<INodeContent>;
}

export const fetchNodesFactory = (dependencies: IFetchNodesDependencies) => () => {
  return (dispatch: Dispatch): Promise<IAction> => {
    dispatch(dependencies.fetchRequest());

    return dependencies.getNodes()
      .then(json => dependencies.parseFetchedNodes(json))
      .then(nodes => dispatch(dependencies.fetchSuccess(nodes)))
      .catch(error => dispatch(dependencies.fetchFailure(error.message)));
  };
};
