declare global {
  type Dispatch = {
    (action: IAction): IAction;
  };

  interface IAction {
    type: string;
    payload: any;
  }
}

export {};
