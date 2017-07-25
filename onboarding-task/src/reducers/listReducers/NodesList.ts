import {
  OrderedMap,
  List
} from 'immutable';

import { NodeContent } from '../../models/NodeContent';
import { NodeInfo } from '../../models/NodeInfo';

export interface INodesList {
  nodes: OrderedMap<string, NodeContent>;
  nodesInfo: OrderedMap<string, NodeInfo>;
  nodesIds: List<string>;
}
