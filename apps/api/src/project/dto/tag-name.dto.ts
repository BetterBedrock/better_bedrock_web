import { PickType } from "@nestjs/swagger";
import { ProjectTagDto } from "~/project/dto/project-tag.dto";

export class TagNameDto extends PickType(ProjectTagDto, ["name"] as const) {}
