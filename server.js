const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const users = [];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Find the user with the matching username and password
  const user = users.find(
    u => u.username === username && u.password === password
  );
  if (user) {
    // Return the user object if the login is successful
    res.json({ success: true, user });
  } else {
    // Return an error if the login is unsuccessful
    res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  // Check if the username is already taken
  if (users.find(u => u.username === username)) {
    res.status(400).json({ success: false, message: 'Username is already taken' });
  } else {
    // Add the new user to the list of users
    const user = { username, password };
    users.push(user);
    res.json({ success: true, user });
  }
});

app.listen(3002, () => {
  console.log('Server listening on port 3002');
});
