const app = require("./app");

app.listen(process.env.PORT || 3000, () => {
  console.log('server is running on port 3000');
});
