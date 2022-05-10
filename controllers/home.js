const HomeController = {
  Index: (req, res) => {
     res.render("home/index", { title: "Foodies" , user: req.session.user });
  }
}

module.exports = HomeController;