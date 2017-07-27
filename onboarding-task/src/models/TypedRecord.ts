import { Record } from 'immutable';
//
// interface INodeGeneric {
//  readonly isBeingEdited?: boolean;
//  readonly id?: string;
//  readonly text?: string;
// }
//
// export class NodeGeneric extends Record(defaultStuff) implements INodeGeneric {
//  readonly isBeingEdited?: boolean;
//  readonly id?: string;
//  readonly text?: string;
//
//  constructor(parameters?: any) {
//    super(parameters);
//  }
//
//  public with = <T>(values: T) => {
//    return this.merge(values) as this;
//  };
// }


export const TypedRecord = <T>(defaultStuff: T) => Record(defaultStuff);


// export class NodeGeneric<T> extends TypedRecord<T>(defaultStuff) {
//  constructor(parameters?: T) {
//    super(parameters);
//  }
// }

