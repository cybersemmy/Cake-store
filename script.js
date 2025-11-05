
// Cake data
const cakes = [
    {
        id: 1,
        name: "Classic Chocolate Dream",
        price: 45,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop",
        category: "Chocolate",
        rating: 5
    },
    {
        id: 2,
        name: "Strawberry Bliss",
        price: 52,
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&h=500&fit=crop",
        category: "Fruit",
        rating: 5
    },
    {
        id: 3,
        name: "Vanilla Elegance",
        price: 48,
        image: "https://images.unsplash.com/photo-1588195538326-c5b1e5b39f46?w=500&h=500&fit=crop",
        category: "Classic",
        rating: 5
    },
    {
        id: 4,
        name: "Red Velvet Luxe",
        price: 55,
        image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=500&h=500&fit=crop",
        category: "Special",
        rating: 5
    },
    {
        id: 5,
        name: "Lemon Zest Delight",
        price: 50,
        image: "https://images.unsplash.com/photo-1519869325930-281384150729?w=500&h=500&fit=crop",
        category: "Fruit",
        rating: 5
    },
    {
        id: 6,
        name: "Caramel Heaven",
        price: 58,
        image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=500&h=500&fit=crop",
        category: "Special",
        rating: 5
    }
];

// Cart array
let cart = [];

// DOM Elements
const cakesGrid = document.getElementById('cakesGrid');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartOverlay = document.getElementById('cartOverlay');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const cartFooter = document.getElementById('cartFooter');
const totalPrice = document.getElementById('totalPrice');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// Load cakes on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCakes();
    updateCartUI();
});

// Load cakes into grid
function loadCakes() {
    cakesGrid.innerHTML = '';
    
    cakes.forEach(cake => {
        const cakeCard = document.createElement('div');
        cakeCard.className = 'cake-card';
        
        const stars = '<i class="fas fa-star star"></i>'.repeat(cake.rating);
        
        cakeCard.innerHTML = `
            <div class="cake-image-wrapper">
                <img src="${cake.image}" alt="${cake.name}" class="cake-image">
                <div class="cake-category">${cake.category}</div>
            </div>
            <div class="cake-content">
                <h3 class="cake-name">${cake.name}</h3>
                <div class="cake-rating">
                    ${stars}
                </div>
                <div class="cake-footer">
                    <span class="cake-price">$${cake.price}</span>
                    <button class="btn-add-cart" onclick="addToCart(${cake.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        
        cakesGrid.appendChild(cakeCard);
    });
}

// Add item to cart
function addToCart(cakeId) {
    const cake = cakes.find(c => c.id === cakeId);
    if (cake) {
        cart.push(cake);
        updateCartUI();
        openCart();
    }
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const count = cart.length;
    cartCount.textContent = count;
    
    if (count > 0) {
        cartCount.classList.remove('hidden');
    } else {
        cartCount.classList.add('hidden');
    }
    
    // Update cart items
    if (count === 0) {
        cartEmpty.classList.remove('hidden');
        cartFooter.classList.add('hidden');
        cartItems.innerHTML = '';
    } else {
        cartEmpty.classList.add('hidden');
        cartFooter.classList.remove('hidden');
        
        cartItems.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price}</div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            cartItems.appendChild(cartItem);
        });
        
        // Update total price
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        totalPrice.textContent = `$${total}`;
    }
}

// Open cart
function openCart() {
    cartOverlay.classList.add('active');
}

// Close cart
function closeCartSidebar() {
    cartOverlay.classList.remove('active');
}

// Event Listeners
cartBtn.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartSidebar);

cartOverlay.addEventListener('click', (e) => {
    if (e.target === cartOverlay) {
        closeCartSidebar();
    }
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
