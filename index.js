const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/products');
const { db, findByIdAndUpdate } = require('./models/products');
const methodOverride = require('method-override')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/farmStand')
        .then(() => {
            console.log('Mongo is connected on port 27017')
        })
}

const category = ['fruit', 'vegetables', 'dairy']

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.redirect('products')
})

app.get('/products', async (req, res) => {
    const products = await Product.find({})
    res.render('products/index', { products })
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params

    const products = await Product.findById(id)

    res.render('products/show', { products })

})

app.get('/new', (req, res) => {
    res.render('products/new', { category })
})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params
    const products = await Product.findById(id)
    res.render('products/edit', { products, category })
})

app.patch('/products/:id/edit', async (req, res) => {
    const { id } = req.params
    const products = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/products/${products._id}`)
})

app.delete('/products/:id/delete', async (req, res) => {
    const { id } = req.params
    await Product.findByIdAndDelete(id)
    res.redirect(`/products/`)
})

app.get('/products/:id/delete', async (req, res) => {
    const { id } = req.params
    const products = await Product.findById(id)
    res.render('products/delete', { products })
})

app.listen(3000, () => {
    console.log('express listening on port 3000');
})