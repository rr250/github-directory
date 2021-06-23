const Commit = require('../../models/Commit');

module.exports = (app) => {
  app.get('/api/commits/user/:login/repo/:repo', (req, res, next) => {
    Commit.find({
      'url': {
        '$regex': '/' + req.params.login + '/' + req.params.repo + '/',
        '$options': 'i'
      }
    }).sort({ "commit.committer.date": -1 })
      .exec()
      .then((commit) => res.json(commit))
      .catch((err) => next(err));
  });

  app.post('/api/commits', function (req, res, next) {
    const commit = new Commit();

    commit.save()
      .then(() => res.json(commit))
      .catch((err) => next(err));
  });
}