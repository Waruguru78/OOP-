// Product class to store id, name, price, and image
class Product {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}

// ShoppingCartItem class to store product and quantity
class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    // Method to calculate the total price of the shopping cart item
    totalPrice() {
        return this.product.price * this.quantity;
    }
}

// ShoppingCart class to manage the cart
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    // Method to add items to the cart
    addItem(product, quantity) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            const cartItem = new ShoppingCartItem(product, quantity);
            this.items.push(cartItem);
        }
        this.displayCart();
    }

    // Method to remove items from the cart by product id
    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.displayCart();
    }

    // Method to get the total price of all items in the cart
    getTotal() {
        return this.items.reduce((total, item) => total + item.totalPrice(), 0);
    }

    // Method to display cart items
    displayCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';

        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center">Your cart is empty.</td>
                </tr>
            `;
            document.getElementById('cart-total').innerText = 'Total: $0';
            return;
        }

        this.items.forEach(item => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${item.product.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.product.price}</td>
                <td>$${item.totalPrice()}</td>
                <td>
                    <button class="btn btn-sm btn-danger remove-item" data-id="${item.product.id}">Remove</button>
                </td>
            `;

            cartItemsContainer.appendChild(row);
        });

        document.getElementById('cart-total').innerText = `Total: $${this.getTotal()}`;

        // Add event listeners to remove buttons
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = parseInt(button.getAttribute('data-id'));
                this.removeItem(productId);
            });
        });
    }
}

// Create some example products
const products = [
    new Product(1, 'Laptop', 1000, 'laptop.jpg'),
    new Product(2, 'Smartphone', 500, 'smartphone.jpg'),
    new Product(3, 'Headphones', 100, 'headphones.jpg')
];

// Create a shopping cart
const cart = new ShoppingCart();

// Function to display products
function displayProducts() {
    const productList = document.getElementById('product-list');

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-4 col-sm-6 product-card';

        productCard.innerHTML = `
            <div class="card h-100 shadow-sm rounded border-0">
                <img src="${product.image}" class="card-img-top rounded-top product-image" alt="${product.name}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Price: $${product.price}</p>
                    <div class="form-group">
                        <label for="quantity-${product.id}">Quantity</label>
                        <input type="number" class="form-control quantity-input" id="quantity-${product.id}" value="1" min="1">
                    </div>
                    <button class="btn btn-primary mt-auto add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;

        productList.appendChild(productCard);
    });

    // Add event listeners to "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            const quantityInput = document.getElementById(`quantity-${productId}`);
            const quantity = parseInt(quantityInput.value);
            cart.addItem(product, quantity);
        });
    });
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
});
