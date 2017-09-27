import { IAction } from './IAction';
import { INodeContent } from '../models/NodeContent';

interface IPostNodeDependencies {
  fetch: any;
  postRequest: () => IAction;
  postSuccess: (node: INodeContent) => IAction;
  postFailure: (text: string) => IAction;
}

export const postNodeFactory = (dependencies: IPostNodeDependencies) => (text: string) => {
  return (dispatch: Dispatch): Promise<IAction> => {
    dispatch(dependencies.postRequest());
    return dependencies.fetch({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({text}),
    })
      .then((response: any) => response.json())
      .then((json: any) => dispatch(dependencies.postSuccess({id: json.id, text: json.text})))
      .catch((error: any) => dispatch(dependencies.postFailure(error.message)));
  };
};
