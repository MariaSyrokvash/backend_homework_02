import { connectToDB } from './db/mongoDb';
import { app } from './app';
import { CONFIG } from './config';

const startApp = async () => {
  const res = await connectToDB();

  if (!res) {
    process.exit(1);
  }

  app.listen(CONFIG.PORT, () => {
    console.log('...server started in port ' + CONFIG.PORT);
  });
};

startApp().catch((err) => {
  console.log(err);
});
