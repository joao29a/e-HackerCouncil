/*
 * GET home page.
 */

exports.add = function(req, res) {
  var poll = {
    title: req.body.title,
    author: req.user.emails[0].value,
    description: req.body.description,
    situation: 0
  };
  pollDAO.insert(poll); // <<-- Come from global scope.
  res.redirect('polls');
}

exports.remove = function(req, res) {
  var poll = {
    _id: req.param('id')
  };
  pollDAO.remove(poll);
  res.redirect('polls');
}

exports.vote = function(req,res) {

}

exports.comment = function(req,res) {
  var poll = {
    _id: req.param('id')
  };
  var comment = {
    body: req.param('commentBody'),
    author: req.user.emails[0].value,
    date: Date.now()
  }
  pollDAO.comment(poll,comment);
  res.redirect('polls');
}

exports.list = function(req, res) {
  pollDAO.list(10,function(polls) {
    res.render('polls', {polls: polls, user: req.user});
  });
}
