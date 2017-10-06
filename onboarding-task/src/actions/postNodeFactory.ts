import { IAction } from './IAction';
import { INodeContent, IServerNode } from '../models/NodeContent';

interface IPostNodeDependencies {
  postNodeFetch: Fetch;
  postNodeRequest: () => IAction;
  postNodeOptimistically: (node: INodeContent) => IAction;
  postNodeSuccess: (temporaryId: Guid, node: INodeContent) => IAction;
  postNodeFailure: (text: string) => IAction;
  parseFetchedNode: (node: IServerNode) => INodeContent;
  idGenerator: () => Guid;
}

export const postNodeFactory = (dependencies: IPostNodeDependencies) => (text: string) => {
  return (dispatch: Dispatch): Promise<IAction> => {
    dispatch(dependencies.postNodeRequest());
    const temporaryId = dependencies.idGenerator();
    dispatch(dependencies.postNodeOptimistically({id: temporaryId, text}));
    return dependencies.postNodeFetch(text)
      .then((json: any) => dependencies.parseFetchedNode(json))
      .then(node => dispatch(dependencies.postNodeSuccess(temporaryId, node)))
      .catch(error => dispatch(dependencies.postNodeFailure(error.message)));
  };
};
