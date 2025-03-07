let pTagLoading = document.getElementById('pTagLoading');

document.addEventListener("DOMContentLoaded", function () {

    const productsApiUrl = "http://avatoop.com/marina_kish/api/products/index";
    const imagesApiBaseUrl = "http://avatoop.com/marina_kish/api/media/get_image/product/";
    const productsContainer = document.getElementById("products-container");
    const noProductsMessage = document.getElementById("no-products-message");

    fetch(productsApiUrl)
        .then(response => response.json())
        .then(productsData => {
            if (productsData.length == 0) {
                noProductsMessage.textContent = "محصولی وجود ندارد"; 
                return; 
            } else {
                noProductsMessage.textContent = '';
            }
            if(productsData && productsData !== 0){
                productsData.forEach(product => {
                    const productCard = document.createElement("div");
                    productCard.classList.add("col-lg-4", "col-md-4", "col-sm-6", "d-flex", "justify-content-center");
    
                    fetch(`${imagesApiBaseUrl}${product.id}`)
                        .then(response => response.json())
                        .then(imageData => {
                            let productImage = "default.jpg";
                            if (imageData.data && imageData.data.length > 0) {
                                productImage = imageData.data[0];
                            }
                            productCard.innerHTML = `
                                <a href="product-single.html?id=${product.id}" 
                                   class="product-card"
                                   product_id="${product.id}">
                                    <img src="${productImage}" alt="${product.name}" class="product-image" 
                                         style="width: 100%; height: auto;" 
                                         onerror="this.onerror=null; this.src='default.jpg';">
                                    <h3 class="product-name mt-4 font-size-18">${product.name}</h3>
                                    <p class="product-time d-flex font-size-16"><i class="la la-clock"></i>&nbsp;${product.time} دقیقه</p>
                                    <div class="card-price d-flex align-items-center justify-content-between mb-4 mt-2">
                                        <p class="product-price d-flex font-size-18" style="color:#2255d7;">${product.price.toLocaleString()}&nbsp;&nbsp;تومان</p>
                                    </div>
                                    <span class="btn-text">مشاهده جزئیات<i class="la la-angle-left"></i></span>
                                </a>
                            `;
    
                            productCard.querySelector(".product-card").addEventListener("click", function (event) {
                                event.preventDefault();
    
                                let product_id = this.getAttribute("product_id");
                                localStorage.setItem("product_id", product_id);
    
                                console.log("product_id", product_id);
    
                                window.location.href = `product-single.html?id=${product_id}`;
                            });
                            productsContainer.appendChild(productCard);
                            pTagLoading.parentElement.classList.add("mt-0");
                            pTagLoading.classList.add("d-none")      
                        })
                        .catch(error => console.error(`خطا در دریافت تصویر محصول ${product.id}:`, error));
                });
            }else{
                pTagLoading.classList.add('d-none')
                newsSection.classList.add('d-none')
                noProductsMessage.textContent = "خطا در دریافت اطلاعات محصولات";
            }
        })
        .catch(error => {
            console.error("خطا در دریافت محصولات:", error);
        });
});
