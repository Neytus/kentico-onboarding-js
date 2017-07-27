import { Record } from 'immutable';

export const TypedRecord = <ClassType, ContentType>(defaultStuff: ContentType) => {
  return class extends Record(defaultStuff) {
    constructor(params?: Partial<ContentType>) {
      params ? super(params) : super();
    }

    with(values: Partial<ContentType>): ClassType {
      return this.merge(values) as any as ClassType;
    }
  };
};
