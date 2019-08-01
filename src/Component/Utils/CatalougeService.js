import axios from 'axios';

let access_token = "1a9203628b2341df9fe5c2a9d31e7dd1";

const CatalougeService = {

    getProductList() {
        const encodedURI = window.encodeURI("/proxy/api/products/" + "?access_token=" + access_token)

        return axios({
            "method": "GET",
            "url": encodedURI,
            "headers": {
                "Content-Type": "application/json",
                "Server": "CATALOUGE"
            }
        })
            .then(function (response) {
                return response.data
            })
    },

    getImageList() {
        const encodedURI = window.encodeURI("/proxy/api/images/" + "?access_token=" + access_token)

        return axios({
            "method": "GET",
            "url": encodedURI,
            "headers": {
                "Content-Type": "application/json",
                "Server": "CATALOUGE"
            }
        })
            .then(function (response) {
                return response.data
            })
    },

    getImageCount() {
        const encodedURI = window.encodeURI("/proxy/api/images/count" + "?access_token=" + access_token)

        return axios({
            "method": "GET",
            "url": encodedURI,
            "headers": {
                "Content-Type": "application/json",
                "Server": "CATALOUGE"
            }
        })
            .then(function (response) {
                return response.data
            })
    }
}

export default CatalougeService;