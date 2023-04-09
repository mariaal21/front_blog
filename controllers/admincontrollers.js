const { consulta } = require("../helpers/fetch")

//todas las publicaciones del mismo autor (email)

const getArticulos = async (req, res) => {

    const { email, page } = req.params;
    const method = "GET";

    //la ponemos como fija
    const limit = 5;
    const skip = (page - 1) * limit;


    const url = `${process.env.URLBASE}articles/${email}/${limit}/${skip}`;
    
    try {
      const response = await consulta(url, method);
  
      if (response.ok) {
        const entries = response.entries;
        res.render("admin/articulosAdmin", { entries, email });
      } else {
        throw response.msg;
      }
    } catch (error) {
      console.log(error);
      res.render("admin/articulosAdmin", { error, email });
    }
  };
  

//solo una publicacion 
const getArticulo = async (req, res) => {
    const { title, email } = req.params;
    const method = "GET";
    const url = `${process.env.URLBASE}article/${title.replaceAll("_", " ")}/${email}`;
  
    try {
      const response = await consulta(url, method);
  
      if (response.ok) {
        const entry = response.entry[0];
        res.render("admin/articuloAdmin", { entry, email });
      } else {
        throw response.msg;
      }
    } catch (error) {
      console.log(error);
      res.render("admin/articuloAdmin", { error, email });
    }
  };
  

//render form to create new entry
const nuevoArticulo = (req, res) => {
    const { email } = req.params
    res.render("admin/nuevoForm", { email });
};

//create new entry
const crearArticulo = async (req, res) => {
    const { email } = req.params;
    const body = req.body;
    body.image = req.file.filename;
    const method = "POST";
    const urlEnd = `create/${email}`;

    try {
        const data = await consulta(`${process.env.URLBASE}${urlEnd}`, method, body);

        if (data.ok) {
            res.redirect(`admin/nuevoForm/${email}`);
        } else {
            throw data.errors;
        }
    } catch (error) {
        res.render("admin/nuevoForm", { email, error });
    }
};

const actualizarArticuloform = async (req, res) => {
    const { title, email } = req.params;
    const method = "GET";
    const urlEnd = `entry/${title.replaceAll("_", " ")}/${email}`;

    try {
        const { entry } = await consulta(`${process.env.URLBASE}${urlEnd}`, method);
        res.render("admin/actualizarForm", {
            entry: entry[0],
            email
        });
    } catch (error) {
        res.render("admin/actualizarForm", {
            mistake: error,
            email
        });
    }
};


const actualizarArticulo = async (req, res) => {

    const { title, email } = req.params;
    const urlEnd = `update/${title.replaceAll("_", " ")}/${email}`
    const method = "PUT"
    try {
        const body = req.body;
        body.image = req.file.filename
   
        data = await consulta(`${process.env.URLBASE}${urlEnd}`, method, body);
        if (!data.ok) {
            throw data.errors
        } else {
            res.redirect(`/admin/articulo/${email}/1`)
        }
    } catch (error) {
        console.log(error)
        res.render("admin/actualizarForm", {
            error,
            email,
            title
        });
    }
};

const eliminarArticulo = async (req, res) => {
    const { title, email } = req.params;
    const url = `${process.env.URLBASE}delete`;
    const method = "DELETE";
    const body = { title, author: email };
    
    try {
      const response = await consulta(url, method, body);
      
      if (response.ok) {
        res.redirect(`/admin/articulo/${email}/1`);
      } else {
        throw response.msg;
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok: false, msg: "Error deleting entry" });
    }
  };
  

module.exports =
{
    getArticulos,
    getArticulo,
    crearArticulo,
    nuevoArticulo,
    actualizarArticuloform,
    actualizarArticulo,
    eliminarArticulo
}