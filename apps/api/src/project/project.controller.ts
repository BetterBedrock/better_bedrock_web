import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    UseGuards,
    Req,
    UploadedFile,
    BadRequestException,
    Delete,
    Query,
} from "@nestjs/common";
import { ProjectService } from "./project.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { UserAuthGuard } from "~/auth/user-auth.guard";
import { FileUpload, MC_EXTENSIONS } from "~/common/decorators/file-upload.decorator";
import { ProjectType } from "@prisma/client";
import { ProjectOwnerGuard } from "~/project/guards/project-owner.guard";
import { AdminAuthGuard } from "~/auth/admin-auth.guard";
import { ProjectDto } from "~/project/dto/project.dto";
import { DeclineProjectDto } from "~/project/dto/decline-project.dto";
import { SimpleProjectDto } from "~/project/dto/simple-project.dto";
import { UploadFileDto } from "~/project/dto/upload-file.dto";
import { extname } from "path";
import { OptionalAuthGuard } from "~/auth/optional-auth.guard";
import { RatingService } from "~/rating/rating.service";
import { ProjectRatingDto } from "~/rating/dto/project-rating.dto";
import { RateProjectParamsDto } from "~/rating/dto/rate-project-params.dto";
import { CommentService } from "~/comment/comment.service";
import { PostCommentParamsDto } from "~/comment/dto/post-comment-params.dto";
import { ReplyToCommentParamsDto } from "~/comment/dto/reply-to-comment-params.dto";
import { ProjectCommentDto } from "~/comment/dto/project-comment.dto";
import { SearchProjectsQueryDto } from "~/project/dto/search-project-query.dto";
import { SearchProjectsDto } from "~/project/dto/search-project.dto";

@Controller("project")
export class ProjectController {
    constructor(
        private readonly projectService: ProjectService,
        private readonly ratingService: RatingService,
        private readonly commentService: CommentService,
    ) {}

    @Post()
    @ApiBearerAuth()
    @UseGuards(UserAuthGuard)
    @ApiOkResponse({
        description: "Successfully created project",
        type: ProjectDto,
    })
    async create(@Body() data: CreateProjectDto, @Req() req) {
        const id = data.title
            .toLowerCase()
            .replace(/\s+/g, "_")
            .replace(/[^a-z0-9_]/g, "");

        return await this.projectService.create({
            id,
            userId: req.user.id,
            itemWeight: 0,
            title: data.title,
            description: "",
            type: ProjectType.texturepacks,
        });
    }

    @Post("file/:id")
    @UseGuards(UserAuthGuard, ProjectOwnerGuard)
    @ApiBearerAuth()
    @FileUpload()
    @ApiBadRequestResponse({ description: "File upload failed" })
    async uploadProjectFile(
        @Param("id") id: string,
        @UploadedFile() file: Express.Multer.File,
        @Req() req,
    ): Promise<UploadFileDto> {
        if (!file) {
            throw new BadRequestException("File upload failed");
        }

        const ext = extname(file.originalname).replace(".", "").toLowerCase();

        const path = file.path.replace(/\\/g, "/");
        if (MC_EXTENSIONS.includes(ext)) {
            await this.projectService.update(req.project, {
                downloadFile: path,
                itemWeight: file.size * 0.000001,
            });
        }

        return { fileUrl: path };
    }

    @Get()
    search(@Query() query: SearchProjectsQueryDto): Promise<SearchProjectsDto> {
        return this.projectService.search(query);
    }

