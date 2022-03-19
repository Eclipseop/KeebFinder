const axios = require('axios');
const HTMLParser = require('node-html-parser')

const pull = async (url) => {
    const { data } = await axios.get(url);
    const root = HTMLParser.parse(data);

    const products = root.querySelector(".cc-product-list").querySelectorAll(".product-block")

    const productsJson = [];

    for (let product of products) {
        const title = product.querySelector(".product-block__title").rawText.trim();
        const cost = product.querySelector(".theme-money").rawText.trim();

        let image = product.querySelector(".rimage-wrapper ").querySelector("img").attributes['data-src'];
        image = image.substring(2).replace('{width}', '1080')

        productsJson.push({
            title, cost, image
        })
    }
    return productsJson;

}

const getAllPages = async () => {
    const products = [];

    const p1 = await pull('https://kbdfans.com/collections/keycaps');
    p1.forEach((p) => products.push(p))

    for (let i = 2; i < 10; i++) {
        const url = 'https://kbdfans.com/collections/keycaps?page=' + i;
        const data = await pull(url);
        data.forEach((p) => products.push(p))
    }
    console.log(JSON.stringify(products))
}

getAllPages();