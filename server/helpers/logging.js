const logging = (req, res, next) => {

  const path = req.path.split('/')[1]
  if (path === 'images' || path === 'fonts') {
    next()
  }

  const time = new Date()
  const day = time.getDate().toString().padStart(2, '0'),
        month = (time.getMonth() + 1).toString().padStart(2, '0'),
        year = time.getFullYear(),
        hours = time.getHours().toString().padStart(2, '0'),
        minutes = time.getMinutes().toString().padStart(2, '0'),
        seconds = time.getSeconds().toString().padStart(2, '0'),
        timeStamp = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`

  const ip = req.connection.remoteAddress || 
             req.socket.remoteAddress ||
             req.connection.socket.remoteAddress


  console.log(timeStamp, req.method, req.originalUrl, ip)
  next()
}

module.exports = logging