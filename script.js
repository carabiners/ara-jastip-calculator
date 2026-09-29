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

const EXCHANGE_RATE = 186.00 * 1.02;


// ========================================
// HANDLING FEE RULE
// ========================================

function getHandlingFee(weight) {

    if (weight <= 300) {
        return 90000;
    }

    if (weight <= 499) {
        return 120000;
    }

    if (weight <= 599) {
        return 150000;
    }

    if (weight <= 1050) {
        return 300000;
    }

    return null;
}


// ========================================
// FORMAT IDR
// ========================================

function formatIDR(amount) {

    return Math.round(amount)
        .toLocaleString("en-US");

}


// ========================================
// CALCULATE TOTAL
// ========================================

function calculateTotal() {

    const priceInput =
        document.querySelector(".product-price");

    const weightInput =
        document.querySelector(".product-weight");

    const totalDisplay =
        document.querySelector(".item-total-price");


    const price =
        parseFloat(priceInput.value);

    const weight =
        parseFloat(weightInput.value);


    // ====================================
    // WAIT UNTIL BOTH VALUES ARE ENTERED
    // ====================================

    if (
        isNaN(price) ||
        isNaN(weight)
    ) {

        totalDisplay.textContent = "0";

        return;
    }


    // ====================================
    // CONVERT INR TO IDR
    // ====================================

    const bookPriceIDR =
        price * EXCHANGE_RATE;


    // ====================================
    // GET HANDLING FEE
    // ====================================

    const handlingFee =
        getHandlingFee(weight);


    // ====================================
    // ABOVE 1050 GRAMS
    // ====================================

    if (handlingFee === null) {

        totalDisplay.textContent =
            "Please contact via WA";

        return;
    }


    // ====================================
    // CALCULATE TOTAL
    // ====================================

    const totalPrice =
        bookPriceIDR + handlingFee;


    // ====================================
    // ROUND UP TO NEAREST 1,000 IDR
    // ====================================

    const roundedTotal =
        Math.ceil(totalPrice / 1000) * 1000;


    // ====================================
    // DISPLAY RESULT
    // ====================================

    totalDisplay.textContent =
        formatIDR(roundedTotal);

}


// ========================================
// INPUT LISTENERS
// ========================================

const priceInput =
    document.querySelector(".product-price");


const weightInput =
    document.querySelector(".product-weight");


priceInput.addEventListener(
    "input",
    calculateTotal
);


weightInput.addEventListener(
    "input",
    calculateTotal
);


// ========================================
// RESET
// ========================================

const resetButton =
    document.querySelector("#reset");


resetButton.addEventListener(
    "click",
    function () {

        location.reload();

    }
);


// ========================================
// INITIAL STATE
// ========================================

calculateTotal();