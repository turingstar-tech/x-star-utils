import { useEffect, useState } from 'react';

/**
 * 判断页面是否处于活动状态
 *
 * 用 `document.visibilityState` 和 `visibilitychange` 事件判断页面是否可见
 *
 * 用 `document.hasFocus()`、`focus` 和 `blur` 事件判断页面是否有焦点
 *
 * 如果页面可见且有焦点，则页面处于活动状态
 *
 * @returns 是否处于活动状态
 */
const useDocumentActive = () => {
  const [visible, setVisible] = useState(
    () => document.visibilityState === 'visible',
  );
  const [focused, setFocused] = useState(() => document.hasFocus());

  useEffect(() => {
    const handleVisibilityChange = () =>
      setVisible(document.visibilityState === 'visible');

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const handleFocus = () => setFocused(true);
    const handleBlur = () => setFocused(false);

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  return visible && focused;
};

export default useDocumentActive;
