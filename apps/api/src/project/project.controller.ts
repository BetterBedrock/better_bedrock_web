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
import { UpdateProjectDto } from "./dto/update-project.dto";
import { UserAuthGuard } from "~/auth/user-auth.guard";
import { FileUpload, MC_EXTENSIONS } from "~/common/decorators/file-upload.decorator";
import { ProjectOwnerGuard } from "~/project/guards/project-owner.guard";
import { AdminAuthGuard } from "~/auth/admin-auth.guard";
import { ProjectDto } from "~/project/dto/project.dto";
import { DeclineProjectDto } from "~/project/dto/decline-project.dto";
import { SimpleProjectDto } from "~/project/dto/simple-project.dto";
import { extname } from "path";
import { RatingService } from "~/rating/rating.service";
import { ProjectRatingDto } from "~/rating/dto/project-rating.dto";
import { RateProjectParamsDto } from "~/rating/dto/rate-project-params.dto";
import { CommentService } from "~/comment/comment.service";
import { PostCommentParamsDto } from "~/comment/dto/post-comment-params.dto";
import { ReplyToCommentParamsDto } from "~/comment/dto/reply-to-comment-params.dto";
import { ProjectCommentDto } from "~/comment/dto/project-comment.dto";
import { SearchProjectsQueryDto } from "~/project/dto/search-project-query.dto";
import { SearchProjectsDto } from "~/project/dto/search-project.dto";
import { CreateProjectBodyDto } from "~/project/dto/create-project-body.dto";
import { ProjectRequest } from "~/common/types/project-request.type";
import { AuthenticatedRequest } from "~/common/types/authenticated-request.type";
import { UploadFileDto } from "~/project/dto/upload-file.dto";
import { OptionalAuthGuard } from "~/auth/optional-auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { DetailedProjectDto } from "~/project/dto/detailed-project.dto";

@Controller("project")
export class ProjectController {
    constructor(
        private projectService: ProjectService,
        private ratingService: RatingService,
        private commentService: CommentService,
    ) {}

    @Post()
    @UseGuards(UserAuthGuard)
    @ApiBearerAuth()
    create(
        @Body() data: CreateProjectBodyDto,
        @Req() req: AuthenticatedRequest,
    ): Promise<ProjectDto> {
        return this.projectService.create(
            {
                userId: req.user.id,
                title: data.title,
            },
            req.user.admin,
        );
    }

