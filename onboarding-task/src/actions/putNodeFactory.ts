import { IAction } from './IAction';
import { INodeContent } from '../models/NodeContent';

interface IPutNodeDependencies {
  putNodeFetch: Fetch;
  putNodeRequest: () => IAction;
  putNodeSuccess: (node: INodeContent) => IAction;
  putNodeFailure: (text: string) => IAction;
}

export const putNodeFactory = (dependencies: IPutNodeDependencies) => (updateNode: INodeContent) => {
  return (dispatch: Dispatch): Promise<IAction> => {
    dispatch(dependencies.putNodeRequest());
    return dependencies.putNodeFetch(updateNode)
      .then(() => dispatch(dependencies.putNodeSuccess(updateNode)))
      .catch(error => dispatch(dependencies.putNodeFailure(error.message)));
  };
};
