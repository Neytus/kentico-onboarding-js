import { IAction } from '../IAction';
import { INodeContent, IServerNode } from '../../models/NodeContent';

interface IGetNodesDependencies {
  getNodesFetch: () => Promise<Array<IServerNode>>;
  getNodesStart: () => IAction;
  getNodesSuccess: (nodes: Array<INodeContent>) => IAction;
  getNodesFailure: (text: string) => IAction;
  parseFetchedNodes: (nodes: Array<IServerNode>) => Array<INodeContent>;
}

export const getNodesFactory = (dependencies: IGetNodesDependencies) => () => {
  return (dispatch: Dispatch): Promise<IAction> => {
    dispatch(dependencies.getNodesStart());

    return dependencies.getNodesFetch()
      .then(json => dependencies.parseFetchedNodes(json))
      .then(nodes => dispatch(dependencies.getNodesSuccess(nodes)))
      .catch(error => dispatch(dependencies.getNodesFailure(error.message)));
  };
};
