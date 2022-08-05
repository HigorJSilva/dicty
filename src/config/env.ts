export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://mongo:27017/dicty',
  port: process.env.PORT ?? 5000,
  jwtSecret: process.env.JWT_SECRET ?? 'tjgHOR043gF5t'
}
