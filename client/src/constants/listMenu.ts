
export type MenuType = {
  id: number;
  label: string;
  to: string;
  icon?: string;
  iconActive?: string;
  sub: boolean;
  listSub?: SubMenuType[];
  name: string;
};

export type SubMenuType = {
  id: number;
  subLabel: string;
  subTo: string;
  role: number;
};

export const LIST_MENU_USER: MenuType[] = [
  {
    id: 1,
    label: 'User',
    to: '/user',
    sub: false,
    // icon: IMAGES.dashboardOff,
    // iconActive: IMAGES.dashboardOn,
    name: 'user',
  },
];

export const LIST_HEADER_MENU: MenuType[] = [
  { id: 1, label: 'system', to: '/system', sub: false, name: 'system-management' },
  { id: 3, label: 'help', to: '/support', sub: false, name: 'support-management' },
];
