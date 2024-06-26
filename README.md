# ReceiptSplitter

ReceiptSplitter is a mobile app that helps you split receipt payments among friends. 

## Screenshots

<p align="center">
  <img alt="ReceiptSplitter Home Page" src="Screenshots/HistoryPage.PNG" width=250>
  <img alt="ReceiptSplitter Preview Page" src="Screenshots/PreviewPage.PNG" width=250>
  <img alt="ReceiptSplitter Analysis Page" src="Screenshots/AnalysisPage.PNG" width=250>
</p>

## Features

- [x] Automatic price parsing with Tesseract OCR
- [ ] See past receipts and payments splits (in progress)
- [ ] Automatically charge friends with Venmo or other payment integration

## Running Locally

### Backend

You will need to have [tesseract](https://github.com/tesseract-ocr/tesseract) installed on your machine, then edit `config.py` with the path to the excecutable. Then run:

```
cd backend
python -m venv .venv
.venv/Scripts/activate
python -m pip install -r requirements.txt
cd flask
flask run
```

This will deploy a Flask server serving on port 5000.  

 You can also deploy the server in a Docker container:
```
cd backend
docker compose up -d
```

### Frontend

You will need the latest [Node.js](https://nodejs.org) LTS version or later installed on your machine. Then run:

```
cd ReceiptSplitter
npm i
npm run dev
```

This will generate a QR code that you can scan and run the app with [Expo Go](https://expo.dev/go). If you have a local backend running, make sure to also update the `.env` file with the API endpoint.

