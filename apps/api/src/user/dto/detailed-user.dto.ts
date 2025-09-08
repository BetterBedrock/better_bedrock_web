import { UserRatingDto } from "~/rating/dto/user-rating.dto";
import { UserDto } from "~/user/dto/user.dto";

export class DetailedUserDto extends UserDto {
    rating: UserRatingDto;
}
