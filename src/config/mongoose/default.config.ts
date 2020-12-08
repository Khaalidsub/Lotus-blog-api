export default {
  id: "default",
  url: process.env.DEFAULT_URL || "mongodb://mongo:27017/blogs?authSource=blog",
  connectionOptions: {
    // user: process.env.USER || "lotus",
    // pass: process.env.PASS || "tj.Vnp*J52w69r_g",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
