document.getElementById('addProductButton').addEventListener('click', function() {
    const productContainer = document.getElementById('productContainer');
    
    // Get the number of existing product fields
    const productCount = productContainer.children.length + 1;

    // Create a new product item div
    const newProductItem = document.createElement('div');
    newProductItem.classList.add('product-item');
    
    // Create the product select dropdown
    const productLabel = document.createElement('label');
    productLabel.setAttribute('for', `product${productCount}`);
    productLabel.textContent = 'Select Product:';
    
    const productSelect = document.createElement('select');
    productSelect.setAttribute('id', `product${productCount}`);
    productSelect.setAttribute('name', 'product[]');
    productSelect.required = true;
    
    const options = [
        'Croissant', 'Chocolate Cake', 'Cookies', 'Muffin', 'Bagel', 'Donut', 
        'Cinnamon Roll', 'Apple Pie', 'Brownie', 'Cheese Danish', 'Lemon Cake', 
        'Brioche', 'Scone', 'Tart'
    ];
    
    options.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.textContent = optionText;
        productSelect.appendChild(option);
    });

    // Create the quantity input
    const quantityLabel = document.createElement('label');
    quantityLabel.setAttribute('for', `quantity${productCount}`);
    quantityLabel.textContent = 'Quantity:';
    
    const quantityInput = document.createElement('input');
    quantityInput.setAttribute('type', 'number');
    quantityInput.setAttribute('id', `quantity${productCount}`);
    quantityInput.setAttribute('name', 'quantity[]');
    quantityInput.setAttribute('min', '1');
    quantityInput.required = true;

    // Append the label, select, and input to the new product item div
    newProductItem.appendChild(productLabel);
    newProductItem.appendChild(productSelect);
    newProductItem.appendChild(quantityLabel);
    newProductItem.appendChild(quantityInput);
    
    // Append the new product item to the product container
    productContainer.appendChild(newProductItem);
});

document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form data
    const name = document.getElementById('name').value;
    const seat = document.getElementById('seat').value;
    const products = document.querySelectorAll('[name="product[]"]');
    const quantities = document.querySelectorAll('[name="quantity[]"]');

    let totalPrice = 0;
    let orderDetails = '';

    // Loop through each product in the form and calculate the total price
    products.forEach((product, index) => {
        const productName = product.value;
        const quantity = quantities[index].value;
        
        // Calculate price based on selected product
        let price = 0;
        switch (productName) {
            case 'Croissant': price = 50; break;
            case 'Chocolate Cake': price = 40; break;
            case 'Cookies': price = 35; break;
            case 'Muffin': price = 55; break;
            case 'Bagel': price = 45; break;
            case 'Donut': price = 35; break;
            case 'Cinnamon Roll': price = 65; break;
            case 'Apple Pie': price = 55; break;
            case 'Brownie': price = 60; break;
            case 'Cheese Danish': price = 50; break;
            case 'Lemon Cake': price = 40; break;
            case 'Brioche': price = 55; break;
            case 'Scone': price = 50; break;
            case 'Tart': price = 65; break;
        }

        const productTotal = price * quantity;
        totalPrice += productTotal;

        // Add this product's details to the summary
        orderDetails += `
            <p>Product: ${productName}</p>
            <p>Quantity: ${quantity}</p>
            <p>Price: ₹${productTotal.toFixed(2)}</p>
            <hr>
        `;
    });

    // Display order summary
    const summary = `
        <h3>Order Summary</h3>
        <p>Name: ${name}</p>
        <p>Seat: ${seat}</p>
        ${orderDetails}
        <p><strong>Total Price: ₹${totalPrice.toFixed(2)}</strong></p>
    `;
    document.getElementById('orderSummary').innerHTML = summary;
});
