document.addEventListener('DOMContentLoaded', function () {
    const productsContainer = document.getElementById('products');
    const products = [
        { name: 'IPHONE 15', price: 'Rs 225,000', image: '15.png', specifications: { RAM: '6GB', ROM: '128GB', Battery: '3349mAh', Processor: 'A16', ChargingSpeed: '20W', Network: '5G' } },
        { name: 'IPHONE 15 PLUS', price: 'Rs 250,000', image: '15 plus.png', specifications: { RAM: '6GB', ROM: '128GB', Battery: '4383mAh', Processor: 'A16', ChargingSpeed: '20W', Network: '5G' } },
        { name: 'IPHONE 15 PRO', price: 'Rs 280,000', image: '15 pro.png', specifications: { RAM: '8GB', ROM: '256GB', Battery: '3274mAh', Processor: 'A17', ChargingSpeed: '30W', Network: '5G' } },
        { name: 'IPHONE 15 PRO MAX', price: 'Rs 335,000', image: '15 pro max.png', specifications: { RAM: '8GB', ROM: '256GB', Battery: '4422mAh', Processor: 'A17', ChargingSpeed: '30W', Network: '5G' } },
        { name: 'SAMSUNG A55', price: 'Rs 102,000', image: 'A55.png', specifications: { RAM: '8GB', ROM: '256GB', Battery: '5000mAh', Processor: 'Exynos 1480', ChargingSpeed: '25W', Network: '5G' } },
        { name: 'SAMSUNG S24', price: 'Rs 225,000', image: 's24.png', specifications: { RAM: '8GB', ROM: '256GB', Battery: '4000mAh', Processor: 'Exynos 2400', ChargingSpeed: '25W', Network: '5G' } },
        { name: 'SAMSUNG S4 PLUS', price: 'Rs 280,000', image: 's24 plus.png', specifications: { RAM: '8GB', ROM: '256GB', Battery: '4500mAh', Processor: 'Exynos 2400', ChargingSpeed: '25W', Network: '5G' } },
        { name: 'SAMSUNG S4 ULTRA', price: 'Rs 365,000', image: 's24 ultra.png', specifications: { RAM: '8GB', ROM: '256GB', Battery: '5000mAh', Processor: 'Snapdragon 8 Gen 3', ChargingSpeed: '45W', Network: '5G' } },
        { name: 'GOOGLE PIXEL 8', price: 'Rs: 153,000', image: 'pixel 8.png', specifications: { RAM: '8GB', ROM: '256GB', Battery: '4575mAh', Processor: 'Tensor G3', ChargingSpeed: '27W', Network: '5G' } },
        { name: 'GOOGLE PIXEL 7 PRO', price: 'Rs 155,000', image: 'pixel 7 pro.png', specifications: { RAM: '8GB', ROM: '256GB', Battery: '5000mAh', Processor: 'Tensor G2', ChargingSpeed: '23W', Network: '5G' } },
        { name: 'GOOGLE PIXEL 8 PRO', price: 'Rs 200,000', image: 'pixel 8 pro.png', specifications: { RAM: '8GB', ROM: '256GB', Battery: '5050mAh', Processor: 'Tensor G3', ChargingSpeed: '30W', Network: '5G' } }
    ];

    function loadProducts() {
        products.forEach(product => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');

            const cardImage = document.createElement('img');
            cardImage.src = product.image;
            cardImage.alt = product.name;
            cardImage.classList.add('card-img-top');

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = product.name;

            const cardPrice = document.createElement('p'); // Create paragraph element for price
            cardPrice.classList.add('card-text');
            cardPrice.textContent = product.price;

            const specificationsButton = document.createElement('button');
            specificationsButton.textContent = 'Specifications';
            specificationsButton.classList.add('specifications-button');

            specificationsButton.addEventListener('click', () => {
                openModal(product.specifications);
            });

            const buyNowButton = document.createElement('a'); // Change button to anchor tag
        buyNowButton.textContent = 'Buy Now';
        buyNowButton.classList.add('buy-now-button');
        buyNowButton.href = `/details.html?product=${product.name}?price = ${product.price}`;

            buyNowButton.addEventListener('click', () => {
                window.location.href = `/buy?product=${product.name}?price = ${product.price}`;
            });

            cardBody.appendChild(cardTitle);

            cardDiv.appendChild(cardImage);
            cardBody.appendChild(cardPrice);
            cardBody.appendChild(cardPrice);
            cardDiv.appendChild(cardBody);
            cardDiv.appendChild(specificationsButton);
            cardDiv.appendChild(buyNowButton);

            productsContainer.appendChild(cardDiv);
        });
    }

    function openModal(specifications) {
        const modal = document.getElementById('specificationsModal');
        const modalContent = document.querySelector('#specificationsModal .modal-content');

        modalContent.innerHTML = `
            <span class="close">&times;</span>
            <p>RAM: ${specifications.RAM}</p>
            <p>ROM: ${specifications.ROM}</p>
            <p>Battery: ${specifications.Battery}</p>
            <p>Processor: ${specifications.Processor}</p>
            <p>Charging Speed: ${specifications.ChargingSpeed}</p>
            <p>Network: ${specifications.Network}</p>
        `;

        modal.style.display = 'block';

        const closeModal = modalContent.querySelector('.close');
        closeModal.onclick = function () {
            modal.style.display = 'none';
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    }

    loadProducts();
});
