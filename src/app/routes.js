const banco = require("./models/banco");

module.exports = (app, passport) => {

	// index routes
	app.get('/', (req, res) => {
		res.render('index');
	});

	//login view
	app.get('/login',(req, res) => {
		res.render('login.ejs', {
			message: req.flash('loginMessage')
		});
	});

	app.post('/adtarge', passport.authenticate('local-adtarge', {
		successRedirect: '/profile',
		failureRedirect: '/adtarge',
		failureFlash: true
	}));

	app.get('/adtarge', isLoggedIn, (req, res) => {
        res.render('adtarge', {
            user: req.user,
            message: req.flash('adtargeMessage')
        });
    });

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	// signup view
	app.get('/signup', (req, res) => {
		res.render('signup', {
			message: req.flash('signupMessage')
		});
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true // allow flash messages
	}));

	//profile view
/*	app.get('/profile', async(req, res) => {
		const targers =  await targeta.find({})
		console.log(targers);
		res.render('profile', {
			targers
		});
	});*/

	app.get('/profile' ,isLoggedIn, (req, res) => {
		//const targers =  banco.targe.find({})
		//console.log(targers);
		res.render('profile', {

			user: req.user
		});
	});

	

	// logout
	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});
};

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
}

