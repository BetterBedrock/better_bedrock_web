import { IsNumber } from "class-validator";

export class LiveCountDto {
    @IsNumber()
    online: number;
}
