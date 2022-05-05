const HomeController = {
  Index: (req, res) => {
    // fetch the api if it is there and pass it into the view if it has been bookmarked so as to not lose it.
     res.render("home/index");
  }
}

module.exports = HomeController;