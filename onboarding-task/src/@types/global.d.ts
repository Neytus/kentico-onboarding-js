import { IAction } from '../actions/IAction';

declare global {
  type Dispatch = {
    (action: IAction): IAction;
  };

  type IdType = string;

  interface IKeyMap {
    cancelNode: KeyCommands;
    saveNode: KeyCommands;
  }

  type KeyCommands = 'esc' | 'enter';

  type KeyHandler = Partial<{[key in keyof IKeyMap]: Function}>;
}

export {};
