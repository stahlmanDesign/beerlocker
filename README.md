#Beer locker — a test building a RESTful Express app with MongoDB

Based on this tutorial:

- http://scottksmith.com/blog/2014/05/02/building-restful-apis-with-node/

- https://github.com/scottksmith95/beerlocker

```
beerlocker/
  models/         // holds our models
    beer.js
    user.js
  node_modules/   // npm packages (auto created by npm)
  package.json    // defines our node app and dependencies
  server.js       // main application logic
  
```

## Use Nodemon

Nodemon is a utility that will monitor for any changes in your source and automatically restart your server.

```npm install -g nodemon```

Now instead of ```node server.js``` use ```nodemon server.js```

When you save a file, server restarts without having to ctrl-c and type ```node server.js``` again.

