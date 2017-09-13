import { INodesIds } from './nodesIdsReducer';
import { INodesInfo } from './nodesInfoReducer';
import { INodes } from './nodesReducer';
import { IErrorsMap } from './errorReducer';


export interface INodesList {
  nodes: INodes;
  nodesInfo: INodesInfo;
  nodesIds: INodesIds;
  isFetching: boolean;
  errors: IErrorsMap;
}
