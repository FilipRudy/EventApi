import { User } from './src/user/entities/user.entity';

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_NAME,
  synchronize: true,
  logging: false,
  entities: [User],
};
