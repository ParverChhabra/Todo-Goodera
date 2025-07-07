import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',      // or your DB host
      port: 5432,             // default PostgreSQL port
      username: 'postgres',
      password: '1234',
      database: 'todo',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,      // set to false in production
      autoLoadEntities: true, // optional, auto-loads entities
    }),
    TypeOrmModule.forFeature([Todo]) // Register the entity for DI
  ],
  
  controllers: [AppController],
  providers: [TodoService],
})
export class AppModule {}
