module.exports = {
  title: 'QianXiao',
  description: '一枚小菜鸡的学习日记',
  head: [
    [
      'link', { rel: 'icon', href: '/assets/img/logo.jpg' }
    ]
  ],
  themeConfig: {
    logo: '/assets/img/logo.jpg',
    nav: [
      { text: '首页', link: '/', icon: '' },
      { text: '个人信息', link: '/personalInformation/my' },
      { text: '基础学习', link: '/demo/vue' },
      { text: '实例代码', link: '/code/property' },
      { text: '帮助', link: '/help/h1' },
      { text: '意见收集', link: '/opinionCollection' }
    ]
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