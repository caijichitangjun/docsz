const moment = require('moment');
moment.locale("zh-cn")

module.exports = {
  base:'/docsz/',
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
    lastUpdated: '更新时间',
    author: 'qianxiao',
    type: 'test',
    nav: [
      { text: '首页', link: '/', icon: 'reco-home' },
      { text: '个人信息', link: '/help/aboutMy' },
      { text: '实例代码', link: '/code/property', icon: 'reco-github' },
      { text: '时间线', link: '/timeline/', icon: 'reco-date' },
      { text: '帮助', link: '/help/h1', icon: 'reco-faq' },
      { text: '意见收集', link: '/help/question', icon: 'reco-message' }
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
    },
    vssueConfig: {
      // set `platform` rather than `api`
      platform: 'github',
      // all other options of Vssue are allowed
      owner: 'caijichitangjun',
      repo: 'docsz',
      clientId: '7c86509a162e192038cc',
      clientSecret: '4f01d68d9b096b35a88fe5a7cf201ec2054d672f',
      autoCreateIssue: true,
    },
  },
  plugins: {
    //以下为插件，需要add安装/添加
    '@vuepress/active-header-links': {            // 自动高亮显示正在阅读的菜单栏插件
      sidebarLinkSelector: '.sidebar-link',
      headerAnchorSelector: '.header-anchor'
    },
    '@vuepress/back-to-top': true,               // 返回顶部小图标
    'vuepress-plugin-code-copy': true,           // 代码复制功能
    '@vuepress-reco/vuepress-plugin-bgm-player': {  // 首页歌曲
      audios: [
        {
          name: '雪月',
          artist: '王玲琳',
          url: '/docsz/assets/mp4/xueyue.mp3',
          cover: '/docsz/assets/img/xueyue.jpg'
        },
        {
          name: '世间美好与你环环相扣',
          artist: '冯提莫',
          url: '/docsz/assets/mp4/meihao.mp3',
          cover: '/docsz/assets/img/meihao.jpg'
        },
        {
          name: '逍遥戏',
          artist: '酒禾',
          url: '/docsz/assets/mp4/xiaoyao.mp3',
          cover: '/docsz/assets/img/xiaoyao.jpg'
        },
      ] ,
      autoShrink: true ,    // 是否默认缩小
      shrinkMode: 'float',  // 缩小时缩为哪种模式
      floatStyle:{ bottom: '10px', 'z-index': '999999' }      // 悬浮窗样式
    },
    '@vuepress-reco/vuepress-plugin-kan-ban-niang': {  // 看板娘
      theme: ['shizuku', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'wanko', 'z16'],
      // theme:['blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'wanko', 'miku', 'z16'],
      messages: {
        welcome: '欢迎来到浅笑的个人博客',
        home: '心里的花，我想要带你回家。',
        theme: '好吧，希望你能喜欢我的其他小伙伴。',
        close: '你知道我喜欢吃什么吗？痴痴地望着你。'
      },
      width:200,
      height:282,
    },
    'cursor-effects': {
      size: 2, // size of the particle, default: 2
      shape: 'star', // ['star' | 'circle'], // shape of the particle, default: 'star'
      zIndex: 10000, // z-index property of the canvas, default: 999999999
    },
    '@vuepress/last-updated': {
      transformer: (timestamp) => {
        return moment(timestamp).format('LLLL')
      }
    },
    // '@vssue/vuepress-plugin-vssue': {
    //   // set `platform` rather than `api`
    //   platform: 'github',
    //   // all other options of Vssue are allowed
    //   owner: 'caijichitangjun',
    //   repo: 'docsz',
    //   clientId: '7c86509a162e192038cc',
    //   clientSecret: '4f01d68d9b096b35a88fe5a7cf201ec2054d672f',
    //   autoCreateIssue: true,
    // },
  },
}

