//Fetch
const consulta = async (url, method, body = {}) => {


    body = JSON.stringify(body);
    let options = {};

    if (method == 'POST' || method == 'PUT'){
        options = {
            method,
            headers: { 'Content-Type': 'application/json' },
            body
        };
    }
       
        
    if (method == 'DELETE') {
    options = { method }

    };

    try {

        const request = await fetch(url, options);
        const response = await request.json();
   
        
        return {
            ok: true,
            data: response
        };

    } catch (error) {
       
     console.log(error)

    };
};
  


module.exports = { consulta }