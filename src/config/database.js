module.exports = {
  host: '127.0.0.1',
  port: 5432,
  username: 'guilherme',
  password: '1234',
  database: 'sellSystem',
  dialect: 'postgres',
  operatorsAliases: false,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}