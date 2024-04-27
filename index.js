document.addEventListener('DOMContentLoaded', function() {
    const productGrid = document.getElementById('productGrid');
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('searchInput');
    const sortOrder = document.getElementById('sortOrder');
    let products = []; // Define products array

    // Fetch products from API and populate product grid
    fetchProducts();

    async function fetchProducts() {
        const response = await fetch('https://fakestoreapi.com/products');
        products = await response.json(); // Assign fetched products to the products array
        displayProducts(products);
        populateCategories(products);
    }

    function displayProducts(products) {
        productGrid.innerHTML = '';
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
            `;
            productGrid.appendChild(productItem);
        });
    }

    function populateCategories(products) {
        const categories = [...new Set(products.map(product => product.category))];
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

    // Filter 
    categoryFilter.addEventListener('change', function() {
        const selectedCategory = this.value;
        if (selectedCategory === 'all') {
            displayProducts(products); // Display 
        } else {
            const filteredProducts = products.filter(product => product.category === selectedCategory);
            displayProducts(filteredProducts);
        }
    });

    // Search 
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        const filteredProducts = products.filter(product =>
            product.title.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    });

    // Sort 
    sortOrder.addEventListener('change', function() {
        const order = this.value;
        const sortedProducts = [...products].sort((a, b) => {
            if (order === 'asc') {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });
        displayProducts(sortedProducts);
    });
});
