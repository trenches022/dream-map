import { IDream } from '../store/dreamStore';

export interface DreamNode {
  id: string;
  type: 'dreamNode' | 'tagNode' | 'feelingNode';
  data: {
    label: string;
    dream?: IDream;
    tag?: string;
    feeling?: string;
  };
  position: {
    x: number;
    y: number;
  };
}

export interface DreamEdge {
  id: string;
  source: string;
  target: string;
  type?: 'default' | 'step' | 'smoothstep';
  animated?: boolean;
}

export interface GraphData {
  nodes: DreamNode[];
  edges: DreamEdge[];
}