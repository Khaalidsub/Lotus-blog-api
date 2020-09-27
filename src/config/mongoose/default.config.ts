export default {
  id: "admin",
  url: process.env.DEFAULT_URL || "mongodb://[lotus:tj.Vnp*J52w69r_g]localhost:27017/admin",
  connectionOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
