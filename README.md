# Student Store Starter Code
📝 `NOTE` Use this template to initialize the contents of a README.md file for your application. As you work on your assignment over the course of the week, update the required or stretch features lists to indicate which features you have completed by changing `[ ]` to `[x]`. (🚫 Remove this paragraph before submitting your assignment.)

## Unit Assignment: Student Store

Submitted by: Moosay Hailewold

Deployed Application (optional): [Student Store Deployed Site](ADD_LINK_HERE)

### Application Features

#### CORE FEATURES

- [X] **Database Creation**: Set up a Postgres database to store information about products and orders.
  - [X]  Use Prisma to define models for `products`, `orders`, and `order_items`.
  - [X]  **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: Use Prisma Studio to demonstrate the creation of your `products`, `orders`, and `order_items` tables. 
- [ ] **Products Model**
  - [X] Develop a products model to represent individual items available in the store. 
  - [X] This model should at minimum include the attributes:
    - [X] `id`
    - [X] `name`
    - [X] `description`
    - [X] `price` 
    - [X] `image_url`
    - [X] `category`
  - [X] Implement methods for CRUD operations on products.
  - [X] Ensure transaction handling such that when an product is deleted, any `order_items` that reference that product are also deleted. 
  - [ ] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: Use Prisma Studio to demonstrate the creation of all attributes (table columns) in your Products Model.
- [ ] **Orders Model**
  - [X] Develop a model to manage orders. 
  - [X] This model should at minimum include the attributes:
    - [X] `order_id`
    - [X] `customer_id`
    - [X] `total_price`
    - [X] `status`
    - [X] `created_at`
  - [X] Implement methods for CRUD operations on orders.
  - [X] Ensure transaction handling such that when an order is deleted, any `order_items` that reference that order are also deleted. 
  - [X] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: Use Prisma Studio to demonstrate the creation of all attributes (table columns) in your Order Model.

- [ ] **Order Items Model**
  - [X] Develop a model to represent the items within an order. 
  - [X] This model should at minimum include the attributes:
    - [X] `order_item_id`
    - [X] `order_id`
    - [X] `product_id`
    - [X] `quantity`
    - [X] `price`
  - [X] Implement methods for fetching and creating order items.  
  - [ ] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: Use Prisma Studio to demonstrate the creation of all attributes (table columns) in your Order Items Model.
- [ ] **API Endpoints**
  - [ ] Application supports the following **Product Endpoints**:
    - [X] `GET /products`: Fetch a list of all products.
    - [X] `GET /products/:id`: Fetch details of a specific product by its ID.
    - [X] `POST /products`: Add a new product to the database.
    - [X] `PUT /products/:id`: Update the details of an existing product.
    - [X] `DELETE /products/:id`: Remove a product from the database.
  - [X] Application supports the following **Order Endpoints**:
    - [X] `GET /orders`: Fetch a list of all orders.
    - [X] `GET /orders/:order_id`: Fetch details of a specific order by its ID, including the order items.
    - [X] `POST /orders`: Create a new order with specified order items.
    - [X] `PUT /orders/:order_id`: Update the details of an existing order (e.g., change status).
    - [X] `DELETE /orders/:order_id`: Remove an order from the database.
    - [X] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: Use Postman or another API testing tool to demonstrate the successful implementation of each endpoint. For the `DELETE` endpoints, please use Prisma Studio to demonstrate that any relevant order items have been deleted. 
- [ ] **Frontend Integration**
  - [X] Connect the backend API to the provided frontend interface, ensuring dynamic interaction for product browsing, cart management, and order placement. Adjust the frontend as necessary to work with your API.
  - [X] Ensure the home page displays products contained in the product table.
  - [X] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: Use `npm start` to run your server and display your website in your browser. 
    - [X] Demonstrate that users can successfully add items to their shopping cart, delete items from their shopping cart, and place an order
    - [X] After placing an order use Postman or Prisma Studio demonstrate that a corresponding order has been created in your orders table.

### Stretch Features

- [ ] **Added Endpoints**
  - [X] `GET /order-items`: Create an endpoint for fetching all order items in the database.
  - [X] `POST /orders/:order_id/items` Create an endpoint that adds a new order item to an existing order. 
- [ ] **Past Orders Page**
  - [ ] Build a page in the UI that displays the list of all past orders.
  - [ ] The page lists all past orders for the user, including relevant information such as:
    - [ ] Order ID
    - [ ] Date
    - [ ] Total cost
    - [ ] Order status.
  - [ ] The user should be able to click on any individual order to take them to a separate page detailing the transaction.
  - [ ] The individual transaction page provides comprehensive information about the transaction, including:
    - [ ] List of order items
    - [ ] Order item quantities
    - [ ] Individual order item costs
    - [ ] Total order cost
- [ ] **Filter Orders**.
  - [X] Create an input on the Past Orders page of the frontend application that allows the user to filter orders by the email of the person who placed the order. 
  - [X] Users can type in an email and click a button to filter the orders.
  - [X] Upon entering an email address adn submitting the input, the list of orders is filtered to only show orders placed by the user with the provided email. 
  - [X] The user can easily navigate back to the full list of ordres after filtering. 
    - [X] Proper error handling is implemented, such as displaying "no orders found" when an invalid email is provided.
- [ ] **Deployment**
  - [ ] Website is deployed using [Render](https://courses.codepath.org/snippets/site/render_deployment_guide).
  - [ ] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: To ease the grading process, please use the deployed version of your website in your walkthrough with the URL visible. 



### Walkthrough Video


<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/99fda7a08ea04181aaa7364c2685cbc6?sid=75fd65ad-3ffa-404d-8ac7-c10ccf1196e8" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

https://www.loom.com/share/534558bca10e49619f93eef51acce2b4?sid=078a6cfc-e746-4e87-ad27-be4ac0df953d

### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

Yes but I didn't do the last lab, so I struggled a bit. I also think the project descirption were not the best

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
I would implement more of the stretch features.

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?


I struggled a lot with prisma and understanding backened

### Open-source libraries used

- Add any links to open-source libraries used in your project.

### Shout out

Give a shout out to somebody from your cohort that especially helped you during your project. This can be a fellow peer, instructor, TA, mentor, etc.

Thank you everyone.



