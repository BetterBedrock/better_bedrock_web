import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import metadata from "./metadata";
import { join } from "path";
import { NestExpressApplication } from "@nestjs/platform-express";
import helmet from "helmet";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        rawBody: true,
    });

    app.getHttpAdapter().getInstance().set("trust proxy", true);

    app.use(
        helmet.contentSecurityPolicy({
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: [
                    "'self'",
                    "https'://js.stripe.com'",
                    "'unsafe-inline'", // Required by some Stripe elements
                ],
                scriptSrcElem: [
                    "'self'",
                    "https://js.stripe.com",
                    "blob:", // Allow blob URLs for scripts
                ],
                styleSrc: ["'self'", "https://js.stripe.com", "'unsafe-inline'"],
                frameSrc: ["'self'", "https://js.stripe.com", "https://hooks.stripe.com"],
                connectSrc: ["'self'", "https://api.stripe.com", "https://m.stripe.network"],
                imgSrc: ["'self'", "data:", "https://*.stripe.com"],
                fontSrc: ["'self'", "data:"],
            },
        }),
    );

    app.use((req, res, next) => {
        if (!req.path.startsWith("/static/uploads/public")) {
            res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
            res.setHeader("Pragma", "no-cache");
            res.setHeader("Expires", "0");
        }
        next();
    });

    const config = new DocumentBuilder()
        .setTitle("Better Bedrock API")
        .setDescription("The API used for handling downloads from Better Bedrock site")
        .setVersion("1.0")
        .addBearerAuth()
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);

    await SwaggerModule.loadPluginMetadata(metadata);
    SwaggerModule.setup("documentation", app, documentFactory, {
        jsonDocumentUrl: "documentation/json",
        ui: true,
        raw: ["json"],
    });

    app.useStaticAssets(join(__dirname, "..", "static"), {
        prefix: "/static",
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    );

    app.enableCors();

    await app.listen(process.env.PORT ?? 8084);
}

bootstrap();
