const prisma = require("../models/prismaClient");

//GET all products from our database
exports.getAll = async (req, res) => {
  const sortIdentifer = req.query.sort ?? ""; //for price and name
  const sortCategory = req.query.category ?? ""; //what category to sort by
  //query sorts in a key-value, so we can do req.query.sort to acces the value of the sort, in this case which is price and name.

  let orderBy;
  if(sortIdentifer){
    const directionOfOrder = sortIdentifer.startsWith("<")
    const field = direcLowToHigh ? sortIdentifer.substring(1) : sortIdentifer; //is it price or name
    if (["price", "name"].includes(field)) {      
        orderBy = { [field]: (directionOfOrder ? "asc" : "desc" )}
      }
    }



  
    const categoryFilter = {}
    if (sortCategory) categoryFilter.category = sortCategory

   const products = await prisma.product.findMany({ where: categoryFilter, orderBy }) //the key word where tellz us what filter to use in this case {price : 'asc' || 'dsc'}
    res.json(products)

};

//Get a specifc product by id
exports.getById = async (req, res) => {
  const id = Number(req.params.id);
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    //if product with that specific id doesnt exist
    return res.status(404).json({ error: "Not found" });
  }
  res.json(product);
};

//   {
//     "id": 1,
//     "name": "College Hoodie",
//     "category": "Apparel",
//     "image_url": "https://tinyurl.com/college-hoodie",
//     "description": "Comfortable and stylish hoodie with the college logo.",
//     "price": 29.99
//   },

//Post a product
exports.create = async (req, res) => {
  const { name, category, image_url, description, price } = req.body; //our input
  const newProduct = await prisma.product.create({
    //syntax for creating newProdcut
    data: { name, category, image_url, description, price },
  });
  res.status(201).json(newProduct); //successfual entry
};

//Update a product

exports.update = async (req, res) => {
  const id = Number(req.params.id);
  const { name, category, image_url, description, price } = req.body; //our input
  const updatedProduct = await prisma.product.update({
    where: { id },
    data: { name, category, image_url, description, price }, //reaplce the data
  });

  res.json(updatedProduct);
  //add status for update
};

//Remove a prodcut
exports.remove = async (req, res) => {
  const id = Number(req.params.id);
  await prisma.product.delete({ where: { id } });
  res.status(204).end(); //successful removal
};
