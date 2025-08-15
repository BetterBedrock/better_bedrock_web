import { Module } from "@nestjs/common";
import { DownloadModule } from "~/download/download.module";
import { ContentModule } from "./content/content.module";
import { CheckoutModule } from "./checkout/checkout.module";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { VoucherModule } from "~/voucher/voucher.module";
import { AuthModule } from "~/auth/auth.module";
import { AnalyticsModule } from "~/analytics/analytics.module";
import { ProjectModule } from "./project/project.module";

@Module({
    imports: [
        ThrottlerModule.forRoot({
            throttlers: [
                {
                    ttl: 60000,
                    limit: 1000,
                },
            ],
        }),
        DownloadModule,
        ContentModule,
        CheckoutModule,
        VoucherModule,
        AuthModule,
        AnalyticsModule,
        ProjectModule,
    ],
    providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
