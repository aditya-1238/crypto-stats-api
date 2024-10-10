# crypto-stats-api

## Overview
The **Crypto Statistics API** is a Node.js application that fetches the current price, market cap, and 24-hour change of cryptocurrencies such as Bitcoin, Ethereum, and Matic from the CoinGecko API. The application stores this data in a MongoDB Atlas database and provides APIs to retrieve the latest statistics and the standard deviation of cryptocurrency prices.

## Features
- Background job that fetches and stores cryptocurrency data every 2 hours.
- API endpoint `/stats` to retrieve the latest current price, market cap, and 24-hour change data for a specified cryptocurrency.
- API endpoint `/deviation` to calculate and return the standard deviation of the last 100 price records.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/aditya-1238/crypto-stats-api.git

2. **Install the dependencies:**
   ```bash
   npm install
   
3. **Create a `.env` file in the root directory and add your MongoDB URL and CoinGecko API key:**
   ```bash
   DB_URL=your_mongodb_url
   COINGECKO_API_KEY=your_coingecko_api_key

4. **Start the server:**
   ```bash
   npm start

5.**Access the API:**
- Get latest stats: GET /stats?coin=bitcoin
- Get standard deviation: GET /deviation?coin=bitcoin



## License
This project is licensed under the MIT License.

## Contributing
Feel free to submit issues or pull requests to improve the project.


