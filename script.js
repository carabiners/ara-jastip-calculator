// ========================================
// ARA PICKS PACKS
// KALKULATOR PO BUKU
// ========================================


// ========================================
// FIXED EXCHANGE RATE
// ========================================

// Base rate:
// 1 INR = 185.57 IDR
//
// 2% conversion buffer:
// 185.57 × 1.02
//
// Effective rate:
// 1 INR = 189.2814 IDR

const EXCHANGE_RATE = 185.57 * 1.02;


// ========================================
// MAIN ELEMENTS
// ========================================

const itemsContainer =
    document.querySelector("#items-container");


const addItemButton =
    document.querySelector("#add-item");


const resetButton =
    document.querySelector("#reset");


// ========================================
// JASTIP / HANDLING FEE RULE
// ========================================

function getHandlingFee(weight) {

    if (weight < 300) {

        return 80000;

    }


    if (weight <= 450) {

        return 120000;

    }


    return 170000;

}


// ========================================
// FORMAT IDR
// ========================================

function formatIDR(amount) {

    return Math.round(amount)
        .toLocaleString("en-IN");

}


// ========================================
// CALCULATE ONE BOOK
// ========================================

function calculateItemTotal(item) {


    const priceInput =
        item.querySelector(".product-price");


    const weightInput =
        item.querySelector(".product-weight");


    const totalDisplay =
        item.querySelector(".item-total-price");


    const price =
        parseFloat(priceInput.value);


    const weight =
        parseFloat(weightInput.value);


    // ====================================
    // DO NOT CALCULATE UNTIL BOTH
    // PRICE AND WEIGHT ARE ENTERED
    // ====================================

    if (
        isNaN(price) ||
        isNaN(weight)
    ) {

        totalDisplay.textContent = "0";

        return;

    }


    // ====================================
    // Convert book price from INR to IDR
    // ====================================

    const bookPriceIDR =
        price * EXCHANGE_RATE;


    // ====================================
    // Handling + packaging fee
    // ====================================

    const handlingFee =
        getHandlingFee(weight);


    // ====================================
    // Total price per book
    // ====================================

    const totalPrice =
        bookPriceIDR
        + handlingFee;


// ====================================
// Round UP to nearest IDR 1,000
// ====================================

const roundedTotal =
    Math.ceil(totalPrice / 1000) * 1000;


totalDisplay.textContent =
    formatIDR(roundedTotal);

}


// ========================================
// CALCULATE ALL BOOKS
// ========================================

function calculateTotals() {


    const items =
        document.querySelectorAll(".item");


    items.forEach(function (item) {

        calculateItemTotal(item);

    });

}


// ========================================
// ADD NEW BOOK
// ========================================

function addItem() {


    const item =
        document.createElement("div");


    item.className =
        "item";


    item.innerHTML = `

        <div class="form-group">

            <label>
                Harga buku (Rs)
            </label>

            <div class="input-with-prefix">

                <span>₹</span>

                <input
                    type="number"
                    class="product-price"
                    placeholder="Masukkan harga buku"
                    min="0"
                    step="0.01"
                >

            </div>

        </div>


        <div class="form-group">

            <label>
                Berat buku (gram)
            </label>

            <input
                type="number"
                class="product-weight"
                placeholder="Masukkan berat buku"
                min="0"
                step="1"
            >

        </div>


        <div class="form-group total-price-group">

            <label>
                Total harga* (IDR)
            </label>

            <div class="total-price-display">

                <span class="total-price-currency">
                    IDR
                </span>

                <span class="item-total-price">
                    0
                </span>

            </div>

        </div>


        <div class="remarks">

            <div>
                * Total harga (IDR) mencakup harga barang,
                handling, dan packaging
            </div>

            <div>
                ** Tidak termasuk harga ongkir dari Jakarta Pusat
            </div>

        </div>


        <button
            type="button"
            class="remove-item"
        >
            Hapus Buku
        </button>

    `;


    itemsContainer.appendChild(item);


    // ====================================
    // Remove Book
    // ====================================

    const removeButton =
        item.querySelector(".remove-item");


    removeButton.addEventListener(
        "click",
        function () {

            item.remove();

        }
    );


    // ====================================
    // Watch Inputs
    // ====================================

    const priceInput =
        item.querySelector(".product-price");


    const weightInput =
        item.querySelector(".product-weight");


    priceInput.addEventListener(
        "input",
        function () {

            calculateItemTotal(item);

        }
    );


    weightInput.addEventListener(
        "input",
        function () {

            calculateItemTotal(item);

        }
    );


    calculateItemTotal(item);

}


// ========================================
// ADD BOOK BUTTON
// ========================================

addItemButton.addEventListener(
    "click",
    addItem
);


// ========================================
// FIRST BOOK LISTENERS
// ========================================

const firstItem =
    document.querySelector(".item");


firstItem
    .querySelector(".product-price")
    .addEventListener(
        "input",
        function () {

            calculateItemTotal(firstItem);

        }
    );


firstItem
    .querySelector(".product-weight")
    .addEventListener(
        "input",
        function () {

            calculateItemTotal(firstItem);

        }
    );


// ========================================
// RESET
// ========================================

resetButton.addEventListener(
    "click",
    function () {

        location.reload();

    }
);


// ========================================
// INITIAL CALCULATION
// ========================================

calculateTotals();