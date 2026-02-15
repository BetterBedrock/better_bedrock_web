import {
    applyDecorators,
    UseInterceptors,
    BadRequestException,
    CallHandler,
    ExecutionContext,
    NestInterceptor,
} from "@nestjs/common";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import fs from "fs";
import { ProjectRequest } from "~/common/types/project-request.type";
import { Observable } from "rxjs";

export const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "gif", "webp"];
export const MC_EXTENSIONS = [
    "mcworld",
    "mcproject",
    "mcpack",
    "mctemplate",
    "mcaddon",
    "mceditoraddon",
    "mcstructure",
    "mcmeta",
    "mcfunction",
    "mcschema",
];

const MAX_FOLDER_SIZE_MB = {
    public: 25,
    private: 40,
};
const MAX_FOLDER_SIZE = {
    public: MAX_FOLDER_SIZE_MB.public * 1024 * 1024,
    private: MAX_FOLDER_SIZE_MB.private * 1024 * 1024,
};

const maxUploadSize = 100 * 1024 * 1024; // 100MB

const getFolderSizeSync = (folderPath: string): number => {
    if (!fs.existsSync(folderPath)) return 0;

    const files = fs.readdirSync(folderPath);
    return files.reduce((total, file) => {
        const filePath = `${folderPath}/${file}`;
        const stats = fs.statSync(filePath);
        return total + (stats.isFile() ? stats.size : 0);
    }, 0);
};

export function FileUpload() {
    return applyDecorators(
        ApiConsumes("multipart/form-data"),
        ApiBody({
            schema: {
                type: "object",
                properties: {
                    file: {
                        type: "string",
                        format: "binary",
                    },
                },
            },
        }),
        UseInterceptors(
            FileInterceptor("file", {
                storage: diskStorage({
                    destination: (req: ProjectRequest, file, cb) => {
                        const project = req.project;
                        if (!project) {
                            return cb(
                                new BadRequestException(
                                    "Project information missing for file upload",
                                ),
                                "",
                            );
                        }

                        const ext = extname(file.originalname).replace(".", "").toLowerCase();
                        let visibility: "public" | "private";
                        if (IMAGE_EXTENSIONS.includes(ext)) {
                            visibility = "public";
                        } else if (MC_EXTENSIONS.includes(ext)) {
                            visibility = "private";
                        } else {
                            return cb(
                                new BadRequestException(
                                    `Invalid file extension: .${ext}. Allowed: ${IMAGE_EXTENSIONS.concat(MC_EXTENSIONS).join(", ")}`,
                                ),
                                "",
                            );
                        }

                        const uploadPath = `./static/${visibility}/${project.id}/draft/`;
                        fs.mkdirSync(uploadPath, { recursive: true });

                        const folderSize = getFolderSizeSync(uploadPath);

                        if (
                            !project.betterBedrockContent &&
                            folderSize >= MAX_FOLDER_SIZE[visibility]
                        ) {
                            return cb(
                                new BadRequestException(
                                    `Upload folder exceeded max size of ${MAX_FOLDER_SIZE_MB[visibility]}MB for ${visibility} files`,
                                ),
                                "",
                            );
                        }

                        cb(null, uploadPath);
                    },
                    filename: (_, file, cb) => {
                        let uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                        const ext = extname(file.originalname).replace(".", "").toLowerCase();
                        if (MC_EXTENSIONS.includes(ext)) {
                            uniqueSuffix = "file";
                        }
                        cb(null, `${uniqueSuffix}.${ext}`);
                    },
                }),
                fileFilter: (_, file, cb) => {
                    const ext = extname(file.originalname).replace(".", "").toLowerCase();
                    if (IMAGE_EXTENSIONS.includes(ext) || MC_EXTENSIONS.includes(ext)) {
                        cb(null, true);
                    } else {
                        cb(
                            new BadRequestException(
                                `Invalid file extension: .${ext}. Allowed: ${IMAGE_EXTENSIONS.concat(MC_EXTENSIONS).join(", ")}`,
                            ),
                            false,
                        );
                    }
                },
                limits: { fileSize: maxUploadSize },
            }),
            FolderSizeInterceptor,
        ),
    );
}

// Post-save interceptor (to verify folder size after file gets uploaded)
class FolderSizeInterceptor implements NestInterceptor {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const file: Express.Multer.File = req.file;
        const project = req.project;

        if (file && project) {
            const ext = extname(file.originalname).slice(1).toLowerCase();
            const visibility = IMAGE_EXTENSIONS.includes(ext) ? "public" : "private";

            const uploadPath = `./static/${visibility}/${project.id}/draft/`;
            const folderSize = getFolderSizeSync(uploadPath);
            const newSize = folderSize;

            if (!project.betterBedrockContent && newSize > MAX_FOLDER_SIZE[visibility]) {
                fs.unlinkSync(file.path);
                throw new BadRequestException(
                    `Upload folder exceeded max size of ${MAX_FOLDER_SIZE_MB[visibility]}MB for ${visibility} files`,
                );
            }
        }

        return next.handle();
    }
}
