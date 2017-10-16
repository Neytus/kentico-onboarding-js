import { IAction } from '../../@types/global';
import { INodeContent, IServerNode } from '../../models/NodeContent';

interface IAddNodeDependencies {
  addNodeFetch: Fetch;
  addNodeStart: () => IAction;
  addNodeOptimistically: (node: INodeContent) => IAction;
  addNodeSuccess: (temporaryId: Guid, node: INodeContent) => IAction;
  addNodeFailure: (text: string) => IAction;
  parseFetchedNode: (node: IServerNode) => INodeContent;
  idGenerator: () => Guid;
}

export const addNodeFactory = (dependencies: IAddNodeDependencies) => (text: string) => {
  return (dispatch: Dispatch): Promise<IAction> => {
    dispatch(dependencies.addNodeStart());
    const temporaryId = dependencies.idGenerator();
    dispatch(dependencies.addNodeOptimistically({id: temporaryId, text}));
    return dependencies.addNodeFetch(text)
      .then((json: any) => dependencies.parseFetchedNode(json))
      .then(node => dispatch(dependencies.addNodeSuccess(temporaryId, node)))
      .catch(error => dispatch(dependencies.addNodeFailure(error.message)));
  };
};
