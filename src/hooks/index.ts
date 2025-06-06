import * as echarts from 'echarts/core';
import { onMounted, onUnmounted, Ref, ref, ShallowRef, shallowRef } from 'vue';

import { useUserStore } from '@/store';

/**
 * eChart hook
 * @param domId
 */
export const useChart = (domId: string): ShallowRef<echarts.ECharts> => {
  let chartContainer: HTMLCanvasElement;
  const selfChart = shallowRef<echarts.ECharts | any>();
  const updateContainer = () => {
    selfChart.value.resize({
      width: chartContainer.clientWidth,
      height: chartContainer.clientHeight,
    });
  };

  onMounted(() => {
    if (!chartContainer) {
      chartContainer = document.getElementById(domId) as HTMLCanvasElement;
    }
    selfChart.value = echarts.init(chartContainer);
  });

  window.addEventListener('resize', updateContainer, false);

  onUnmounted(() => {
    window.removeEventListener('resize', updateContainer);
  });

  return selfChart;
};

/**
 * counter utils
 * @param duration
 * @returns
 */
export const useCounter = (duration = 60): [Ref<number>, () => void] => {
  let intervalTimer: ReturnType<typeof setInterval>;
  onUnmounted(() => {
    clearInterval(intervalTimer);
  });
  const countDown = ref(0);

  return [
    countDown,
    () => {
      countDown.value = duration;
      intervalTimer = setInterval(() => {
        if (countDown.value > 0) {
          countDown.value -= 1;
        } else {
          clearInterval(intervalTimer);
          countDown.value = 0;
        }
      }, 1000);
    },
  ];
};

export const useLogTrack = (event: string, payload: Record<string, any> = {}): void => {
  const userStore = useUserStore();
  const { userInfo } = userStore;
  payload = {
    ...payload,
    userInfo,
  };
  if (import.meta.env.MODE === 'site' || import.meta.env.MODE === 'mockSite') {
    return window.umami?.track(event, payload);
  }
  return console.log(`Event: ${event}`, payload);
};
