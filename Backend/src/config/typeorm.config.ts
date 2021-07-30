import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: process.env.DB_URL || dbConfig.url,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  ssl: process.env.DB_USE_SSL === 'true' || dbConfig.useSsl,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
