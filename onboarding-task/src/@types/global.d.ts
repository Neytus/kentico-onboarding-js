declare global {
  type Dispatch = {
    (action: IAction): IAction;
  };

  type IdType = string;

  interface IAction {
    type: string;
    payload: any;
  }
}

export {};
