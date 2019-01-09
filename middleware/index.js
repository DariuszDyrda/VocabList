var List = require("../models/List");
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
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
        res.redirect("/login");
    }
};

module.exports = middlewareObj;