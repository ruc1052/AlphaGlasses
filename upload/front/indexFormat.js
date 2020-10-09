const fs = require('fs');
const path = require('path');

const HTML = () => {
  const directoryPath = path.join(__dirname, '../users');
  let users = fs.readdirSync(directoryPath);
  let userListHTML = "";
  users.forEach(user => userListHTML = `${userListHTML} <li><a href="/user/${user}">${user}</a></li>`);

  return `
  <html>
    <head>
      <meta charset="utf-8">
      <link rel="stylesheet" href="../static/style.css">
    </head>
    <body class="container">
      ${userListHTML}
      <form action="./api/addUser" method="post">
          <input type="text" name="name" id="name">
          <input type="submit">
      </form>
    </body>
  </html>
  `;
}

module.exports = {
  HTML
}