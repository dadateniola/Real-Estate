//Route handlers
const showSignPage = async (req, res) => {
    res.render('sign');
}

const show404 = (req, res) => {
    res.render('404');
}

module.exports = {
    showSignPage, show404,
};