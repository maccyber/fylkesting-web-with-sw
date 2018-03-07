const dev = process.env.NODE_ENV !== 'production'
if (dev) {
  require('dotenv').config()
}
const Gun = require('gun')
const os = require('os')
const micro = require('micro')
const { parse: urlParse } = require('url')
const { setup, login, callback, logout } = require('./api')
const redirect = (res, location, statusCode = 302) => { res.statusCode = statusCode; res.setHeader('Location', location); res.end() }
const { SESSION_KEY } = require('./secrets')
const session = require('micro-cookie-session')({
  name: 'session',
  keys: [SESSION_KEY],
  maxAge: 24 * 60 * 60 * 1000
})
const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3000
const app = next({ dev })
const handle = app.getRequestHandler()
const parseAgenda = require('./lib/parse-agenda')
const dataFilePath = `${os.tmpdir()}/data.json`
const { createReadStream } = require('fs')
const { DEMO } = require('./config')

function useS3 () {
  return process.env.AWS_ACCESS_KEY_ID !== undefined && process.env.AWS_SECRET_ACCESS_KEY !== undefined && process.env.AWS_S3_BUCKET !== undefined
}

function s3Configuration () {
  let s3 = false
  if (useS3() === true) {
    console.log('> s3 storage configured')
    s3 = {
      key: process.env.AWS_ACCESS_KEY_ID,
      secret: process.env.AWS_SECRET_ACCESS_KEY,
      bucket: process.env.AWS_S3_BUCKET
    }
  } else {
    console.log('> s3 storage not configured')
    console.log('> using local filestorage')
    console.log(`> data filePath: ${dataFilePath}`)
  }
  return s3
}

const server = micro(async (req, res) => {
  if (Gun.serve(req, res)) {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(req)
    return
  }
  session(req, res)
  const { pathname } = await urlParse(req.url, true)
  if (pathname === '/api/login') {
    if (DEMO) {
      req.session.data = require('./test/user.json')
      redirect(res, '/')
      return
    }
    return login(req, res)
  } else if (pathname === '/api/logout') {
    req.session = null
    if (DEMO) {
      redirect(res, '/')
      return
    }
    return logout(req, res)
  } else if (pathname === '/api/callback') {
    try {
      const callbackData = await callback(req, res)
      req.session.data = callbackData.userProfile[0]
      redirect(res, '/')
    } catch (error) {
      throw error
    }
  } else if (pathname.includes('/api/agenda')) {
    const urlSplit = pathname.split('/')
    const meetingId = urlSplit[urlSplit.length - 1]
    const data = await parseAgenda(meetingId)
    return data
  } else if (pathname === '/service-worker.js') {
    res.setHeader('content-type', 'text/javascript')
    createReadStream('./lib/service-worker.js').pipe(res)
  } else {
    return handle(req, res)
  }
})

const gun = Gun({
  file: !useS3() ? dataFilePath : false,
  s3: s3Configuration(),
  web: server
})

// Sync everything
gun.on('out', {get: {'#': {'*': ''}}})

app.prepare().then(() => {
  server.listen(port, err => {
    if (err) throw err
    setup()
    console.log(`> Ready on http://localhost:${port}`)
  })
})
