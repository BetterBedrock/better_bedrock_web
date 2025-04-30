import { Module } from "@nestjs/common";
import { DownloadModule } from "src/download/download.module";
import { ContentModule } from "./content/content.module";

@Module({
    imports: [DownloadModule, ContentModule],
})
export class AppModule {}
