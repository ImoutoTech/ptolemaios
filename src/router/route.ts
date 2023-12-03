export interface RouteBaseInfo {
  path: string;
  name: string;
  key: string;
  component: string;
  label: string;
}

export interface RouteItem extends RouteBaseInfo {
  children?: RouteItem[];
}

// component字段在使用时会自动在前面加上 ../ 

const route = [
  {
    path: '/',
    name: 'landing',
    component: 'views/HomeView.vue',
    key: 'landing',
    label: '首页',
  },
];

export default route;