    @Post("file/:id")
    @UseGuards(UserAuthGuard, ProjectOwnerGuard)
    @ApiBearerAuth()
    @FileUpload()
    async uploadProjectFile(
        @Param("id") _: string,
        @UploadedFile() file: Express.Multer.File,
        @Req() req: ProjectRequest,
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
    userProjects(
        @Param("id") id: string,
        @Req() req: AuthenticatedRequest,
    ): Promise<SimpleProjectDto[]> {
        return this.projectService.userProjects(id, req.user);
    }

    @Get("details/:id")
    projectDetails(@Param("id") id: string): Promise<DetailedProjectDto> {
        return this.projectService.projectDetails(id);
    }

    @Get("draft/:id")
    @UseGuards(UserAuthGuard, ProjectOwnerGuard)
    @ApiBearerAuth()
    draftDetails(@Param("id") _: string, @Req() req: ProjectRequest): DetailedProjectDto {
        return req.project;
    }

    @Patch(":id")
    @UseGuards(UserAuthGuard, ProjectOwnerGuard)
    @ApiBearerAuth()
    update(
        @Param("id") _: string,
        @Req() req: ProjectRequest,
        @Body() updateProjectDto: UpdateProjectDto,
    ): Promise<ProjectDto> {
        return this.projectService.update(req.project, updateProjectDto);
    }

    @Patch("submit/:id")
    @UseGuards(UserAuthGuard, ProjectOwnerGuard)
    @ApiBearerAuth()
    async submit(@Param("id") _: string, @Req() req: ProjectRequest) {
        await this.projectService.submitForReview(req.project);
        return;
    }

    @Patch("submit/cancel/:id")
    @UseGuards(UserAuthGuard, ProjectOwnerGuard)
    @ApiBearerAuth()
    async cancelSubmission(@Param("id") _: string, @Req() req: ProjectRequest) {
        await this.projectService.cancelSubmission(req.project.id);
        return;
    }

    @Patch("publish/:id")
    @UseGuards(AdminAuthGuard, ProjectOwnerGuard)
    @ApiBearerAuth()
    async publish(@Param("id") _: string, @Req() req: ProjectRequest) {
        await this.projectService.publish(req.project.id);
        return;
    }

    @Patch("decline/:id")
    @UseGuards(AdminAuthGuard, ProjectOwnerGuard)
    @ApiBearerAuth()
    async decline(
        @Param("id") _: string,
        @Body() data: DeclineProjectDto,
        @Req() req: ProjectRequest,
    ) {
        await this.projectService.decline(req.project.id, data);
        return;
    }

    @Get("submitted")
    @UseGuards(AdminAuthGuard)
    @ApiBearerAuth()
    submitted(): Promise<SimpleProjectDto[]> {
        return this.projectService.submitted();
    }

    @Delete(":id")
    @UseGuards(UserAuthGuard, ProjectOwnerGuard)
    @ApiBearerAuth()
    async delete(@Param("id") id: string) {
        await this.projectService.delete(id);
        return;
    }

    @Delete("production/:id")
    @UseGuards(UserAuthGuard, ProjectOwnerGuard)
    @ApiBearerAuth()
    async deleteProduction(@Param("id") id: string) {
        await this.projectService.deleteProduction(id);
        return;
    }

    @Post("rate/:projectId/:rating")
    @UseGuards(UserAuthGuard)
    @ApiBearerAuth()
    rateProject(
        @Req() req: AuthenticatedRequest,
        @Param() params: RateProjectParamsDto,
    ): Promise<ProjectRatingDto> {
        return this.ratingService.rateProject({ userId: req.user.id, ...params });
    }

    @Get("rate/:projectId")
    getProjectRating(@Param("projectId") projectId: string): Promise<ProjectRatingDto> {
        return this.ratingService.getProjectRating(projectId);
    }

    @Delete("rate/:projectId")
    @UseGuards(UserAuthGuard)
    @ApiBearerAuth()
    deleteRating(
        @Req() req: AuthenticatedRequest,
        @Param("projectId") projectId: string,
    ): Promise<ProjectRatingDto> {
        return this.ratingService.deleteUsersRating(req.user.id, projectId);
    }

    @Get("comments/:projectId")
    comments(@Param("projectId") projectId: string): Promise<ProjectCommentDto[]> {
        return this.commentService.getComments(projectId);
    }

    @Post("comment/:projectId")
    @UseGuards(UserAuthGuard)
    @ApiBearerAuth()
    postComment(
        @Param("projectId") projectId: string,
        @Req() req: AuthenticatedRequest,
        @Body() body: PostCommentParamsDto,
    ): Promise<ProjectCommentDto> {
        return this.commentService.postComment({ ...body, authorId: req.user.id, projectId });
    }

    @Post("comment/:projectId/reply/:parentId")
    @UseGuards(UserAuthGuard)
    @ApiBearerAuth()
    replyToComment(
        @Param() params: ReplyToCommentParamsDto,
        @Req() req: AuthenticatedRequest,
        @Body() body: PostCommentParamsDto,
    ): Promise<ProjectCommentDto> {
        return this.commentService.replyToComment({
            ...params,
            ...body,
            authorId: req.user.id,
        });
    }

    @Delete("comment/:id")
    @UseGuards(UserAuthGuard)
    @ApiBearerAuth()
    async deleteComment(@Param("id") commentId: string, @Req() req: AuthenticatedRequest) {
        await this.commentService.deleteComment(commentId, req.user.id);
        return;
    }
}
