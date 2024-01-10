//Route handlers
const showHomePage = async (req, res) => {
    res.render('home');
}

const show404 = (req, res) => {
    res.render('404');
}

module.exports = {
    showHomePage, show404,
};