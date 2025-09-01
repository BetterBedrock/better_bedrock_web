import { applyDecorators, UseInterceptors, BadRequestException } from "@nestjs/common";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import fs from "fs";
import { ProjectRequest } from "~/common/types/project-request.type";

export const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg"];
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
                fileFilter: (req, file, cb) => {
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
                limits: { fileSize: 5 * 1024 * 1024 },
            }),
        ),
    );
}
