import { IAction } from './IAction';
import { INodeContent, IServerNode } from '../models/NodeContent';

interface IPostNodeDependencies {
  postNodeFetch: any;
  postRequest: () => IAction;
  postSuccess: (node: INodeContent) => IAction;
  postFailure: (text: string) => IAction;
  parseFetchedNode: (node: IServerNode) => INodeContent;
}

export const postNodeFactory = (dependencies: IPostNodeDependencies) => (text: string) => {
  return (dispatch: Dispatch): Promise<IAction> => {
    dispatch(dependencies.postRequest());
    return dependencies.postNodeFetch(text)
      .then((response: any) => response.json())
      .then((json: any) => dependencies.parseFetchedNode(json))
      .then((node: any) => dispatch(dependencies.postSuccess(node)))
      .catch((error: any) => dispatch(dependencies.postFailure(error.message)));
  };
};
