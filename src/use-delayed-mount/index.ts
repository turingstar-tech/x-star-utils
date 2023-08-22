import { useEffect, useState } from 'react';

/**
 * 控制组件是否挂载、是否可见的 Hook
 *
 * 当组件从不显示切换到显示时，应该先挂载组件，再将组件从不可见变成可见，以实现淡入效果
 *
 * 当组件从显示切换到不显示时，应该先将组件从可见变成不可见，再卸载组件，以实现淡出效果
 *
 * @param show 组件显示状态
 * @param delay 组件卸载延迟，一般与淡出效果时间相同
 * @returns 组件是否挂载、是否可见
 */
const useDelayedMount = (show: boolean, delay: number): [boolean, boolean] => {
  const [mount, setMount] = useState(show);
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    let timer: number;
    if (show) {
      setMount(true);
      // 短暂延迟后将组件从不可见变成可见，防止 React 优化成同时挂载和可见，丢失淡入效果
      timer = window.setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
      // 一定延迟后卸载组件，延迟时间一般与淡出效果时间相同
      timer = window.setTimeout(() => setMount(false), delay);
    }
    return () => window.clearTimeout(timer);
  }, [show, delay]);

  return [mount, visible];
};

export default useDelayedMount;
