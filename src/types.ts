interface Episode {
  name: string;
}

export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: {
    name: string;
  };
  episode: Episode[];
  image: string;
}

export enum FLEX_TYPE {
  columnReverse = 'column-reverse',
  row = 'row',
}

export enum WRAP {
  wrap = 'wrap',
  nowrap = 'nowrap',
  wrapReverse = 'wrap-reverse',
}

export enum ALIGN_TYPE {
  center = 'center',
  flexStart = 'flex-start',
}

export enum VIEW_TYPE {
  list = 'list',
  grid = 'grid',
}

export enum FAV_ICON {
  heart = 'heart',
  heartOutline = 'heart-outline',
  logOut = 'log-out',
}

export enum POSITION_TYPE {
  absolute = 'absolute',
  relative = 'relative',
}

export enum SIZE {
  small = 'small',
  large = 'large',
}

export type ListItemProps = {
  viewType?: string;
  onPress?: () => void;
  addToFavorite?: () => void;
} & Character;

export type ITrackEventData = {
  [k: string]: string | number | boolean;
};
