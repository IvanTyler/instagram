const options = {
  useNewUrlParser: true, 
  useFindAndModify: false, 
  useCreateIndex: true, 
  useUnifiedTopology: true, 
  poolSize: 10, 
  bufferMaxEntries: 0, 
}

const DB_HOST = 'localhost' // ТО ГДЕ НАХОДИТСЯ
const DB_NAME = 'instagram' // название базы данных
const DB_PORT = 27017 // по умолчанию

// ЭТО АДРЕС ПОДКЛЮЧЕНИЯ К СЕРВЕРУ
const dbConnectionURL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
// mongodb://localhost:27017/

module.exports = {
  dbConnectionURL,
  options,
}
