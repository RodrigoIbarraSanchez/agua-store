document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupEventListeners();
});

// Load all products
async function loadProducts() {
    try {
        const response = await fetch('/api/products');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        showAlert('Error al cargar los productos', 'danger');
    }
}

// Display products in table
function displayProducts(products) {
    const tbody = document.getElementById('productsTableBody');
    tbody.innerHTML = '';

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.stock}</td>
            <td>${product.category}</td>
            <td>
                <button class="btn btn-sm btn-warning btn-action" onclick="editProduct('${product._id}')">Editar</button>
                <button class="btn btn-sm btn-danger btn-action" onclick="deleteProduct('${product._id}')">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Setup event listeners
function setupEventListeners() {
    const saveButton = document.getElementById('saveProduct');
    saveButton.addEventListener('click', saveProduct);

    const addProductModal = document.getElementById('addProductModal');
    addProductModal.addEventListener('hidden.bs.modal', () => {
        document.getElementById('productForm').reset();
        document.getElementById('productId').value = '';
        document.getElementById('modalTitle').textContent = 'Agregar Nuevo Producto';
    });
}

// Save or update product
async function saveProduct() {
    const productId = document.getElementById('productId').value;
    const productData = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        price: parseFloat(document.getElementById('price').value),
        stock: parseInt(document.getElementById('stock').value),
        category: document.getElementById('category').value
    };

    try {
        const url = productId ? `/api/products/${productId}` : '/api/products';
        const method = productId ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });

        if (!response.ok) throw new Error('Error en la operación');

        bootstrap.Modal.getInstance(document.getElementById('addProductModal')).hide();
        showAlert(productId ? 'Producto actualizado con éxito' : 'Producto creado con éxito', 'success');
        loadProducts();
    } catch (error) {
        showAlert('Error al guardar el producto', 'danger');
    }
}

// Edit product
async function editProduct(id) {
    try {
        const response = await fetch(`/api/products/${id}`);
        const product = await response.json();

        document.getElementById('productId').value = product._id;
        document.getElementById('name').value = product.name;
        document.getElementById('description').value = product.description;
        document.getElementById('price').value = product.price;
        document.getElementById('stock').value = product.stock;
        document.getElementById('category').value = product.category;

        document.getElementById('modalTitle').textContent = 'Editar Producto';
        new bootstrap.Modal(document.getElementById('addProductModal')).show();
    } catch (error) {
        showAlert('Error al cargar el producto', 'danger');
    }
}

// Delete product
async function deleteProduct(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) return;

    try {
        const response = await fetch(`/api/products/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Error al eliminar');

        showAlert('Producto eliminado con éxito', 'success');
        loadProducts();
    } catch (error) {
        showAlert('Error al eliminar el producto', 'danger');
    }
}

// Show alert message
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 3000);
}