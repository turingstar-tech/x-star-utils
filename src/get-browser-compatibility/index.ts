export interface SysInterface {
  ie?: string;
  firefox?: string;
  chrome?: string;
  opera?: string;
  safari?: string;
}
/**
 * @param version1 版本号1
 * @param version2 版本号2
 * @returns 1 0 -1, 1为前面版本号更新，0为一样，-1为后面的新
 * compareVersion('1.2.4', '1.1.5') // 1
 * compareVersion('1.2', '1.10.5') // -1
 * compareVersion('1.00.03', '1.0.03') // 0
 */
const compareVersion = (
  version1: string | undefined,
  version2: string | undefined,
): 1 | 0 | -1 => {
  const arr1 = version1?.split('.') || [];
  const arr2 = version2?.split('.') || [];
  const length1 = arr1?.length || 0;
  const length2 = arr2?.length || 0;
  const minlength = Math.min(length1, length2);
  let i = 0;
  for (i; i < minlength; i++) {
    const a = parseInt(arr1[i]);
    const b = parseInt(arr2[i]);
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    }
  }
  if (length1 > length2) {
    for (let j = i; j < length1; j++) {
      if (parseInt(arr1[j]) !== 0) {
        return 1;
      }
    }
    return 0;
  } else if (length1 < length2) {
    for (let j = i; j < length2; j++) {
      if (parseInt(arr2[j]) !== 0) {
        return -1;
      }
    }
    return 0;
  }
  return 0;
};

/**
 *
 * @returns 浏览器类别对象数组
 */
const judgeSystem = (): SysInterface => {
  const ua = navigator?.userAgent?.toLowerCase();
  const systemMatch = {
    ie: /msie ([d.]+)/,
    firefox: /firefox\/([\d.]+)/,
    chrome: /chrome\/([\d.]+)/,
    opera: /opera.([\d.]+)/,
    safari: /version\/([\d.]+).*safari/,
  };
  const Sys: SysInterface = Object?.keys(systemMatch)?.reduce((pre, item) => {
    return {
      ...pre,
      [item]: ua.match(systemMatch[item as keyof SysInterface])?.[1],
    };
  }, {});
  return Sys;
};

/**
 *
 * @param minBrowserVersion
 * @returns 浏览器是否兼容
 */
const getBrowserCompatibility = (
  minBrowserVersion: SysInterface = {
    ie: '9999.0',
    firefox: '80.0',
    chrome: '88.0',
    opera: '80.0',
    safari: '14.1',
  },
): boolean => {
  const system = judgeSystem();
  const browsers = Object?.keys(minBrowserVersion);
  for (const item of browsers) {
    if (
      system[item as keyof SysInterface] &&
      compareVersion(
        system[item as keyof SysInterface],
        minBrowserVersion[item as keyof SysInterface],
      ) === 1
    ) {
      return true;
    }
  }
  return false;
};
export default getBrowserCompatibility;
