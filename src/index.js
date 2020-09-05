require('dotenv').config()
const app = require('./app')

const port = process.env.PORT || 5000;


// Listen
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});