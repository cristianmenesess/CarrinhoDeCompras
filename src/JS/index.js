let cartItems = [];
let cartTotal = 0;

function addToCart(productName, valor) {
    cartItems.push({ productName, valor });
    cartTotal += valor;
    updateCart();
}

function removeFromCart(index) {
    const removedItem = cartItems.splice(index, 1)[0];
    cartTotal -= removedItem.valor;
    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    // Limpa o conteúdo do carrinho
    cartItemsContainer.innerHTML = '';

    // Adiciona os itens ao carrinho
    cartItems.forEach((item, index) => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <div>${item.productName}</div>
            <div>$${item.valor.toFixed(2)}</div>
            <button onclick="removeFromCart(${index})">Remover</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });

    // Atualiza o valor total
    cartTotalElement.textContent = `Total: $${cartTotal.toFixed(2)}`;
}

function completePurchase() {
    alert('Compra concluída! Total: $' + cartTotal.toFixed(2));

    // Exibe a mensagem de compra concluída
    const purchaseMessage = document.getElementById('purchase-message');
    purchaseMessage.style.display = 'block';

    // Reinicia o site após um curto intervalo (1 segundo)
    setTimeout(() => {
        location.reload();
    }, 5000);

}

// CUPONS

let couponApplied = false; // Adiciona uma variável para controlar se o cupom já foi aplicado

function applyCoupon() {
    const couponInput = document.getElementById('coupon');
    const couponCode = couponInput.value.trim().toLowerCase();

    if (!couponApplied) {
        if (couponCode === 'bryan10') {
            // Aplica o desconto de 10% para o cupom "Bryan10"
            const discount = cartTotal * 0.1;
            cartTotal -= discount;

            // Exibe a mensagem de cupom aplicado
            document.getElementById('coupon-applied').style.display = 'block';
            document.getElementById('discount-amount').textContent = `- Desconto: $${discount.toFixed(2)}`;
            document.getElementById('discount-amount').style.display = 'block';
        } else if (couponCode === 'toretto20') {
            // Aplica o desconto de 20% para o cupom "Toretto20"
            const discount = cartTotal * 0.2;
            cartTotal -= discount;

            // Exibe a mensagem de cupom aplicado
            document.getElementById('coupon-applied').style.display = 'block';
            document.getElementById('discount-amount').textContent = `- Desconto: $${discount.toFixed(2)}`;
            document.getElementById('discount-amount').style.display = 'block';
        } else {
            // Cupom inválido
            alert('Cupom inválido ou inexistente.');
            return; // Retorna para evitar a aplicação do cupom inválido
        }

        // Atualiza a variável indicando que o cupom foi aplicado
        couponApplied = true;

        // Atualiza o carrinho após aplicar o cupom
        updateCart();
    } else {
        // Mensagem se o cupom já foi aplicado
        alert('Você já aplicou um cupom nesta compra.');
    }
}

