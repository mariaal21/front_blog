const { response } = require("express");
const { consulta } = require("../helpers/fetch")

const limit = 5
const skip = 5

//Login 
const LogIn = (req, res) => {
    res.render("user/index");
}

const getAllArticulos = async (req, res) => {
        const {page} =req.params
        const method = "GET"
        const urlEnd = `allArticles/${limit}/${skip * (page - 1)}`
        try {
            const response = await consulta(`${process.env.URLBASE}${urlEnd}`, method)
       
        if (!response.ok) {
            console.log("hola")
        }

        // console.log(data)
        const articles = response.articles
        res.render("user/articulos", { articles });
       

    } catch (error) {
        res.render("user/articulos", { error });
    }
}

const getArticulo = async (req, res) => {
    const params = req.params;
    const title = params.title;
    const email = params.email;
    const method = "GET";
    const urlEnd = `articles/${title.replaceAll("_", " ")}/${email}`;
    let data;

    try {
        data = await consulta(`${process.env.URLBASE}${urlEnd}`, method);

        if (!data.ok) {
            throw data.msg
        }

        const entry = data.entry[0]
        res.render("user/vistaDetalle", { entry });

    } catch (error) {
        res.render("user/vistaDetalle", { error });
    }
}

const searchArticulosForm = (req, res) => {
    res.render("user/barraBuscar");
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
        res.render("user/busqueda", { entries, search });

    } catch (error) {
        res.render("user/busqueda", { error, search });
    }
}

//Login 
const LoginPage = (req, res) => {
    res.render("user/login");
    
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


    } catch (error) {
        res.render("user/formularioInicio", { error })
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

