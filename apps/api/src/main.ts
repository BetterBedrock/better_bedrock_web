import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import metadata from "./metadata";
import { join } from "path";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const config = new DocumentBuilder()
        .setTitle("Better Bedrock API")
        .setDescription("The API used for handling downloads from Better Bedrock site")
        .setVersion("1.0")
        .addTag("download")
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);

    await SwaggerModule.loadPluginMetadata(metadata);
    SwaggerModule.setup("documentation", app, documentFactory, {
        jsonDocumentUrl: "documentation/json",
    });

    app.useStaticAssets(join(__dirname, "..", "static"), {
        prefix: "/static",
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    app.enableCors();

    await app.listen(process.env.PORT ?? 8084);
}

bootstrap();
