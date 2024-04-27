export interface SysInterface {
  ie?: string;
  firefox?: string;
  fxios?: string;
  chrome?: string;
  crios?: string;
  opera?: string;
  safari?: string;
  wechat?: string;
}

interface SysRegExp {
  ie: RegExp;
  firefox: RegExp;
  fxios: RegExp;
  chrome: RegExp;
  crios: RegExp;
  opera: RegExp;
  safari: RegExp;
  wechat: RegExp;
}

interface SysVersion {
  browser: string;
  version: string;
}

/**
 * 判断版本号 1 是否不小于版本号 2
 *
 * `compareVersion('1.2.4', '1.1.5')` 返回 `true`
 *
 * `compareVersion('1.2', '1.10.5')` 返回 `false`
 *
 * `compareVersion('1.00.03', '1.0.03')` 返回 `true`
 *
 * @param version1 版本号 1
 * @param version2 版本号 2
 * @returns 判断结果
 */
const compareVersion = (version1: string, version2: string) => {
  const versionArr1 = version1.split('.').map((v) => parseInt(v));
  const versionArr2 = version2.split('.').map((v) => parseInt(v));
  const minLength = Math.min(versionArr1.length, versionArr2.length);

  for (let i = 0; i < minLength; i++) {
    const v1 = versionArr1[i];
    const v2 = versionArr2[i];
    if (v1 !== v2) {
      return v1 >= v2;
    }
  }

  return versionArr1.length >= versionArr2.length;
};

/**
 * 获取浏览器版本
 *
 * @param userAgent 用户代理字符串
 * @returns 浏览器版本
 */
const judgeSystem = (userAgent: string): SysVersion => {
  const systemMatch: SysRegExp = {
    ie: /msie ([d.]+)/,
    firefox: /firefox\/([\d.]+)/,
    fxios: /fxios\/([\d.]+)/,
    chrome: /chrome\/([\d.]+)/,
    crios: /crios\/([\d.]+)/,
    opera: /opera.([\d.]+)/,
    safari: /version\/([\d.]+).*safari/,
    wechat: /micromessenger\/([\d.]+)/,
  };
  let browser = '';
  let version = '';
  Object.keys(systemMatch).every((item) => {
    const userMatch = userAgent.match(systemMatch[item as keyof SysRegExp]);
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
 * 判断浏览器是否兼容
 *
 * @param minBrowserVersions 最低版本号
 * @returns 是否兼容
 */
const isBrowserCompatibility = (
  minBrowserVersions: SysInterface = {
    ie: '9999.0',
    firefox: '80.0',
    chrome: '88.0',
    fxios: '80.0',
    crios: '88.0',
    opera: '80.0',
    safari: '14.1',
    wechat: '8.0',
  },
) => {
  const system = judgeSystem(navigator.userAgent.toLowerCase());
  const browserVersions = {
    ie: '9999.0',
    firefox: '80.0',
    fxios: '80.0',
    chrome: '88.0',
    crios: '88.0',
    opera: '80.0',
    safari: '14.1',
    wechat: '8.0',
    ...minBrowserVersions,
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
