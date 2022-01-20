const path = require('path')

const PROJECT_PATH = path.resolve(__dirname, '../')
const PROJECT_NAME = path.parse(PROJECT_PATH).name

const isDev = process.env.NODE_ENV !== 'production'
// const SERVER_HOST = '0.0.0.0'
const SERVER_HOST = '192.168.198.2'
const SERVER_PORT = 8000

const openAnalyzer = false;

module.exports = {
  PROJECT_PATH,
  PROJECT_NAME,
  isDev,
  SERVER_HOST,
  SERVER_PORT,
  openAnalyzer,
}
