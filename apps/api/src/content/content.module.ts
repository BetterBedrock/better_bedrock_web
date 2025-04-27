import { Module } from "@nestjs/common";
import { ContentController } from "src/content/content.controller";

@Module({
    controllers: [ContentController],
})
export class ContentModule {}
