import { IAction } from './IAction';

interface IDeleteNodeDependencies {
  deleteNodeRequest: () => IAction;
  deleteNodeSuccess: (id: IdType) => IAction;
  deleteNodeFailure: (text: string) => IAction;
  deleteNodeFetch: any;
}

export const deleteNodeFactory = (dependencies: IDeleteNodeDependencies) => (id: IdType) => {
  return (dispatch: Dispatch): Promise<IAction> => {
    dispatch(dependencies.deleteNodeRequest());
    return dependencies.deleteNodeFetch(id)
      .then(() => dispatch(dependencies.deleteNodeSuccess(id)))
      .catch((error: any) => dispatch(dependencies.deleteNodeFailure(error.message)));
  };
};
