import axios from "axios";


const searchImages = async (term) => {

    var list = "";

    const response = await axios.get(`https://www.omdbapi.com/?s=${term}&plot=full&apikey=263d22d8`);

    return response.data;

 
};

// const searchImages = async (term) => {
//     const response = await axios.get('https://api.unsplash.com/search/photos/'
//     ,{
//         headers: {
//             Authorization: 'Client-ID YglKYDb0aVjYIyA_d5BwXcZ6yzSktPFdiX6dazytJvw'
//         },
//         params : {
//             query: term
//         }
//     }); 

//     console.log(response.data.results);

//     return response.data.results;
// };

export default searchImages;