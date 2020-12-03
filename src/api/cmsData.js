
//const SERVER = 'https://5jureropof.execute-api.eu-west-1.amazonaws.com/Prod/';
// https://api.techtuga.net/cms/
//const SERVER = 'http://localhost:8080/';
const SERVER = 'https://api.techtuga.net/cms/';

export const getAllArticles = (callback) => {

 fetch(SERVER+'retrieve/cms/ARTICLE')
    .then(response => response.json())
    .then(data => callback(null,data))
    .catch((error) => callback(error));
}


export const getArticles = async () => {
    const result = await fetch(SERVER+'retrieve/cms/ARTICLE')    
    console.log(result) 
    return await result.json()
}

export const getPages = async () => {
    const result = await fetch(SERVER+'retrieve/cms/PAGE')     
    return await result.json()
}

export const getItem = async (type,id) => {
    const result = await fetch(SERVER+'retrieve/cms/'+type+'/'+id)     
    return await result.json()
}


export const getItemByGuid = async (guid) => {
    const result = await fetch(SERVER+'guid/cms/'+guid)     
    return await result.json()
}