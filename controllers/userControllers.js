//Route handlers
const showSignPage = async (req, res) => {
    res.render('sign');
}

const showHomePage = async (req, res) => {
    res.render('home');
}

const show404 = (req, res) => {
    res.render('404');
}

module.exports = {
    showSignPage, showHomePage, show404,
};