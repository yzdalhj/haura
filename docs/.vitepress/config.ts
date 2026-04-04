import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Haura UI',
  description: '克制而精致的 Vue 3 组件库',
  
  // GitHub Pages 部署时取消注释下一行
  // base: '/haura/',
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#0ea5e9' }],
  ],
  
  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: '指南', link: '/guide/introduction', activeMatch: '/guide/' },
      { text: '组件', link: '/components/button', activeMatch: '/components/' },
      { text: 'API', link: '/api/', activeMatch: '/api/' },
      {
        text: '相关链接',
        items: [
          { text: 'GitHub', link: 'https://github.com/yzdalhj/haura' },
          { text: '更新日志', link: '/guide/changelog' },
        ]
      }
    ],
    
    sidebar: {
      '/guide/': [
        {
          text: '开始',
          items: [
            { text: '介绍', link: '/guide/introduction' },
            { text: '快速上手', link: '/guide/quick-start' },
            { text: '安装', link: '/guide/installation' },
          ]
        },
        {
          text: '基础',
          items: [
            { text: '主题', link: '/guide/theme' },
            { text: '动效', link: '/guide/motion' },
            { text: '国际化', link: '/guide/i18n' },
          ]
        },
        {
          text: '进阶',
          items: [
            { text: '表单', link: '/guide/form' },
            { text: '表格', link: '/guide/table' },
            { text: '自定义主题', link: '/guide/custom-theme' },
          ]
        }
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Icon 图标', link: '/components/icon' },
          ]
        },
        {
          text: '表单组件',
          items: [
            { text: 'Input 输入框', link: '/components/input' },
            { text: 'Select 选择器', link: '/components/select' },
            { text: 'Checkbox 多选框', link: '/components/checkbox' },
            { text: 'Radio 单选框', link: '/components/radio' },
            { text: 'Switch 开关', link: '/components/switch' },
          ]
        },
        {
          text: '布局组件',
          items: [
            { text: 'Row/Col 栅格', link: '/components/grid' },
            { text: 'Space 间距', link: '/components/space' },
            { text: 'Tabs 标签页', link: '/components/tabs' },
          ]
        },
        {
          text: '数据展示',
          items: [
            { text: 'Card 卡片', link: '/components/card' },
            { text: 'Tag 标签', link: '/components/tag' },
            { text: 'Table 表格', link: '/components/table' },
          ]
        },
        {
          text: '反馈组件',
          items: [
            { text: 'Message 消息', link: '/components/message' },
            { text: 'Dialog 对话框', link: '/components/dialog' },
            { text: 'Drawer 抽屉', link: '/components/drawer' },
            { text: 'Loading 加载', link: '/components/loading' },
          ]
        },
        {
          text: '复合组件',
          items: [
            { text: 'Form 表单', link: '/components/form' },
          ]
        }
      ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yzdalhj/haura' }
    ],
    
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Haura UI'
    },
    
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换'
            }
          }
        }
      }
    },
    
    outline: {
      label: '页面导航',
      level: [2, 3]
    },
    
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    },
    
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
  
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true
  },
  
  vite: {
    ssr: {
      noExternal: ['@haura/components', '@haura/theme']
    }
  }
})