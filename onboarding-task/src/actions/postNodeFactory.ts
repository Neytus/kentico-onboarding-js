import { IAction } from './IAction';
interface IPostNodeDependencies {
  route: string;
  postRequest: any;
  postSuccess: any;
  postFailure: any;
}

export const postNodeFactory = (text: string, dependencies: IPostNodeDependencies): ((dispatch: Dispatch) => Promise<IAction>) => {
  return (dispatch: Dispatch): Promise<IAction> => {
    dispatch(dependencies.postRequest());
    return fetch(dependencies.route, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({text}),
    })
      .then(response => response.json())
      .then(json => dispatch(dependencies.postSuccess({id: json.id, text: json.text})))
      .catch(error => {
        return dispatch(dependencies.postFailure(error.message));
      });
  };
};
