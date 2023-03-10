import { checkSchema, validationResult } from "express-validator";
import createHttpError from "http-errors";

const mediasSchema = {
  title: {
    in: ["body"],
    isString: {
      errorMessage: "Title is a mandatory field and needs to be a string!",
    },
  },
  year: {
    in: ["body"],
    isNumber: {
      errorMessage: "Year is a mandatory field and needs to be a number!",
    },
  },
  type: {
    in: ["body"],
    isString: {
      errorMessage: "Type is a mandatory field and needs to be a string!",
    },
  },
};

export const checkMediasSchema = checkSchema(mediasSchema);

export const triggerBadRequest = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors.array());

  if (errors.isEmpty()) {
    next();
  } else {
    next(
      createHttpError(400, `Errors during media validation`, {
        errorsList: errors.array(),
      })
    );
  }
};
