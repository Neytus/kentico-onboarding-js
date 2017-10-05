import { IAction } from './IAction';
import { INodeContent, IServerNode } from '../models/NodeContent';
import { postNodeOptimistically } from './actionCreators';
import { generateId } from '../utils/generateId';

interface IPostNodeDependencies {
  postNodeFetch: Fetch;
  postNodeRequest: () => IAction;
  postNodeSuccess: (temporaryId: Guid, node: INodeContent) => IAction;
  postNodeFailure: (text: string) => IAction;
  parseFetchedNode: (node: IServerNode) => INodeContent;
}

export const postNodeFactory = (dependencies: IPostNodeDependencies) => (text: string) => {
  return (dispatch: Dispatch): Promise<IAction> => {
    dispatch(dependencies.postNodeRequest());
    const temporaryId = generateId();
    dispatch(postNodeOptimistically({id: temporaryId, text}));
    return dependencies.postNodeFetch(text)
      .then((json: any) => dependencies.parseFetchedNode(json))
      .then(node => dispatch(dependencies.postNodeSuccess(temporaryId, node)))
      .catch(error => dispatch(dependencies.postNodeFailure(error.message)));
  };
};
