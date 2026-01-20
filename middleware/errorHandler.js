const errorHandler = {};

errorHandler.handleErrors = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'An unexpected error occurred';

    console.error(`Error ${status}: ${message}`);

    res.status(status);
    res.render('errors/error', {
        title: status === 404 ? 'Page Not Found' : 'Server Error',
        message: message,
        status: status,
        nav: ''
    });
};

errorHandler.handle404 = (req, res, next) => {
    const error = new Error('Sorry, we could not find that page.');
    error.status = 404;
    next(error);
};

module.exports = errorHandler;
