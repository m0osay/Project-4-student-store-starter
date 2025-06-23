const prisma = require("../models/prismaClient");

//GET all orders from our database
exports.getAll = async (req, res) => {
  
   const orders = await prisma.order.findMany()
    res.json(orders)

};

//Get a specifc order by id
exports.getById = async (req, res) => {
  const id = Number(req.params.id);
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) {
    //if order with that specific id doesnt exist
    return res.status(404).json({ error: "Not found" });
  }
  res.json(order);
};


// model Order {
//   id              Int      @id @default(autoincrement())
//   customer        String
//   total           Float
//   status          String
//   createdAt       DateTime @default(now())
// }




//Post a order
exports.create = async (req, res) => {
  const { customer, total, status, createdAt } = req.body; //our input
  const neworder = await prisma.order.create({
    //syntax for creating newProdcut
    data: { customer, total, status, createdAt},
  });
  res.status(201).json(neworder); //successfual entry
};

//Update a order

exports.update = async (req, res) => {
  const id = Number(req.params.id);
  const { customer, total, status, createdAt } = req.body; //our input
  const updatedorder = await prisma.order.update({
    where: { id },
    data: { customer, total, status, createdAt}, //reaplce the data
  });

  res.json(updatedorder);

};

//Remove a prodcut
exports.remove = async (req, res) => {
  const id = Number(req.params.id);
  await prisma.order.delete({ where: { id } });
  res.status(204).end(); //successful removal
};
