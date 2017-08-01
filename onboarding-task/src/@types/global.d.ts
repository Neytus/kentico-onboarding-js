declare global {
  type Dispatch = {
    (action: IAction): IAction;
  };

  type IdType = string;

  interface IAction {
    type: string;
    payload: any;
  }

  interface IKeyMap {
    cancelNode: KeyCommands;
    saveNode: KeyCommands;
  }

  type KeyCommands = 'esc' | 'enter';

  type KeyHandler = {[key in keyof IKeyMap]: Function};
}

export {};
