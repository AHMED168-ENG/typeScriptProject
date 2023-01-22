import { Dialect } from "sequelize";
interface databaseType {
  database: string | undefined;
  host: string | undefined;
  password: string | undefined;
  username: string | undefined;
  logging: boolean | undefined;
  dialect: Dialect | undefined;
}

export const DatabaseConfig: databaseType = {
  database: process.env.database,
  host: process.env.host,
  password: process.env.password,
  username: process.env.username_DB,
  logging: false,
  dialect: "mysql",
};
