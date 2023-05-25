import type { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import type { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './services/type-orm-config.service';

interface DatabaseConnections {
  connections?: TypeOrmModuleAsyncOptions[];
}

@Module({})
export class DatabaseModule {
  public static register({ connections = [] }: DatabaseConnections = {}) {
    const typeOrmConArray: DynamicModule[] = [];

    typeOrmConArray.push(
      TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    );

    for (const conn of connections) {
      typeOrmConArray.push(TypeOrmModule.forRootAsync(conn));
    }

    return {
      module: DatabaseModule,
      imports: typeOrmConArray,
    } as DynamicModule;
  }
}
