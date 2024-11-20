module.exports.index = async (req, res) => {
  //_io là biến toàn cục đã khai báo ở phải index tổng
  _io.on('connection', (socket) => {
    console.log('Có 1 user kết nối', socket.id);
  })

  res.render("client/pages/chat/index", {
    pageTitle: "Chat"
  })
}