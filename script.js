
// ========================================
// JASTIP CALCULATOR
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


const productTotal =
    document.querySelector("#product-total");


const jastipTotal =
    document.querySelector("#jastip-total");


const grandTotal =
    document.querySelector("#grand-total");


const resetButton =
    document.querySelector("#reset");


// ========================================
// JASTIP FEE RULE
// ========================================

function getJastipFee(weight) {

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
// CALCULATE EVERYTHING
// ========================================

function calculateTotals() {


    const items =
        document.querySelectorAll(".item");


    let totalProductINR = 0;

    let totalJastipIDR = 0;


    // ====================================
    // Calculate each item
    // ====================================

    items.forEach(function (item) {


        const priceInput =
            item.querySelector(".product-price");


        const quantityInput =
            item.querySelector(".product-quantity");


        const weightInput =
            item.querySelector(".product-weight");


        const feeDisplay =
            item.querySelector(".item-jastip-fee");


        const price =
            parseFloat(priceInput.value) || 0;


        const quantity =
            parseFloat(quantityInput.value) || 0;


        const weight =
            parseFloat(weightInput.value) || 0;


        // Product cost in INR

        const itemProductINR =
            price * quantity;


        totalProductINR +=
            itemProductINR;


        // Jastip fee

        const feePerUnit =
            getJastipFee(weight);


        const itemJastipIDR =
            feePerUnit * quantity;


        totalJastipIDR +=
            itemJastipIDR;


        // Display Jastip fee per unit

        feeDisplay.textContent =
            formatIDR(feePerUnit);

    });


    // ====================================
    // Convert Products INR → IDR
    // ====================================

    const totalProductIDR =
        totalProductINR * EXCHANGE_RATE;


    // ====================================
    // Grand Total
    // ====================================

    const total =
        totalProductIDR
        + totalJastipIDR;


    // ====================================
    // Update Screen
    // ====================================

    productTotal.textContent =
        formatIDR(totalProductIDR);


    jastipTotal.textContent =
        formatIDR(totalJastipIDR);


    grandTotal.textContent =
        formatIDR(total);

}


// ========================================
// ADD NEW ITEM
// ========================================

function addItem() {


    const item =
        document.createElement("div");


    item.className =
        "item";


    item.innerHTML = `

        <div class="form-group">

            <label>
                Product Name
            </label>

            <input
                type="text"
                class="product-name"
                placeholder="e.g. Nike Shoes"
            >

        </div>


        <div class="item-row">


            <div class="form-group">

                <label>
                    Price (INR)
                </label>

                <div class="input-with-prefix">

                    <span>₹</span>

                    <input
                        type="number"
                        class="product-price"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                    >

                </div>

            </div>


            <div class="form-group">

                <label>
                    Quantity
                </label>

                <input
                    type="number"
                    class="product-quantity"
                    value="1"
                    min="1"
                    step="1"
                >

            </div>


        </div>


        <div class="item-row">


            <div class="form-group">

                <label>
                    Weight per Unit (grams)
                </label>

                <input
                    type="number"
                    class="product-weight"
                    placeholder="e.g. 400"
                    min="0"
                    step="1"
                >

            </div>


            <div class="form-group">

                <label>
                    Jastip Fee per Unit
                </label>

                <div class="fee-display">

                    <span class="fee-currency">
                        IDR
                    </span>

                    <span class="item-jastip-fee">
                        0
                    </span>

                </div>

            </div>


        </div>


        <button
            type="button"
            class="remove-item"
        >
            Remove Item
        </button>

    `;


    itemsContainer.appendChild(item);


    // ====================================
    // Remove Item
    // ====================================

    const removeButton =
        item.querySelector(".remove-item");


    removeButton.addEventListener(
        "click",
        function () {

            item.remove();

            calculateTotals();

        }
    );


    // ====================================
    // Watch Inputs
    // ====================================

    const priceInput =
        item.querySelector(".product-price");


    const quantityInput =
        item.querySelector(".product-quantity");


    const weightInput =
        item.querySelector(".product-weight");


    priceInput.addEventListener(
        "input",
        calculateTotals
    );


    quantityInput.addEventListener(
        "input",
        calculateTotals
    );


    weightInput.addEventListener(
        "input",
        calculateTotals
    );


    calculateTotals();

}


// ========================================
// ADD ITEM BUTTON
// ========================================

addItemButton.addEventListener(
    "click",
    addItem
);


// ========================================
// FIRST ITEM LISTENERS
// ========================================

const firstItem =
    document.querySelector(".item");


firstItem
    .querySelector(".product-price")
    .addEventListener(
        "input",
        calculateTotals
    );


firstItem
    .querySelector(".product-quantity")
    .addEventListener(
        "input",
        calculateTotals
    );


firstItem
    .querySelector(".product-weight")
    .addEventListener(
        "input",
        calculateTotals
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
