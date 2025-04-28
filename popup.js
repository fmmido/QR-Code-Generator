/* global QRCode */ // Declare QRCode global from qrcode.min.js

// DOM Elements
const generateQRButton = document.getElementById("generateQR");
const qrInput = document.getElementById("qrInput");
const qrCodeContainer = document.getElementById("qrContainer");
const qrCodeDiv = document.getElementById("qrCode");
const inputTypeSelector = document.getElementById("inputType");

// Check if QRCode library is loaded
if (typeof QRCode === "undefined") {
    alert("QRCode library failed to load. Please reload the extension.");
    console.error("QRCode library not found");
    throw new Error("QRCode library not loaded");
}

// Utility: Wait for element to appear
async function waitForElement(selector, timeout = 2000) {
    console.log(`Waiting for element: ${selector}`);
    const start = Date.now();
    while (Date.now() - start < timeout) {
        const element = document.querySelector(selector);
        if (element) {
            console.log(`Element found: ${selector}`);
            return element;
        }
        await new Promise(resolve => setTimeout(resolve, 50));
    }
    console.warn(`Element not found within ${timeout}ms: ${selector}`);
    return null;
}

// Generate QR Code
generateQRButton.addEventListener("click", async () => {
    const inputType = inputTypeSelector.value;
    const inputData = qrInput.value.trim();

    if (!inputData) {
        alert("Please enter or paste valid data!");
        console.warn("Generate: Empty input detected");
        return;
    }

    try {
        console.log("Generate: Starting QR code generation for", inputType, inputData);
        qrCodeContainer.classList.remove("hidden");
        qrCodeDiv.innerHTML = "";

        const formattedData = formatQRCodeData(inputType, inputData);
        console.log("Generate: Formatted data:", formattedData);

        new QRCode(qrCodeDiv, {
            text: formattedData,
            width: 150,
            height: 150,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        const qrImage = await waitForElement("#qrCode img", 2000);
        if (qrImage) {
            console.log("Generate: QR code image rendered successfully");
        } else {
            throw new Error("QR code image failed to render within timeout");
        }
    } catch (error) {
        alert("Failed to generate QR code. Please check input and try again.");
        console.error("Generate Error:", error);
        qrCodeContainer.classList.add("hidden");
    }
});

// Format QR Code Data
function formatQRCodeData(type, data) {
    try {
        switch (type) {
            case "url":
                return /^https?:\/\//i.test(data) ? data : `https://${data}`;
            case "text":
                return data;
            case "email":
                return `mailto:${data}`;
            case "phone":
                return `tel:${data}`;
            case "sms":
                return `sms:${data}`;
            case "wifi":
                const [ssid, password] = data.split(",").map(s => s.trim());
                return `WIFI:T:WPA;S:${ssid || data};P:${password || ""};;`;
            case "geo":
                return `geo:${data}`;
            case "event":
                return `BEGIN:VEVENT\nSUMMARY:${data}\nEND:VEVENT`;
            case "crypto":
                return `bitcoin:${data}`;
            case "contact":
                return `BEGIN:VCARD\nVERSION:3.0\nFN:${data}\nEND:VCARD`;
            default:
                return data;
        }
    } catch (error) {
        console.error("Format Data Error:", error);
        return data;
    }
}