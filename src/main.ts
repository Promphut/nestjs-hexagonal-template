import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, raw, urlencoded } from 'express';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { nodePort, nodeEnv } from './configs/config.env';
import { start as startTracer } from './tracer';

async function bootstrap(): Promise<void> {
  const isLocal = nodeEnv === 'local';
  const createApp = () => {
    return NestFactory.create<NestExpressApplication>(AppModule, {
      bufferLogs: true,
    });
  };
  // if (!isLocal) {
  //   await startTracer();
  // }
  const app = await createApp();
  app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const logger = setupLogger(app);

  setupUse(app);
  app.enableCors();

  await app.listen(nodePort, '0.0.0.0', () => {
    logger.log(`Application is running on port: ${nodePort}`);
  });
}

bootstrap();

const setupLogger = (app: NestExpressApplication) => {
  const logger = app.get(Logger);
  app.useLogger(logger);
  app.flushLogs();
  return logger;
};

const setupUse = (app: NestExpressApplication) => {
  app.use(raw({ limit: '5mb' }));
  app.use(urlencoded({ limit: '5mb' }));
  app.use(json({ limit: '5mb' }));
};
