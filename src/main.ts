import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	console.log(`Running in ${process.env.NODE_ENV} mode`);

	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe({ transform: true }));

	const config = new DocumentBuilder()
		.setTitle('MongoDBSQL API')
		.setDescription('MongoDB API')
		.setVersion('1.0')
		.build();

	const documentFactory = () => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('swagger', app, documentFactory);

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
