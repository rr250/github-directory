const Repo = require('../../models/Repo');

module.exports = (app) => {
  app.get('/api/repos/user/:login', (req, res, next) => {
    Repo.find({ 'owner.login': req.params.login }).sort({ created_at: -1 })
      .exec()
      .then((repo) => res.json(repo))
      .catch((err) => next(err));
  });

  app.post('/api/repos', function (req, res, next) {
    const repo = new Repo();

    repo.save()
      .then(() => res.json(repo))
      .catch((err) => next(err));
  });
}