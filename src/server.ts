import express, { Response, Request, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import { router } from "./routes";

const app = express();
const port = 3333;
app.use(express.json());
app.use(cors());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Internal server error.",
  });
});

app.listen(port, () => {
  console.log(
    "\x1b[32m%s\x1b[0m",
    `############ [SERVER ON] Listening on port - ${port}, #### [NO ERROR] ############ `
  );
});

const handleExit = () => {
  console.log(
    "\x1b[31m%s\x1b[0m",
    `############ SERVER OFF!!! Listening off port ${port} ############`
  );
  process.exit();
};
process.on("SIGINT", handleExit);
process.on("SIGTERM", handleExit);
