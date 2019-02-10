var List = require("../models/List");
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'Please login first');
    res.redirect("/login");
};

middlewareObj.checkListOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
    List.findById(req.params.id, function(err, list) {
        if(err) {
            res.redirect("back");
        } else {
            if(list !== null && list.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("back");
            }
        }
    });
    } else {
        req.flash('error', 'Please login first');
        res.redirect("/login");
    }
};

module.exports = middlewareObj;