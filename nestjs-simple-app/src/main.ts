// src/main.ts
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  
  // Serve static files from public directory using Fastify's built-in static serving
  const fastifyInstance = app.getHttpAdapter().getInstance();
  fastifyInstance.register(require('@fastify/static'), {
    root: join(__dirname, '..', 'public'),
    prefix: '/',
  });
  
  await app.listen(3000);
  console.log('Server running on http://localhost:3000');
}
bootstrap();