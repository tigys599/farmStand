const mongoose = require('mongoose');
const Product = require('./models/products')

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/farmStand')
        .then(() => {
            console.log('Mongo is connected on port 27017')
        })
}

// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 1.25,
//     category: 'fruit'
// })

// p.save()
//     .then(p => {
//         console.log(p);
//     })
//     .catch(e => {
//         console.log(e);
//     })

const arr = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetables'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetables'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy'
    },
]

Product.insertMany(arr)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err)
    })