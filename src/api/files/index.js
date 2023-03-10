import Express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import pipeline from "stream";
import { getMedias } from "../../lib/fs-tools.js";

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
    console.log("FIlE:", req.file);
    res.send({ message: "poster uploaded" });
  } catch (error) {
    next(error);
  }
});

export default filesRouter;
