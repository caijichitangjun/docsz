module.exports = {
  title: 'QianXiao',
  description: '一枚小菜鸡的学习日记',
  head: [
    [
      'link', { rel: 'icon', href: '/assets/img/logo.ico' }
    ]
  ],
  theme: 'reco',
  themeConfig: {
    logo: '/assets/img/mydaughter.jpg',
    nav: [
      { text: '首页', link: '/', icon: 'reco-home' },
      { text: '个人信息', link: '/personalInformation/my' },
      { text: '实例代码', link: '/code/property', icon: 'reco-github' },
      { text: '帮助', link: '/help/h1', icon: 'reco-faq' },
      { text: '意见收集', link: '/opinionCollection', icon: 'reco-message' }
    ],
    blogConfig: {
      category: {
        location: 2,     // 在导航栏菜单中所占的位置，默认2
        text: '基础学习' // 默认文案 “分类”
      },
      tag: {
        location: 3,     // 在导航栏菜单中所占的位置，默认3
        text: '标签',      // 默认文案 “标签”
      },
    }
  },
  plugins: {
    //以下为插件，需要add安装/添加
    '@vuepress/active-header-links': {            // 自动高亮显示正在阅读的菜单栏插件
      sidebarLinkSelector: '.sidebar-link',
      headerAnchorSelector: '.header-anchor'
    },
    '@vuepress/back-to-top': true,               //返回顶部小图标
  }
}