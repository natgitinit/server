const passport = require('passport');
const jwt = require('passport-jwt')

/* PASSPORT Routes SETUP */

module.exports = (app) => {

    app.get("/login/success", (req, res) => {
        if(req.user) {
            res.json({
                success: true, 
                message: "user has successfully authenticated",
                user: req.user, 
                cookies: req.cookies
            });
        }
    });

    app.get("login/failed", (req, res) => {
        res.status(401).json({
            success: false,
            message: "user failed to authenticate."
        });
    });

    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/")
    });

    app.get("/auth/google", passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get("/auth/google/callback", 
        passport.authenticate('google', 
        async (req, res, next) => {
            user = req.user
            res.send(user)
            console.log('user', user);
        }
    ));

    app.post('/profile', passport.authenticate('jwt', { sesion: false }), 
        function(req, res) {
            res.send(req.user.profile);
        });

    app.get('/api/current_user', (req, res) => {
        if (req.user) {
            console.log("Current User from the api/current_user");
            console.log('what is the req***', req);
            // res.send(req.user);
        } 
        else {
            res.send('Please login by this URL: http://localhost:3000/auth/google');
        }
    });
}



