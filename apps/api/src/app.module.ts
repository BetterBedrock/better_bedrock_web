import { Module } from "@nestjs/common";
import { DownloadModule } from "src/download/download.module";
import { ContentModule } from "./content/content.module";
import { CheckoutModule } from "./checkout/checkout.module";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { VoucherModule } from "src/voucher/voucher.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [
        ThrottlerModule.forRoot({
            throttlers: [
                {
                    ttl: 60000,
                    limit: 30,
                },
            ],
        }),
        DownloadModule,
        ContentModule,
        CheckoutModule,
        VoucherModule,
        AuthModule,
    ],
    providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
