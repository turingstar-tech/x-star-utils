import { describe, expect, test } from '@jest/globals';
import isBrowserCompatibility from '../src/is-browser-compatible';

describe('is-browser-compatibility', () => {
  test('success test', () => {
    // 模拟不同浏览器和版本的情况
    const mockUserAgent = (ua: string) => {
      Object.defineProperty(window.navigator, 'userAgent', {
        value: ua,
        writable: true,
      });
    };

    // 测试兼容的情况
    // 火狐 Firefox 浏览器版本 90.0
    // 谷歌 Chrome 浏览器版本 94.0.4606.81
    // Safari 浏览器版本 14.1
    // WeChat iPhone 浏览器
    mockUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; rv:90.0) Gecko/20100101 Firefox/90.0',
    );
    expect(isBrowserCompatibility()).toBe(true);

    mockUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36',
    );
    expect(isBrowserCompatibility()).toBe(true);

    mockUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Version/14.1 Safari/537.36',
    );
    expect(isBrowserCompatibility()).toBe(true);

    mockUserAgent(
      'mozilla/5.0 (iphone; cpu iphone os 17_1_2 like mac os x) applewebkit/605.1.15 (khtml, like gecko) mobile/15e148 micromessenger/8.0.44(0x18002c2b) nettype/wifi language/zh_cn',
    );
    expect(isBrowserCompatibility()).toBe(true);

    mockUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88 Safari/537.36',
    );
    expect(isBrowserCompatibility()).toBe(true);

    // 测试不兼容的情况
    // 兼容性较低的 Internet Explorer (IE) 浏览器
    // 兼容性较低的 Firefox 浏览器版本 60.0
    // 兼容性较低的 Chrome 浏览器版本 50.0.2661.102
    // 兼容性较低的 Opera 浏览器版本 80.0.4170.72
    // 兼容性较低的 Safari 浏览器版本 14.0.3
    mockUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Trident/7.0; rv:11.0 like Gecko',
    );
    expect(isBrowserCompatibility()).toBe(false);

    mockUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0',
    );
    expect(isBrowserCompatibility()).toBe(false);

    mockUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
    );
    expect(isBrowserCompatibility()).toBe(false);

    mockUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36 OPR/80.0.4170.72',
    );
    expect(isBrowserCompatibility()).toBe(false);

    mockUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15',
    );
    expect(isBrowserCompatibility()).toBe(false);

    mockUserAgent('');
    expect(isBrowserCompatibility()).toBe(false);
  });
});
