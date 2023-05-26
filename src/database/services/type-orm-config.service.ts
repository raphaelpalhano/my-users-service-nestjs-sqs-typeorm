import { Injectable } from '@nestjs/common';
import type {
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  private entitiesDir = __dirname + '/**/*.entity{.js,.ts}';

  public createTypeOrmOptions() {
    return {
      type: 'mysql',
      applicationName: `${process.env.npm_package_name as string}-${
        process.env.NODE_ENV as string
      }`,
      keepConnectionAlive: false,
      host: process.env.DB_HOST || 'localhost',
      port: +(process.env.DB_PORT || 3306),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: `${process.env.DB_NAME || 'users-service-db'}`,
      entities: [`${this.entitiesDir}/`],
      autoLoadEntities: true,
      logging: process.env.TYPEORM_LOGGING === 'true',
      synchronize: process.env.NODE_ENV?.toLowerCase() !== 'production' || true,
    } as TypeOrmModuleOptions;
  }
}
