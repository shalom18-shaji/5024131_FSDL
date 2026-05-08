require('dotenv').config();
const express = require('express');
const { connectDatabase, getCollection } = require('./db');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.type('html').send(`
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Week13 Node.js Demo</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 40px;">
        <h1>Week13 Node.js Demo</h1>
        <p>This demo shows:</p>
        <ul>
          <li>Installation and configuration with Node.js and Express</li>
          <li>Callback-based async code</li>
          <li>Event loop ordering behavior</li>
          <li>Express REST API routes</li>
          <li>MongoDB application integration</li>
        </ul>
        <h2>Available routes</h2>
        <ul>
          <li><a href="/callbacks">/callbacks</a> - callback example</li>
          <li><a href="/event-loop">/event-loop</a> - event loop example</li>
          <li><a href="/students">/students</a> - list students</li>
          <li>/students/:id - get a single student by MongoDB ID</li>
        </ul>
        <p>If MongoDB is not running, the student routes will return a database error.</p>
      </body>
    </html>
  `);
});

app.get('/callbacks', (req, res) => {
  function delayedMessage(name, callback) {
    setTimeout(() => {
      callback(null, `Hello, ${name}! This response uses a callback.`);
    }, 500);
  }

  delayedMessage('Student', (error, message) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({ message });
  });
});

app.get('/event-loop', (req, res) => {
  const order = [];

  order.push('start');

  setTimeout(() => {
    order.push('timeout callback');
  }, 0);

  Promise.resolve().then(() => {
    order.push('promise callback');
  });

  process.nextTick(() => {
    order.push('nextTick callback');
  });

  order.push('end');

  res.json({
    note: 'The event loop processes nextTick and promise microtasks before timers.',
    order
  });
});

app.get('/students', async (req, res) => {
  try {
    const collection = await getCollection('students');
    const students = await collection.find().toArray();
    res.json({ students });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/students', async (req, res) => {
  try {
    const collection = await getCollection('students');
    const student = {
      name: req.body.name || 'Unknown',
      course: req.body.course || 'Node.js',
      createdAt: new Date()
    };
    const result = await collection.insertOne(student);
    res.status(201).json({ insertedId: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/students/:id', async (req, res) => {
  try {
    const { ObjectId } = require('mongodb');
    const collection = await getCollection('students');
    const student = await collection.findOne({ _id: new ObjectId(req.params.id) });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ student });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

connectDatabase()
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(port, () => {
      console.log(`Express app running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB");
    console.error(error.message);
  });
