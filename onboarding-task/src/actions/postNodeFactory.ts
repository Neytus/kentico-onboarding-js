import { IAction } from './IAction';
import { INodeContent, IServerNode } from '../models/NodeContent';

interface IPostNodeDependencies {
  postNodeFetch: any;
  postNodeRequest: () => IAction;
  postNodeSuccess: (node: INodeContent) => IAction;
  postNodeFailure: (text: string) => IAction;
  parseFetchedNode: (node: IServerNode) => INodeContent;
}

export const postNodeFactory = (dependencies: IPostNodeDependencies) => (text: string) => {
  return (dispatch: Dispatch): Promise<IAction> => {
    dispatch(dependencies.postNodeRequest());
    return dependencies.postNodeFetch(text)
      .then((json: any) => dependencies.parseFetchedNode(json))
      .then((node: any) => dispatch(dependencies.postNodeSuccess(node)))
      .catch((error: any) => dispatch(dependencies.postNodeFailure(error.message)));
  };
};
