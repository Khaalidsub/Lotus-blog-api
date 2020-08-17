export default {
  id: "default",
  url: process.env.DEFAULT_URL || "mongodb://172.17.0.2:27017/default",
  connectionOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
