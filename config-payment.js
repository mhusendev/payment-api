const midtransClient = require('midtrans-client');
// Create Snap API instance

const config = ()=> {
    let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction : false,
        serverKey : 'SB-Mid-server-Wk62z74L03ivCliYtWNIYNX3',
        clientKey : 'SB-Mid-client-nSUKp2lwHs11pIsV'
    });
    return snap
}


module.exports = {config}