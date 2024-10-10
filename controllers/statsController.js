const axios  = require('axios');
const Crypto = require('../models/cryptoModel');

getStats = async (req, res) => {
    try {
        
        const { coin } = req.query; 

        if (!coin) {
            return res.status(400).json({ error: 'Missing cryptocurrency ID' });
        }
        else{
            console.log(coin)
        }

        
            
        let data = await Crypto.findOne({id: coin});

        console.log(data);

        if(!data){
            return res.status(404).json({ error: 'Cryptocurrency data not found' });
        }

        res.json({
            price: data.price,
            marketCap: data.marketCap,
            '24hChange': parseFloat(data.change24h.toFixed(1))
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {getStats};
