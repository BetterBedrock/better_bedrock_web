import { Module } from "@nestjs/common";
import { DownloadModule } from "src/download/download.module";
import { ContentModule } from "./content/content.module";
import { CheckoutModule } from "./checkout/checkout.module";

@Module({
    imports: [DownloadModule, ContentModule, CheckoutModule],
})
export class AppModule {}
