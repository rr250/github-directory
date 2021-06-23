const fetch = require('node-fetch');
const User = require('../../models/User');
const Repo = require('../../models/Repo');
const config = require('../../../config/config');
var MongoClient = require('mongodb').MongoClient;
var url = config.url;
var github = config.github;

insertUser = (user) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("db");
    dbo.collection("users").insertOne(user, function (err, res) {
      if (err) throw err;
      // console.log("1 document inserted");
      // console.log(res);
      db.close();
    });
  });
}

insertRepos = (repos) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("db");
    dbo.collection("repos").insertMany(repos, function (err, res) {
      if (err) throw err;
      // console.log("documents inserted");
      // console.log(res);
      db.close();
    });
  });
}

insertCommits = (commits) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("db");
    dbo.collection("commits").insertMany(commits, function (err, res) {
      if (err) throw err;
      console.log("documents inserted");
      console.log(res);
      db.close();
    });
  });
}

getRepoCount = (login) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("db");
    console.log(login)
    dbo.collection("repos").countDocuments({ 'owner.login': login }, function (err, res) {
      if (err) throw err;
      db.close();
      console.log(res)
      return res;
    });
  });
}

module.exports = (app) => {
  app.get('/api/users', (req, res, next) => {
    User.find()
      .exec()
      .then((users) => {
        return res.json(users);
      })
      .catch((err) => next(err));
  });

  app.post('/api/users', function (req, res, next) {
    const user = new User();
    user.save()
      .then(() => res.json(user))
      .catch((err) => next(err));
  });

  app.get('/api/users/:login', (req, res, next) => {
    User.findOne({ login: req.params.login })
      .exec()
      .then((user) => {
        if (user == null) {
          let obj = {
            headers: {
              'Authorization': github,
            },
          }
          fetch('https://api.github.com/users/' + req.params.login, obj)
            .then(res => res.json())
            .then(result => {
              if (result.message !== undefined)
                return next(result.message)
              else {
                insertUser(result);
                fetch('https://api.github.com/users/' + req.params.login + '/repos', obj)
                  .then(res => res.json())
                  .then(result => {
                    insertRepos(result);
                    for (let repo of result) {
                      // console.log(repo)
                      fetch('https://api.github.com/repos/' + req.params.login + '/' + repo.name + '/commits', obj)
                        .then(res => res.json())
                        .then(result => {
                          console.log(result)
                          if (result.message === undefined)
                            insertCommits(result);
                        })
                        .catch((err) => next(err));
                    }
                  })
                  .catch((err) => next(err));
                return res.json(result);
              }
            })
            .catch((err) => next(err));
        }
        else
          return res.json(user);
      })
      .catch((err) => next(err));
  });
}