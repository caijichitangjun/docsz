// 获取当前目录绝对路径，一般用于拼接路径
const { resolve } = require('path')

module.exports = {
  entry: './src/index.js',
  output:{
    filename: 'built.js',
    // __dirname代表当前文件的目录绝对路径
    path: resolve(__dirname, 'built')   
  },
  module:{
    rules:[

    ]
  },
  plugins:[

  ],
  mode: 'development'
}