# QR Code Generator Extension

## Requirements
- OS: Windows, Linux, or macOS
- Node.js (Optional, not required for this extension)

## Build Instructions
This extension does not require any build process.
- It uses a third-party open-source library (qrcode.min.js) from [qrcodejs GitHub repository](https://github.com/davidshimjs/qrcodejs).
- No bundling or transpiling is used.
- Files can be directly loaded into the browser for development and testing.

## Steps to Reproduce
1. Clone or download this repository.
2. Open Firefox and navigate to `about:debugging`.
3. Click **Load Temporary Add-on**.
4. Select the `manifest.json` file from the folder.

The extension should load and function as expected.

## Notes
- `qrcode.min.js` is used as-is and is an open-source, unmodified library.
- Source code for `qrcode.min.js` can be found [here](https://github.com/davidshimjs/qrcodejs).
