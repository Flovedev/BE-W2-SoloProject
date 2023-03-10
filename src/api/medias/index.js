import Express from "express";
import createHttpError from "http-errors";
import uniqid from "uniqid";
import { getMedias, writeMedias } from "../../lib/fs-tools.js";
import { checkMediasSchema, triggerBadRequest } from "./validation.js";

const mediasRouter = Express.Router();

mediasRouter.get("/", async (req, res, next) => {
  try {
    const mediasArray = await getMedias();
    res.send(mediasArray);
  } catch (error) {
    next(error);
  }
});
mediasRouter.get("/:id", async (req, res, next) => {
  try {
    const mediasArray = await getMedias();
    const foundMedia = mediasArray.find((e) => e.imdbID === req.params.id);
    if (foundMedia) {
      res.send(foundMedia);
    } else {
      next(createHttpError(404, `Media with id: ${req.params.id} not found.`));
    }
  } catch (error) {
    next(error);
  }
});
mediasRouter.post(
  "/",
  checkMediasSchema,
  triggerBadRequest,
  async (req, res, next) => {
    try {
      const newMedia = {
        ...req.body,
        imdbID: uniqid(),
        createdAt: new Date(),
        updatedAt: new Date(),
        poster: "",
      };
      const mediasArray = await getMedias();
      mediasArray.push(newMedia);
      await writeMedias(mediasArray);

      res.status(201).send({ created: `media with id:${newMedia.imdbID}` });
    } catch (error) {
      next(error);
    }
  }
);

export default mediasRouter;
