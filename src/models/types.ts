export type PostsType = {
  pid: string;
  title: string;
  creater_name: string;
  create_time: Object;
  checked: boolean;
};

export type CommetsType = {
  text: string;
  creater_name: string;
  create_time: Object;
};

export type TitleSizeType = {
  'text-2xl sm:text-6xl': boolean;
  'text-2xl sm:text-5xl': boolean;
  'text-2xl sm:text-4xl': boolean;
  'text-xl sm:text-3xl': boolean;
  'text-lg sm:text-2xl': boolean;
  'text-md sm:text-xl': boolean;
};
