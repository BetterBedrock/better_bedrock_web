import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle("Better Bedrock API")
        .setDescription("The API used for handling downloads from Better Bedrock site")
        .setVersion("1.0")
        .addTag("download")
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("documentation", app, documentFactory, {
        jsonDocumentUrl: "documentation/json",
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    await app.listen(process.env.PORT ?? 8084);
}
bootstrap();
