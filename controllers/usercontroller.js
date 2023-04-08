const { consulta } = require("../helpers/fetch")

const limit = 5
const skip = 5

//Login 
const LogIn = (req, res) => {
    res.render("views/user/index");
}

const getAllArticulos = async (req, res) => {
        const method = "GET"
        const urlEnd = `all-entries/${limit}/${skip * (req.params.page - 1)}`
        try {
            const data = await consulta(`${process.env.URLBASE}${urlEnd}`, method)

        if (!data.ok) {
            throw data.msg
        }

        //rutas cambiadas
        const entries = data.entries
        res.render("userViews/getAllArticulos", { entries });

    } catch (error) {
        res.render("userViews/getAllArticulos", { error });
    }
}

const getArticulo = async (req, res) => {
    const params = req.params;
    const title = params.title;
    const email = params.email;
    const method = "GET";
    const urlEnd = `entry/${title.replaceAll("_", " ")}/${email}`;
    let data;

    try {
        data = await consulta(`${process.env.URLBASE}${urlEnd}`, method);

        if (!data.ok) {
            throw data.msg
        }

        const entry = data.entry[0]
        res.render("userViews/showDetailView", { entry });

    } catch (error) {
        res.render("userViews/showDetailView", { error });
    }
}

const searchArticulosForm = (req, res) => {
    res.render("userViews/searchForm");
}

const searchArticulo = async (req, res) => {
    const search = req.body.search
    const method = "GET"
    const urlEnd = `search/${search}/${limit}/${skip * (req.params.page - 1)}`
    let data;

    try {
        data = await consulta(`${process.env.URLBASE}${urlEnd}`, method);

        if (!data.ok) {
            throw data.msg
        }

        const entries = data.entries
        res.render("userViews/searchResults", { entries, search });

    } catch (error) {
        res.render("userViews/searchResults", { error, search });
    }
}

//Login 
const LoginPage = (req, res) => {
    res.render("views/user/login");
    
}

//esta funcion es para comprobar el user
const loginUser = async (req, res) => {
    const method = "POST"
    const body = req.body
    let data;

    try {
        data = await consulta(process.env.URLBASEUSERS, method, body);

        if (!data.ok) {
            throw data.msg
        }

        res.cookie('email', body.email, { http: true, secure: true, sameSite: 'strict', expires: new Date('2023-12-20') })
        res.clearCookie('user')
        req.header.authorization = data.token
        res.redirect("/entries/1")

    } catch (error) {
        res.render("userViews/login-form", { error })
    }
};

const logout = (req, res) => {
    res.clearCookie('email')
    res.redirect("/")
}



module.exports =
{
    getAllArticulos,
    getArticulo,
    searchArticulosForm,
    searchArticulo,
    LoginPage,
    loginUser,
    LogIn,
    logout
}