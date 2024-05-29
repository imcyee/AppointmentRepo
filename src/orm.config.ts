import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';


// TODO: move to .env files
export const mikroOptions = {
  migrations: {
    path: './src/migrations',
    tableName: 'migrations',
    transactional: true,
  },
  driverOptions: {
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
    }
  },
  tsNode: process.env.NODE_DEV === 'true' ? true : false, 
  dbName: 'schedule', 
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'], 
  driver: PostgreSqlDriver,
} as Parameters<typeof MikroORM.init>[0];

 