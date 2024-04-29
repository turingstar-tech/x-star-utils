import { useEffect, useState } from 'react';

const queryMap = {
  xs: '(max-width: 575.98px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)',
  phone: '(max-width: 575.98px)',
  tablet: '(min-width: 576px) and (max-width: 991.98px)',
  desktop: '(min-width: 992px)',
};

/**
 * 判断媒体查询是否匹配
 *
 * 可以使用某些字符串匹配屏幕宽度
 *
 * | 字符串  |       屏幕限制        |
 * | :-----: | :-------------------: |
 * |   xs    |     宽度 < 576px      |
 * |   sm    |     宽度 >= 576px     |
 * |   md    |     宽度 >= 768px     |
 * |   lg    |     宽度 >= 992px     |
 * |   xl    |    宽度 >= 1200px     |
 * |   xxl   |    宽度 >= 1600px     |
 * |  phone  |     宽度 < 576px      |
 * | tablet  | 576px <= 宽度 < 992px |
 * | desktop |     宽度 >= 992px     |
 *
 * @param query 查询字符串
 * @returns 是否匹配
 */
const useResponsive = <T extends string>(query: T | keyof typeof queryMap) => {
  const getMatches = () =>
    window.matchMedia((queryMap as any)[query] ?? query).matches;

  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    const handler = () => requestAnimationFrame(() => setMatches(getMatches));

    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return matches;
};

export default useResponsive;
