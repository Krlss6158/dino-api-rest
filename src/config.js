import { config } from "dotenv";
config();

export default {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://root:rQ7mcd2iBZ6Gvwr3@dinocluster.lwq1x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  PORT: process.env.PORT || 4000,
  SECRET: 'super'
};
