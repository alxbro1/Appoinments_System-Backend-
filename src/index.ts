import app from "./server";
import { PORT } from "./config/envs";
import { AppDataSource } from "./config/data-source";
import CreateUsers from "./helpers/CreateUsers";
import CreateAppoinments from "./helpers/CreateAppoinments";

AppDataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
  });
  CreateUsers().then(() => {
    CreateAppoinments();
  });
});
