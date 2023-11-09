export interface SysInterface {
  ie?: string;
  firefox?: string;
  fxios?: string;
  chrome?: string;
  crios?: string;
  opera?: string;
  safari?: string;
}

export interface ISystemReg {
  ie: RegExp;
  firefox: RegExp;
  fxios: RegExp;
  chrome: RegExp;
  crios: RegExp;
  opera: RegExp;
  safari: RegExp;
}

interface ISystem {
  browser: string;
  version: string;
}

/**
 * @param version1 版本号1
 * @param version2 版本号2
 * @returns 返回v1是否大于v2
 * compareVersion('1.2.4', '1.1.5') // true
 * compareVersion('1.2', '1.10.5') // false
 * compareVersion('1.00.03', '1.0.03') // true
 */
const compareVersion = (version1: string, version2: string): boolean => {
  const versionArr1 = version1?.split('.').map((v) => Number(v));
  const versionArr2 = version2?.split('.').map((v) => Number(v));
  const ArrTemp =
    versionArr1.length > versionArr2.length ? versionArr1 : versionArr2;

  let result = true;
  ArrTemp.every((item, index) => {
    const v1 = versionArr1[index] || 0;
    const v2 = versionArr2[index];
    if (v1 !== v2) {
      result = v1 >= v2;
    }
    return v1 === v2;
  });
  return result;
};

/**
 *
 * @returns 浏览器类别对象数组
 */
const judgeSystem = (ua: string): ISystem => {
  const systemMatch: ISystemReg = {
    ie: /msie ([d.]+)/,
    firefox: /firefox\/([\d.]+)/,
    fxios: /fxios\/([\d.]+)/,
    chrome: /chrome\/([\d.]+)/,
    crios: /crios\/([\d.]+)/,
    opera: /opera.([\d.]+)/,
    safari: /version\/([\d.]+).*safari/,
  };
  let browser = '';
  let version = '';
  Object.keys(systemMatch).every((item) => {
    const userMatch = ua.match(systemMatch[item as keyof ISystemReg]);
    if (userMatch) {
      browser = item;
      version = userMatch[1];
    }
    return !userMatch;
  });

  return {
    browser,
    version,
  };
};

/**
 *
 * @param minBrowserVersion
 * @returns 浏览器是否兼容
 */
const isBrowserCompatibility = (
  minBrowserVersion: SysInterface = {
    ie: '9999.0',
    firefox: '80.0',
    chrome: '88.0',
    fxios: '80.0',
    crios: '88.0',
    opera: '80.0',
    safari: '14.1',
  },
): boolean => {
  const system = judgeSystem(navigator?.userAgent?.toLowerCase());
  const browserVersions = {
    ie: '9999.0',
    firefox: '80.0',
    fxios: '80.0',
    chrome: '88.0',
    crios: '88.0',
    opera: '80.0',
    safari: '14.1',
    ...minBrowserVersion,
  };
  return (
    !!browserVersions[system.browser as keyof SysInterface] &&
    compareVersion(
      system.version,
      browserVersions[system.browser as keyof SysInterface]!,
    )
  );
};
export default isBrowserCompatibility;
