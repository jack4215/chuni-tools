import { defineConfig } from 'vitepress'
import { usePosts } from '../src/composables/usePosts'
import type { ThemeConfig } from '../src/types'

const { posts, rewrites } = await usePosts({
  pageSize: 10,
  homepage: false,
  srcDir: 'stat',
  autoExcerpt: 0,
})

export default defineConfig<ThemeConfig>({
  cleanUrls: true,
  appearance: 'dark',
  ignoreDeadLinks: true,
  outDir: './build',
  rewrites,

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/icon2.png' }],
    ['meta', { name: 'author', content: 'Jack Lu' }],
    ['meta', { name: 'format-detection', content: 'telephone=no' }],
    ['meta', { property: 'og:description', content: 'CHUNITHM Event Platform' }],
    [
      'script',
      {
        async: true,
        src: `https://www.googletagmanager.com/gtag/js?id=G-J91Z4GBGQQ`,
      },
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', 'G-J91Z4GBGQQ');`,
    ],
  ],

  themeConfig: {
    search: { provider: 'local' }
  },

  locales: {
    root: {
      label: '繁體中文',
      lang: 'zh-TW',
      link: '/',
      title: 'CHUNITHM Event Platform',
      description: 'CHUNITHM Event Platform',
      themeConfig: {
        posts,
        page: {
          max: 5,
          pinned: '[Live]'
        },
        logo: '/icon2.png',
        outline: { level: 2 },
        nav: [
          {
            text: '平台說明',
            items: [
              { text: '賽事申請', link: '/info/apply' },
              { text: '成績上傳', link: '/info/usage' }
            ]
          },
          { text: '賽事列表', link: '/page-1' },
          { text: '書籤工具', link: 'https://chuni.tsaibee.org/?lang=zh_TW' }
        ],
        sidebar: {
          '/info': [
            {
              text: '平台說明',
              items: [
                { text: '賽事申請', link: '/info/apply' },
                { text: '成績上傳', link: '/info/usage' },
                { text: '賽事日期表', link: '/info/calendar' }
              ]
            }
          ]
        },
        footer: {
          message: 'Developed and maintained by TSAIBEE',
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'CHUNITHM Event Platform',
      description: 'CHUNITHM Event Platform (English)',
      themeConfig: {
        posts: [],
        logo: '/icon2.png',
        outline: { level: 2 },
        nav: [
          {
            text: 'Platform Info',
            items: [
              { text: 'Apply', link: '/en/info/apply' },
              { text: 'Usage', link: '/en/info/usage' }
            ]
          },
          { text: 'Event List', link: '/page-1' },
          { text: 'CHUNITHM Tools', link: 'https://chuni.tsaibee.org/?lang=en_US' }
        ],
        sidebar: {
          '/en/info': [
            {
              text: 'Platform Info',
              items: [
                { text: 'Apply', link: '/en/info/apply' },
                { text: 'Upload', link: '/en/info/usage' },
                { text: 'Calendar', link: '/en/info/calendar' }
              ]
            }
          ]
        },
        footer: {
          message: 'Developed and maintained by TSAIBEE',
        }
      }
    }
  },

  markdown: {
    lineNumbers: true
  },

  srcExclude: ['README.md', 'README_en-US.md']
})
