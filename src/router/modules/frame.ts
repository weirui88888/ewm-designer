import Frame from '@/layouts/components/FrameBlank.vue';
import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/frame',
    name: 'Frame',
    component: Layout,
    redirect: '/frame/doc',
    meta: {
      icon: 'internet',
      title: {
        zh_CN: '外部页面',
        en_US: 'External',
      },
    },
    children: [
      {
        path: 'doc',
        name: 'Doc',
        component: Frame,
        meta: {
          frameSrc: 'https://tdesign.tencent.com/starter/docs/vue-next/get-started',
          title: {
            zh_CN: '使用文档（内嵌）',
            en_US: 'Documentation(IFrame)',
          },
        },
      },
      {
        path: 'TDesign',
        name: 'TDesign',
        component: Frame,
        meta: {
          frameSrc: 'https://tdesign.tencent.com/vue-next/getting-started',
          title: {
            zh_CN: 'TDesign 文档（内嵌）',
            en_US: 'TDesign (IFrame)',
          },
        },
      },
      {
        path: 'TDesign2',
        name: 'TDesign2',
        component: Frame,
        meta: {
          frameSrc: 'https://tdesign.tencent.com/vue-next/getting-started',
          frameBlank: true,
          title: {
            zh_CN: 'TDesign 文档（外链',
            en_US: 'TDesign Doc(Link)',
          },
        },
      },
    ],
  },
];
