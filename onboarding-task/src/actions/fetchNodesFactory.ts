import { IAction } from './IAction';
import { INodeContent, IServerNode } from '../models/NodeContent';

interface IFetchNodesDependencies {
  getNodesFetch: () => Promise<Array<IServerNode>>;
  getNodesRequest: () => IAction;
  getNodesSuccess: (nodes: Array<INodeContent>) => IAction;
  getNodesFailure: (text: string) => IAction;
  parseFetchedNodes: (nodes: Array<IServerNode>) => Array<INodeContent>;
}

export const fetchNodesFactory = (dependencies: IFetchNodesDependencies) => () => {
  return (dispatch: Dispatch): Promise<IAction> => {
    dispatch(dependencies.getNodesRequest());

    return dependencies.getNodesFetch()
      .then(json => dependencies.parseFetchedNodes(json))
      .then(nodes => dispatch(dependencies.getNodesSuccess(nodes)))
      .catch(error => dispatch(dependencies.getNodesFailure(error.message)));
  };
};
