import Express from "express";
import listEndpoints from "express-list-endpoints";
import {
  genericErrorHandler,
  badRequestHandler,
  unauthorizedHandler,
  notfoundHandler,
} from "./errorsHandlers.js";
import mediasRouter from "./api/medias/index.js";

const server = Express();
const port = process.env.PORT;

server.use(Express.json());

server.use("/medias", mediasRouter);

server.use(badRequestHandler);
server.use(unauthorizedHandler);
server.use(notfoundHandler);
server.use(genericErrorHandler);

server.listen(port, () => {
  console.table(listEndpoints(server));
});
