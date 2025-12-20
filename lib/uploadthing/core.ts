import { createUploadthing } from "uploadthing/server";
import type { FileRouter } from "uploadthing/server";

const f = createUploadthing();

/**
 * UploadThing file router
 * Handles ONLY file upload & metadata
 */
const minFileSize = "1MB" as const;
const maxFileSize = "16MB" as const;
const maxFileCount: number = 1;

export const uploadRouter = {
  pdfUploader: f({
    pdf: {
      maxFileSize,
      maxFileCount,
    },
  })
    .middleware(async () => {
      // auth can be added later
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      return {
        fileUrl: file.url,
        fileName: file.name,
        fileSize: file.size,
      };
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
