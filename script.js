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

    // Create the Remove button
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.textContent = 'Remove Product';
    removeButton.classList.add('remove-product');
    
    // Add event listener to remove the product item
    removeButton.addEventListener('click', function() {
        productContainer.removeChild(newProductItem);
    });

    // Append the label, select, input, and remove button to the new product item div
    newProductItem.appendChild(productLabel);
    newProductItem.appendChild(productSelect);
    newProductItem.appendChild(quantityLabel);
    newProductItem.appendChild(quantityInput);
    newProductItem.appendChild(removeButton);
    
    // Append the new product item to the product container
    productContainer.appendChild(newProductItem);
});

document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form data
    
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
            case 'chicken rice': price = 90; break;
            case 'chicken noodles': price = 90; break;
            case 'beef rice': price = 120; break;
            case 'beef noodles': price = 120; break;
            case 'boneless chicken': price = 100; break;
            case 'peper chicken': price = 130; break;
            case 'chilli chicken': price = 130; break;
            case 'chettinad chicken': price = 140; break;
            case 'chicken 65': price = 60; break;
            case 'gobi 65': price = 60; break;
            case 'mashroom 65': price = 60; break;
            case 'veg rice': price = 70; break;
            case 'veg noodles': price = 70; break;
            case 'egg rice': price = 80; break;
            case 'egg noodles': price = 80; break;
            case 'mashroom rice': price = 90; break;
            case 'mashroom noodles': price = 90; break;
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

    // Create Delete button to delete the order
    const deleteButton = `<button type="button" id="deleteOrderButton">Delete Order</button>`;

    // Display order summary with Delete button
    const summary = ` 
        <h3>Order Summary</h3>
        
        ${orderDetails}
        <p><strong>Total Price: ₹${totalPrice.toFixed(2)}</strong></p>
        ${deleteButton}
    `;
    document.getElementById('orderSummary').innerHTML = summary;

    // Attach event listener to delete the order when the delete button is clicked
    document.getElementById('deleteOrderButton').addEventListener('click', function() {
        document.getElementById('orderSummary').innerHTML = ''; // Clear the order summary
    });
});

