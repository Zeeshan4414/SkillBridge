import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin:  '*', // Allow frontend origin
    credentials: true, // If using cookies or Authorization header
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
