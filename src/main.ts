import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
  .setTitle('GameDB')
  .setDescription('Documentación de la API de GameDB. Aquí puedes encontrar todas las funciones y llamadas del backend, para poder probar su funcionamiento.')
  .setVersion('1.0')
  /* .addTag('GameDB') */
  .build();

  const options: SwaggerDocumentOptions =  {
    deepScanRoutes: true,
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };

  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'GameDB API Docs'
  }

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document, customOptions);

  app.enableCors();
  await app.listen(3000);

  console.log(`\nPara ver la documentación de la API: ${await app.getUrl()}/api \n`);
  console.log(`Para descargar el JSON del Swagger API: ${await app.getUrl()}/api-json`);

}
bootstrap()
.catch((error) => {console.error(error);});
