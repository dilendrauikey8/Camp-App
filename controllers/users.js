const User = require('../models/user');

module.exports.createUser = (req, res) => {
   res.render('user/register');
}
module.exports.registerUser = async (req, res,next) => {
   try {
      const { username, email, password } = req.body;
      const user = new User({ username, email });
      const registered = await User.register(user, password);
      req.login(registered, err => {
         if (err) return next(err);
         req.flash('success', 'Welcome to camp-tour page');
         res.redirect('/makecamp');
      })
   } catch (err) {
      req.flash('error', err.message);
      res.redirect('/register');
   }
}

module.exports.createLogin = (req,res) =>{
   res.render('user/login');
}
module.exports.postUser = (req, res) => {
   req.flash('success', 'welcome');
   const redUrl = req.session.returnTo || '/makecamp';
   delete req.session.returnTo;
   res.redirect(redUrl);
}

module.exports.userLogout = (req, res, next) => {
   req.logout((err) => {
      if (err) {
         return next(err);
      }
      req.flash('success', "logged-out successfully!");
      res.redirect('/makecamp');
   })

}