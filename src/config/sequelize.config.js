const DatabaseConfig = {
  database: process.env.database,
  host: process.env.host,
  password: process.env.password,
  username: process.env.username_DB,
  logging: false,
  dialect: "mysql",
};

module.exports = DatabaseConfig;
