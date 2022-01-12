const express = require('express');
const mongoose = require('mongoose');
const app = express()
var cors = require('cors')
const PORT = process.env.PORT || 5000;
require('dotenv').config();
// const middleware = require('./middleware');
// app.use(middleware.decodeToken);

app.use(cors());

// Connect database
(async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useCreateIndex: true,
      //useFindAndModify: false,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
})();

// Init middleware
app.use(express.json({ extended: false }));


// Define routes
app.use('/api/auth', require('./routes/api/auth'));
// app.use('/api/users', require('./routes/api/users'));
app.use('/api/board', require('./routes/api/board'));


//test route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/todos', (req, res) => {
	return res.json({
		todos: [
			{
				title: 'Task1',
			},
			{
				title: 'Task2',
			},
			{
				title: 'Task3',
			},
		],
	});
});


app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`)
})