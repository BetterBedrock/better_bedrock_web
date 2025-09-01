import { PickType } from "@nestjs/swagger";
import { UserDto } from "~/user/dto/user.dto";

export class GoogleAccountDto extends PickType(UserDto, ["email", "name"]) {
    /**
     * Google account identifier
     * @example "123abc456efg"
     */
    sub: string;

    /**
     * Link to google account profile picture
     * @example "https://..."
     */
    picture: string;
}
