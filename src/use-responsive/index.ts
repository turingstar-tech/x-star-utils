import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

/**
 * xs 屏幕 < 576px
 * sm 屏幕 >= 576px
 * md 屏幕 >= 768px
 * lg 屏幕 >= 992px
 * xl 屏幕 >= 1200px
 * xxl 屏幕 >= 1600px
 * mb 屏幕 <= 575px
 * iPad 576px <= 屏幕 <= 991px
 * pc 屏幕 >= 992px
 * @returns boolean
 */
const useResponsive = (defaultValue?: string) => {
  const gridMap = new Map([
    ['xs', '(max-width: 575px)'],
    ['sm', '(min-width: 576px)'],
    ['md', '(min-width: 768px)'],
    ['lg', '(min-width: 992px)'],
    ['xl', '(min-width: 1200px)'],
    ['xxl', '(min-width: 1600px)'],
    ['mb', '(max-width: 575px)'],
    ['iPad', '(min-width: 576px) and (max-width: 991px)'],
    ['pc', '(min-width: 992px)'],
  ]);

  const getBreakpoints = () => {
    const screens: { [key: string]: boolean } = {};

    gridMap.forEach((value, key) => {
      const mql = window.matchMedia(value);
      screens[key] = mql.matches;
    });
    const breakpoints = Object.entries(screens)
      ?.filter((screen) => !!screen[1])
      ?.map((screen) => screen[0]);

    return breakpoints?.includes(defaultValue || 'xs');
  };

  const [isDefaultBreakpoint, setIsDefaultBreakpoint] = useState(
    getBreakpoints(),
  );

  useEffect(() => {
    const handleResize = debounce(() => {
      setIsDefaultBreakpoint(getBreakpoints());
    }, 300);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isDefaultBreakpoint;
};

export default useResponsive;
