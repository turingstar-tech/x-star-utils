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
  const versionArr1 = version1.split('.').map(Number);
  const versionArr2 = version2.split('.').map(Number);
  const maxLength = Math.max(versionArr1.length, versionArr2.length);
  for (let i = 0; i < maxLength; i++) {
    const num1 = versionArr1[i] || 0;
    const num2 = versionArr2[i] || 0;
    if (num1 !== num2) {
      return num1 > num2;
    }
  }
  return true;
};

interface BrowserVersion {
  browser: string;
  version: string;
}

interface BrowserRegExp {
  chrome: RegExp;
  crios: RegExp;
  firefox: RegExp;
  fxios: RegExp;
  safari: RegExp;
  opera: RegExp;
  edge: RegExp;
  ie: RegExp;
  wechat: RegExp;
}

const browserRegExp: BrowserRegExp = {
  chrome: /chrome\/([\d.]+)/i,
  crios: /crios\/([\d.]+)/i,
  firefox: /firefox\/([\d.]+)/i,
  fxios: /fxios\/([\d.]+)/i,
  safari: /version\/([\d.]+).*safari/i,
  opera: /opera\/([\d.]+)|opr\/([\d.]+)/i,
  edge: /edg\/([\d.]+)/i,
  ie: /msie ([\d.]+)|trident.*rv:([\d.]+)/i,
  wechat: /micromessenger\/([\d.]+)/i,
};

/**
 * 获取浏览器版本
 *
 * @param userAgent 用户代理字符串
 * @returns 浏览器版本
 */
const getBrowserVersion = (userAgent: string) => {
  let browserVersion: BrowserVersion = { browser: '', version: '' };
  Object.keys(browserRegExp).some((item) => {
    const userMatch = userAgent.match(
      browserRegExp[item as keyof BrowserRegExp],
    );
    if (userMatch) {
      browserVersion = { browser: item, version: userMatch[1] || userMatch[2] };
      return true;
    }
    return false;
  });
  return browserVersion;
};

export interface BrowserCompatibility {
  chrome?: string;
  crios?: string;
  firefox?: string;
  fxios?: string;
  safari?: string;
  opera?: string;
  edge?: string;
  ie?: string;
  wechat?: string;
}

const defaultBrowserCompatibility: BrowserCompatibility = {
  chrome: '88.0',
  crios: '88.0',
  firefox: '85.0',
  fxios: '32.1',
  safari: '14.1',
  opera: '74.0',
  edge: '88.0',
  wechat: '6.8',
};

/**
 * 判断浏览器是否兼容
 *
 * @param browserCompatibility 浏览器最低版本号
 * @returns 当前浏览器是否兼容
 */
const isBrowserCompatible = (
  browserCompatibility = defaultBrowserCompatibility,
) => {
  const { browser, version } = getBrowserVersion(navigator.userAgent);
  const minBrowserVersion = {
    ...defaultBrowserCompatibility,
    ...browserCompatibility,
  };
  if (!minBrowserVersion[browser as keyof BrowserCompatibility]) {
    return false;
  }
  return compareVersion(
    version,
    minBrowserVersion[browser as keyof BrowserCompatibility]!,
  );
};

export default isBrowserCompatible;
