import Express from "express";
import multer from "multer";
import { pipeline } from "stream";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { getMedias, writeMedias } from "../../lib/fs-tools.js";
import {
  asyncPDFGeneration,
  getPDFRedeableStream,
} from "../../lib/pdf-tools.js";

const filesRouter = Express.Router();

const cloudinaryUploader = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "W2-SoloProject",
    },
  }),
}).single("poster");

filesRouter.post("/:id/poster", cloudinaryUploader, async (req, res, next) => {
  try {
    const mediasArray = await getMedias();
    const index = mediasArray.findIndex((e) => e.imdbID === req.params.id);

    if (index !== -1) {
      const oldMedia = mediasArray[index];
      const updatedMedia = {
        ...oldMedia,
        poster:
          "https://res.cloudinary.com/duwlgntoh/image/upload/v1678451264/W2-SoloProject/unssfxvgetnqee9wlava.gif",
        updatedAt: new Date(),
      };
      mediasArray[index] = updatedMedia;
      await writeMedias(mediasArray);

      res.send(updatedMedia);
    } else {
      next(createHttpError(404, `Media with id: ${req.params.id} not found.`));
    }
  } catch (error) {
    next(error);
  }
});

filesRouter.get("/:id/pdf", async (req, res, next) => {
  try {
    res.setHeader("Content-Disposition", `attachment; filename=${req.id}.pdf`);
    const mediasArray = await getMedias();
    const foundMedia = mediasArray.find((e) => e.imdbID === req.params.id);

    if (foundMedia) {
      //   await asyncPDFGeneration(foundMedia);
      const source = getPDFRedeableStream(foundMedia);
      const destination = res;

      pipeline(source, destination, (err) => {
        if (err) console.log(err);
      });
    } else {
      next(createHttpError(404, `Media with id: ${req.params.id} not found.`));
    }
  } catch (error) {
    next(error);
  }
});

export default filesRouter;
