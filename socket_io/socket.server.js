const ws = require('nodejs-websocket')
console.log('开始建立连接')
ws.createServer((conn) => {
  conn.on('text', (str) => {
    console.log('收到的信息为', str)
    conn.send(`机器人：您输入了${str}`)
  })
  conn.on('close', (code, reason) => {
    console.log('关闭连接')
  })
  conn.on('error', (code, reason) => {
    console.log('异常关闭')
  })
}).listen(8001)
console.log('连接建立完毕')
