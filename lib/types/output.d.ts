export interface ActionType {
  dialog?: string;
  timestamp: number;
  duration?: number;
  actionType?: string;
  target?: string;
}

export interface TrackType {
  type: string;
  actions: ActionType[];
}

export interface TrackGroupType {
  target: string;
  tracks: TrackType[];
}

export interface OutputType {
  trackGroups: TrackGroupType[];
}
