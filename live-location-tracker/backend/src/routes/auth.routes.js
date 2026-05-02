import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"]
    })
);

router.get("/google/callback", passport.authenticate("google", {
        failureRedirect: "/"
        }),
            (req, res) => { res.redirect(process.env.FRONTEND_URL); }
);

router.get("/me", (req, res) => {

    if (!req.user) {
        return res.status(401).json({
        success: false
    });
    }

    res.json({
        success: true,
        user: req.user
    });

});

export default router;