    @Get("user/:id")
    @UseGuards(OptionalAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({
        description: "Successfully fetched user projects",
        type: SimpleProjectDto,
        isArray: true,
    })
    async userProjects(@Param("id") id: string, @Req() req): Promise<SimpleProjectDto[]> {
        return await this.projectService.userProjects(id, req.user);
    }

    @Get("details/:id")
    @ApiOkResponse({ description: "Successfully fetched project details", type: ProjectDto })
    async projectDetails(@Param("id") id: string): Promise<ProjectDto> {
        return await this.projectService.projectDetails(id);
    }

    @Get("draft/:id")
    @ApiOkResponse({ description: "Successfully fetched draft details", type: ProjectDto })
    @UseGuards(UserAuthGuard, ProjectOwnerGuard)
    @ApiBearerAuth()
    async draftDetails(@Param("id") id: string): Promise<ProjectDto> {
        return await this.projectService.draftDetails(id);
    }

    @UseGuards(UserAuthGuard, ProjectOwnerGuard)
    @ApiOkResponse({ description: "Successfully updated project details", type: ProjectDto })
    @ApiBearerAuth()
    @Patch(":id")
    async update(
        @Param("id") _: string,
        @Req() req,
        @Body() updateProjectDto: UpdateProjectDto,
    ): Promise<ProjectDto> {
        return await this.projectService.update(req.project, updateProjectDto);
    }

    @UseGuards(UserAuthGuard, ProjectOwnerGuard)
    @ApiOkResponse({ description: "Successfully submitted for review", type: ProjectDto })
    @ApiBearerAuth()
    @Patch("submit/:id")
    async submit(@Param("id") _: string, @Req() req) {
        return await this.projectService.submitForReview(req.project);
    }

    @UseGuards(UserAuthGuard, ProjectOwnerGuard)
    @ApiOkResponse({ description: "Successfully cancelled submission", type: ProjectDto })
    @ApiBearerAuth()
    @Patch("submit/cancel/:id")
    async cancelSubmission(@Param("id") _: string, @Req() req) {
        return await this.projectService.cancelSubmission(req.project.id);
    }

    @UseGuards(AdminAuthGuard)
    @ApiBearerAuth()
    @Patch("publish/:id")
    async publish(@Param("id") id: string) {
        return await this.projectService.publish(id);
    }

    @UseGuards(AdminAuthGuard)
    @ApiBearerAuth()
    @Patch("decline/:id")
    async decline(@Param("id") id: string, @Body() data: DeclineProjectDto) {
        return await this.projectService.decline(id, data);
    }

    @UseGuards(AdminAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({
        description: "Returns submitted projects for review",
        type: SimpleProjectDto,
        isArray: true,
    })
    @Get("submitted")
    async submitted() {
        return await this.projectService.submitted();
    }

    @Delete(":id")
    @UseGuards(UserAuthGuard, ProjectOwnerGuard)
    @ApiOkResponse({ description: "Successfully deleted project" })
    @ApiBearerAuth()
    async delete(@Param("id") id: string) {
        await this.projectService.delete(id);
        return;
    }

    @Post("rate/:projectId/:rating")
    @UseGuards(UserAuthGuard)
    @ApiOkResponse({ description: "Successfully rated project", type: ProjectRatingDto })
    @ApiBearerAuth()
    async rateProject(@Req() req, @Param() params: RateProjectParamsDto) {
        return await this.ratingService.rateProject({ userId: req.user.id, ...params });
    }

    @Get("rate/:projectId")
    @ApiOkResponse({
        description: "Successfully commented under a project",
        type: ProjectRatingDto,
    })
    async getProjectRating(@Param("projectId") projectId: string): Promise<ProjectRatingDto> {
        return await this.ratingService.getProjectRating(projectId);
    }

    @Delete("rate/:projectId")
    @UseGuards(UserAuthGuard)
    @ApiOkResponse({
        description: "Successfully deleted rating for given project",
        type: ProjectRatingDto,
    })
    @ApiBearerAuth()
    async deleteRating(@Req() req, @Param("projectId") projectId: string) {
        return await this.ratingService.deleteUsersRating(req.user.id, projectId);
    }

    @Get("comments/:projectId")
    @ApiOkResponse({
        description: "Returns comments under a project",
        type: ProjectCommentDto,
        isArray: true,
    })
    async comments(@Param("projectId") projectId: string) {
        return await this.commentService.getComments(projectId);
    }

    @Post("comment/:projectId")
    @UseGuards(UserAuthGuard)
    @ApiOkResponse({ description: "Successfully posted a comment", type: ProjectCommentDto })
    @ApiBearerAuth()
    async postComment(
        @Param("projectId") projectId: string,
        @Req() req,
        @Body() body: PostCommentParamsDto,
    ) {
        return await this.commentService.postComment({ ...body, authorId: req.user.id, projectId });
    }

    @Post("comment/:projectId/reply/:parentId")
    @UseGuards(UserAuthGuard)
    @ApiOkResponse({ description: "Successfully posted a reply", type: ProjectCommentDto })
    @ApiBearerAuth()
    async replyToComment(
        @Param() params: ReplyToCommentParamsDto,
        @Req() req,
        @Body() body: PostCommentParamsDto,
    ) {
        return await this.commentService.replyToComment({
            ...params,
            ...body,
            authorId: req.user.id,
        });
    }

    @Delete("comment/:id")
    @UseGuards(UserAuthGuard)
    @ApiOkResponse({ description: "Successfully deleted a comment" })
    @ApiBearerAuth()
    async deleteComment(@Param("id") commentId: string, @Req() req) {
        return await this.commentService.deleteComment(commentId, req.user.id);
    }
}
