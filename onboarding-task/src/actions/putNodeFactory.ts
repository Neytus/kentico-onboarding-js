import { IAction } from './IAction';
import { INodeContent } from '../models/NodeContent';

interface IUpdateNodeDependencies {
  updateNodeFetch: Fetch;
  updateNodeRequest: () => IAction;
  updateNodeSuccess: (node: INodeContent) => IAction;
  updateNodeFailure: (text: string) => IAction;
}

export const updateNodeFactory = (dependencies: IUpdateNodeDependencies) => (updateNode: INodeContent) => {
  return (dispatch: Dispatch): Promise<IAction> => {
    dispatch(dependencies.updateNodeRequest());
    return dependencies.updateNodeFetch(updateNode)
      .then(() => dispatch(dependencies.updateNodeSuccess(updateNode)))
      .catch(error => dispatch(dependencies.updateNodeFailure(error.message)));
  };
};
