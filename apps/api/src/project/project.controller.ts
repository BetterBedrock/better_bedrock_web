import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Req,
    UploadedFile,
    BadRequestException,
} from "@nestjs/common";
import { ProjectService } from "./project.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { UserAuthGuard } from "~/auth/user-auth.guard";
import { FileUpload } from "~/common/decorators/file-upload.decorator";

@Controller("project")
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Post()
    @ApiBearerAuth()
    @UseGuards(UserAuthGuard)
    async create(@Body() createProjectDto: CreateProjectDto, @Req() req) {
        return await this.projectService.create({
            ...createProjectDto,
            user: req.user,
            itemWeight: 0,
            lastChanged: new Date(),
        });
    }

    @Post("file")
    @UseGuards(UserAuthGuard)
    @ApiBearerAuth()
    @FileUpload()
    @ApiOkResponse({ description: "Upload successful" })
    @ApiBadRequestResponse({ description: "File upload failed" })
    async uploadProjectFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException("File upload failed");
        }
        return { fileUrl: file.path.replace(/\\/g, "/") };
    }

    @Get()
    findAll() {
        return this.projectService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.projectService.findOne(+id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateProjectDto: UpdateProjectDto) {
        return this.projectService.update(+id, updateProjectDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.projectService.remove(+id);
    }
}
