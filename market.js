//Productos
const products = [
  { name: 'Remera', price: 4.99, image: '../images/1.png' },
  { name: 'Hoodie', price: 13.99, image: '../images/2.png' },
  { name: 'Gorro', price: 2.99, image: '../images/3.png' },
  { name: 'Taza', price: 1.99, image: '../images/4.png' },
  { name: 'Bufanda', price: 1.99, image: '../images/5.png' },
  { name: 'Mochila', price: 14.99, image: '../images/6.png' }
];

const productContainer = document.querySelector('.contenedorMarket');

//API de dolar blue al día
fetch("https://dolarapi.com/v1/dolares/blue")
  .then(response => response.json())
  .then(data => {
    const compra = data.compra;
    const venta = data.venta;

    document.getElementById('compraBlue').textContent = `${compra}`
    document.getElementById('ventaBlue').textContent = `${venta}`
  })
  .catch(error => {
    console.error(Swal.fire({
      title: 'Algo salió mal...',
      html: '<p class="swaltext">Error al cargar los datos</p>',
      icon: 'error',
      showConfirmButton: true,
      confirmButtonText: 'Ok',
      confirmButtonColor: '#273746',
      timer: 5000,
      timerProgressBar: true,
      allowOutsideClick: false,
      allowEscapeKey: true,
      alowwEnterKey: true,
      background: '#fff',
      customClass: {
        title: 'swaltitle',
      }
    }), error);
  });

//Función para cargar los productos a la página
function renderProducts() {
  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.setAttribute('data-name', product.name);
    productDiv.setAttribute('data-price', product.price);

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;

    const h3 = document.createElement('h3');
    h3.textContent = product.name;

    const p = document.createElement('p');
    p.textContent = `$${product.price}`;

    const button = document.createElement('button');
    button.textContent = 'Agregar al carrito';
    button.classList.add('add-to-cart');

    productDiv.appendChild(img);
    productDiv.appendChild(h3);
    productDiv.appendChild(p);
    productDiv.appendChild(button);
    productContainer.appendChild(productDiv);
  });
}

//LLamada de la función
renderProducts();

//Carrito de compras
let cart = []; 
let total = 0;

function updateCartUI() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  cartItemsContainer.innerHTML = '';

  total = 0;
  
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Borrar';
    removeButton.style.marginLeft = '10px';
    removeButton.onclick = function() {
      removeFromCart(index);
    };

    li.appendChild(removeButton);
    cartItemsContainer.appendChild(li);
    total += item.price * item.quantity;
  });

  cartTotalElement.textContent = total.toFixed(2);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function addToCart(productName, productPrice) {
  const existingProduct = cart.find(item => item.name === productName);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ name: productName, price: productPrice, quantity: 1 });
  }

  updateCartUI();
  showNotification('Producto añadido al carrito');
}

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function() {
    const productElement = this.closest('.product');
    const productName = productElement.getAttribute('data-name');
    const productPrice = parseFloat(productElement.getAttribute('data-price'));

    addToCart(productName, productPrice);
  });
});

function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.className = 'notification2';
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 2000);
}

const btnPay = document.getElementById('pay');

// Evento para el botón de pagar
btnPay.addEventListener('click', () => {
  if (total === 0) {
    Swal.fire({
      title: 'Tu carrito está vacío!',
      html: '<p class="swaltext">Debes seleccionar al menos un producto</p>',
      icon: 'error',
      showConfirmButton: true,
      confirmButtonText: 'Ok',
      confirmButtonColor: '#273746',
      timer: 5000,
      timerProgressBar: true,
      allowOutsideClick: false,
      allowEscapeKey: true,
      alowwEnterKey: true,
      background: '#fff',
      customClass: {
        title: 'swaltitle',
      }
    });
  } else {
    Swal.fire({
      title: 'Confirmar comprar',
      html: `<p class="swaltext">Estas por realizar un pago de <span class="swaltext2">$${total}</span> por los productos seleccionados</p>`,
      icon: 'question',
      allowOutsideClick: false,
      allowEscapeKey: true,
      alowwEnterKey: true,
      showCancelButton: true,
      confirmButtonText: 'Confirmar comprar',
      confirmButtonColor: '#273746',
      cancelButtonText: 'Cancelar',
      background: '#fff',
      customClass: {
        title: 'swaltitle',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Compra exitosa!',
          html: '<p class="swaltext">Muchas gracias por adquirir nuestros productos</p>',
          icon: 'success',
          timer: 5000,
          timerProgressBar: true,
          allowOutsideClick: false,
          allowEscapeKey: true,
          alowwEnterKey: true,
          confirmButtonColor: '#273746',
          customClass: {
            title: 'swaltitle',
          }
        }).then(() => {
          cart = [];
          updateCartUI();
        });
      }
    });
  }
});