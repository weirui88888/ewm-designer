import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/list',
    name: 'list',
    component: Layout,
    redirect: '/list/base',
    meta: {
      title: {
        zh_CN: '列表页',
        en_US: 'List',
      },
      icon: 'view-list',
    },
    children: [
      {
        path: 'base',
        name: 'ListBase',
        component: () => import('@/pages/list/base/index.vue'),
        meta: {
          title: {
            zh_CN: '基础列表页',
            en_US: 'Base List',
          },
        },
      },
      {
        path: 'card',
        name: 'ListCard',
        component: () => import('@/pages/list/card/index.vue'),
        meta: {
          title: {
            zh_CN: '卡片列表页',
            en_US: 'Card List',
          },
        },
      },
      {
        path: 'filter',
        name: 'ListFilter',
        component: () => import('@/pages/list/filter/index.vue'),
        meta: {
          title: {
            zh_CN: '筛选列表页',
            en_US: 'Filter List',
          },
        },
      },
      {
        path: 'tree',
        name: 'ListTree',
        component: () => import('@/pages/list/tree/index.vue'),
        meta: {
          title: {
            zh_CN: '树状筛选列表页',
            en_US: 'Tree List',
          },
        },
      },
    ],
  },
];
