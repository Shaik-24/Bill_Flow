function showPlaceholder(){

    document.getElementById("result").innerHTML = `

        <div class="placeholder">
    
            <p>
                Create an invoice or click View to see invoice details here.
            </p>

        </div>

    `;
}

function toggleInvoiceHistory(){

    const historySection =
        document.getElementById("historySection");

    const button =
        document.getElementById("historyBtn");

    if(historySection.style.display === "none"){

        historySection.style.display = "block";

        button.innerText =
            "Hide Invoice History";

        loadInvoices();

    }else{

        historySection.style.display = "none";

        button.innerText =
            "Load All Invoices";
    }
}

function addItem() {

    const container = document.getElementById("itemsContainer");

    const row = document.createElement("div");

    row.className = "item-row";

    row.innerHTML = `
        <input type="text"
               class="productName"
               placeholder="Product Name">

        <input type="number"
               class="quantity"
               placeholder="Qty">

        <input type="number"
               class="unitPrice"
               placeholder="Price">
    `;

    container.appendChild(row);
}

function generateInvoice() {

    const customerName =
        document.getElementById("customerName").value.trim();

    if(customerName === "") {

        alert("Please enter customer name");

        return;
    }

    const productNames =
        document.querySelectorAll(".productName");

    const quantities =
        document.querySelectorAll(".quantity");

    const prices =
        document.querySelectorAll(".unitPrice");

    let items = [];

    for(let i = 0; i < productNames.length; i++) {

        const productName =
            productNames[i].value.trim();

        const quantity =
            parseInt(quantities[i].value);

        const unitPrice =
            parseFloat(prices[i].value);

        if(
            productName === "" ||
            isNaN(quantity) ||
            isNaN(unitPrice)
        ){

            alert("Please fill all product details");

            return;
        }

        items.push({

            productName: productName,
            quantity: quantity,
            unitPrice: unitPrice

        });
    }

    const invoice = {

        customerName: customerName,

        date:
            new Date()
            .toISOString()
            .split('T')[0],

        items: items
    };

    fetch("http://localhost:8080/api/invoices", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(invoice)

    })

    .then(response => {

        if(!response.ok){

            throw new Error(
                "Failed to create invoice"
            );
        }

        return response.json();
    })

    .then(data => {

        document.getElementById("result").innerHTML = `

            <h3>Invoice Summary</h3>

            <p>
                <strong>Customer:</strong>
                ${data.customerName}
            </p>

            <p>
                <strong>Date:</strong>
                ${data.date}
            </p>

            <p>
                <strong>Total Amount:</strong>
                ₹${data.totalAmount.toFixed(2)}
            </p>

            <p>
                <strong>GST (18%):</strong>
                ₹${data.tax.toFixed(2)}
            </p>

            <p>
                <strong>Final Amount:</strong>
                ₹${data.finalAmount.toFixed(2)}
            </p>

            <hr>

            <h4>Products</h4>

            <table>

                <tr>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>

                ${data.items.map(item => `

                    <tr>

                        <td>${item.productName}</td>

                        <td>${item.quantity}</td>

                        <td>
                            ₹${item.unitPrice.toFixed(2)}
                        </td>

                        <td>
                            ₹${item.totalPrice.toFixed(2)}
                        </td>

                    </tr>

                `).join("")}

            </table>
        `;

        if(
            document.getElementById(
                "historySection"
            ).style.display === "block"
        ){
            loadInvoices();
        }
    })

    .catch(error => {

        console.error(error);

        alert("Error creating invoice");
    });
}

function loadInvoices(){

    fetch(
        "http://localhost:8080/api/invoices"
    )

    .then(response => response.json())

    .then(data => {

        let tableBody = "";

        data.forEach(invoice => {

            tableBody += `

                <tr>

                    <td>${invoice.id}</td>

                    <td>${invoice.customerName}</td>

                    <td>
                        ₹${invoice.finalAmount.toFixed(2)}
                    </td>

                    <td>${invoice.date}</td>

                    <td>

                        <button
                            class="action-btn view-btn"
                            onclick="viewInvoice(${invoice.id})">

                            View

                        </button>

                        <button
                            class="action-btn delete-btn"
                            onclick="deleteInvoice(${invoice.id})">

                            Delete

                        </button>

                    </td>

                </tr>
            `;
        });

        document.querySelector(
            "#invoiceTable tbody"
        ).innerHTML = tableBody;
    })

    .catch(error => {

        console.error(error);

        alert("Failed to load invoices");
    });
}

function viewInvoice(id){

    fetch(
        `http://localhost:8080/api/invoices/${id}`
    )

    .then(response => {

        if(!response.ok){

            throw new Error(
                "Invoice not found"
            );
        }

        return response.json();
    })

    .then(data => {

        document.getElementById("result").innerHTML = `

            <h3>Invoice Summary</h3>

            <p>
                <strong>Customer:</strong>
                ${data.customerName}
            </p>

            <p>
                <strong>Date:</strong>
                ${data.date}
            </p>

            <p>
                <strong>Total Amount:</strong>
                ₹${data.totalAmount.toFixed(2)}
            </p>

            <p>
                <strong>GST:</strong>
                ₹${data.tax.toFixed(2)}
            </p>

            <p>
                <strong>Final Amount:</strong>
                ₹${data.finalAmount.toFixed(2)}
            </p>

            <hr>

            <h4>Products</h4>

            <table>

                <tr>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>

                ${data.items.map(item => `

                    <tr>

                        <td>${item.productName}</td>

                        <td>${item.quantity}</td>

                        <td>
                            ₹${item.unitPrice.toFixed(2)}
                        </td>

                        <td>
                            ₹${item.totalPrice.toFixed(2)}
                        </td>

                    </tr>

                `).join("")}

            </table>
        `;
    })

    .catch(error => {

        console.error(error);

        alert("Unable to load invoice");
    });
}

function deleteInvoice(id){

    const confirmDelete = confirm(
        "Are you sure you want to delete this invoice?"
    );

    if(!confirmDelete){
        return;
    }

    fetch(
        `http://localhost:8080/api/invoices/${id}`,
        {
            method: "DELETE"
        }
    )

    .then(response => {

        if(!response.ok){

            throw new Error(
                "Delete failed"
            );
        }

        alert(
            "Invoice deleted successfully"
        );

        showPlaceholder();

        if(
            document.getElementById(
                "historySection"
            ).style.display === "block"
        ){
            loadInvoices();
        }
    })

    .catch(error => {

        console.error(error);

        alert("Unable to delete invoice");
    });
}

window.onload = function(){

    showPlaceholder();

    document.getElementById(
        "historySection"
    ).style.display = "none";
};