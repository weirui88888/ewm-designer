import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/m1',
    component: Layout,
    name: 'm1',
    meta: {
      title: '多级菜单一',
      icon: 'dashboard',
      orderNo: 10,
    },
    children: [
      {
        path: 'm2_1',
        name: 'm2_1',
        meta: { title: '多级菜单二-1' },
        component: () => import('@/layouts/blank.vue'),
        children: [
          {
            path: 'm3_2',
            name: 'm3_2',
            component: () => import('@/layouts/components/FrameBlank.vue'),
            meta: { title: '多级菜单三-1', frameSrc: 'https://www.163.com' },
          },
        ],
      },
      {
        path: 'm2_2',
        name: 'm2_2',
        component: () => import('@/layouts/components/FrameBlank.vue'),
        meta: { title: '多级菜单二-2', frameSrc: 'https://www.163.com' },
      },
    ],
  },
];
