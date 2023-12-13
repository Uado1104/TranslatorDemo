export enum Color {
  Primary = '#556cd6',
  Secondary = '#19857b',
  Error = '#e57373',
  Warning = '#ffb74d',
  Info = '#64b5f6',
  Success = '#81c784',
}

export const SX_ROUND_IMAGE = {
  borderRadius: '50%',
  minWidth: 40,
  height: 40,
};

export const SX_ROUND_BUTTON = {
  ...SX_ROUND_IMAGE,
  padding: '10px',
};

export const DEFAULT_GRID_WIDTH = 500;
export const DEFAULT_EDIT_WIDTH = 250;
export const DEFAULT_SPACING = 4;

// 重复获取需求的间隔时间(毫秒)
export const POST_FETCH_INTERVAL = 1000 * 5;
