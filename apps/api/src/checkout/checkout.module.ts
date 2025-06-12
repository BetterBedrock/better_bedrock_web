import { Module } from "@nestjs/common";
import { CheckoutController } from "src/checkout/checkout.controller";
import { CheckoutService } from "./checkout.service";

@Module({
    controllers: [CheckoutController],
    providers: [CheckoutService],
})
export class CheckoutModule {}
