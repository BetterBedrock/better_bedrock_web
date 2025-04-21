import { Module } from "@nestjs/common";
import { DownloadModule } from "src/download/download.module";

@Module({
    imports: [DownloadModule],
})
export class AppModule {}
