exports.notFound = (req, res) => {
    res.status(404).render('404', {title: 'Page not found', path: undefined});
};