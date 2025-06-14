import { Module } from "@nestjs/common";
import { DownloadModule } from "src/download/download.module";
import { ContentModule } from "./content/content.module";
import { CheckoutModule } from "./checkout/checkout.module";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";

@Module({
    imports: [
        DownloadModule,
        ContentModule,
        CheckoutModule,
        ThrottlerModule.forRoot({
            throttlers: [
                {
                    ttl: 60000,
                    limit: 30,
                },
            ],
        }),
    ],
    providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
