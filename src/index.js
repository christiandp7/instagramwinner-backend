require('dotenv').config()
const app = require('./app')

const port = process.env.port || 5000;


// Listen
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});