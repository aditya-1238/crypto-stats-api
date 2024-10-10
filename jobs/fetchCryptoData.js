const cron = require('node-cron');
const Crypto = require('../models/cryptoModel');
const axios = require('axios');


const coinGecko_API_KEY = process.env.COINGECKO_API_KEY;


function fetchCryptoDataJob(){ 
  cron.schedule('0 0 */2 * * *', async (req,res) => {
    // console.log("HI");
    try {
    
      const responseData = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        headers: {accept: 'application/json', 'x-cg-demo-api-key': coinGecko_API_KEY},
        params: { vs_currency: 'usd', ids: 'bitcoin,ethereum,matic-network' }
      });

      
      responseData.data
      .forEach(async(coin) => {
        const newCoinData = {
          id: coin.id,
          name: coin.name,
          price: coin.current_price,
          marketCap: coin.market_cap,
          change24h: coin.price_change_percentage_24h,
          timestamp: new Date()
        };
        await Crypto.create(newCoinData);
        
      });

      console.log("Data added in the database every 2 hrs");
    
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  );
}


module.exports = { fetchCryptoDataJob};