import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
let appInsights = require('applicationinsights');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appInsightKey = process.env.APPINSIGHTS_INSTRUMENTATIONKEY;
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors();

  if (appInsightKey) {
    appInsights
      .setup(appInsightKey)
      .setAutoDependencyCorrelation(true)
      .setAutoCollectRequests(true)
      .setAutoCollectPerformance(true, true)
      .setAutoCollectExceptions(true)
      .setAutoCollectDependencies(true)
      .setAutoCollectConsole(true)
      .setUseDiskRetryCaching(true)
      .setSendLiveMetrics(false)
      .setDistributedTracingMode(appInsights.DistributedTracingModes.AI)
      .start();
  }

  await app.listen(3000);
}
bootstrap();
