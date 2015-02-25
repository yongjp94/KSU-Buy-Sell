'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Comment = mongoose.model('Comment'),
	_ = require('lodash');

/**
 * Create a article
 */
exports.create = function(req, res) {
	var comment = new Comment(req.body);
	comment.user = req.user;

	comment.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(comment);
		}
	});
};

/**
 * Show the current article
 */
exports.read = function(req, res) {
	res.json(req.comment);
};

/**
 * Update a article
 */
exports.update = function(req, res) {
	var comment = req.comment;

	comment = _.extend(comment, req.body);

	comment.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(comment);
		}
	});
};

/**
 * Delete an article
 */
exports.delete = function(req, res) {
	var comment = req.comment;

	comment.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(comment);
		}
	});
};

/**
 * List of Articles
 */
exports.list = function(req, res) {
	Article.find().sort('-created').populate('user', 'displayName').exec(function(err, articles) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(articles);
		}
	});
};

/**
 * Article middleware
 */
exports.articleByID = function(req, res, next, id) {
	Article.findById(id).populate('user', 'displayName').exec(function(err, article) {
		if (err) return next(err);
		if (!article) return next(new Error('Failed to load article ' + id));
		req.article = article;
		next();
	});
};

/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.article.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};