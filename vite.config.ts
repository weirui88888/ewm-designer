import path from 'node:path';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { visualizer } from 'rollup-plugin-visualizer';
import { ConfigEnv, loadEnv, UserConfig } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
import svgLoader from 'vite-svg-loader';

const CWD = process.cwd();

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const viteEnvConfig = loadEnv(mode, CWD);
  console.log('👀 ~ viteEnvConfig:', mode, viteEnvConfig);
  const { VITE_BASE_URL, VITE_API_URL_PREFIX, VITE_IS_USE_MOCK } = viteEnvConfig;

  const useMock = VITE_IS_USE_MOCK === 'true';

  return {
    base: VITE_BASE_URL,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${path.resolve('src/style/variables.less')}";`,
          },
          math: 'strict',
          javascriptEnabled: true,
        },
      },
    },

    plugins: [
      vue(),
      vueJsx(),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: useMock,
        prodEnabled: useMock,
        injectCode: `
          import { setupProdMockServer } from '../mock/mockProdServer';

          setupProdMockServer();
      `,
      }),
      visualizer({
        template: 'treemap',
        gzipSize: true,
      }),
      svgLoader(),
    ],

    server: {
      port: 3002,
      host: '0.0.0.0',
      proxy: {
        [VITE_API_URL_PREFIX]: 'http://127.0.0.1:3000/',
      },
    },
  };
};
