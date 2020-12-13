import { NestFactory } from '@nestjs/core';
import * as config from 'config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   app.enableCors({ origin: 'http://localhost:4200', credentials: true });

  const serverConfig = config.get('server');

  const port = process.env.PORT || serverConfig.port;

  await app.listen(port);
}
bootstrap();
