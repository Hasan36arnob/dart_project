import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Todo } from './app.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Todo],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Todo]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
