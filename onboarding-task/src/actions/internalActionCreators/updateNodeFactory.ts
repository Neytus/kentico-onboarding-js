import { IAction } from '../../@types/global';
import { INodeContent } from '../../models/NodeContent';

interface IUpdateNodeDependencies {
  updateNodeFetch: Fetch;
  updateNodeStart: () => IAction;
  updateNodeSuccess: (node: INodeContent) => IAction;
  updateNodeFailure: (text: string) => IAction;
}

export const updateNodeFactory = (dependencies: IUpdateNodeDependencies) => (updateNode: INodeContent) => {
  return (dispatch: Dispatch): Promise<IAction> => {
    dispatch(dependencies.updateNodeStart());
    return dependencies.updateNodeFetch(updateNode)
      .then(() => dispatch(dependencies.updateNodeSuccess(updateNode)))
      .catch(error => dispatch(dependencies.updateNodeFailure(error.message)));
  };
};
