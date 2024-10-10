const Crypto = require('../models/cryptoModel');

function calculateStandardDeviation(prices) {
    const n = prices.length;
    const mean = prices.reduce((acc, price) => acc + price, 0) / n;
    const variance = prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / n;
    return Math.sqrt(variance);
}

exports.getDeviation  = async(req,res) =>{
    try{
        const { coin } = req.query; 

        if (!coin) {
            return res.status(400).json({ error: 'Missing cryptocurrency ID' });
        }
        

        const records = await Crypto.find({ id: coin })
        .sort({ timestamp: -1 })
        .limit(100)
        .exec();

    if (records.length === 0) {
        return res.status(404).json({ error: 'No records found for the specified coin' });
    }

    // Extract prices from the records
    const prices = records.map(record => record.price);

    // Calculate the standard deviation
    const deviation = calculateStandardDeviation(prices);

    // Return the response
    res.json({ deviation: parseFloat(deviation.toFixed(2)) });

    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}