export default {
  id: "blogs",
  url: process.env.DEFAULT_URL || "mongodb://localhost:27017/blogs?authSource=blog",
  connectionOptions: {
    // user: process.env.USER || "lotus",
    // pass: process.env.PASS || "tj.Vnp*J52w69r_g",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
