const payment = require('../midtrans/config')
const Account = require('../models/account')
const pay = async (req) => {
    let parameter = req.body
    let snap = await payment.config()

    let payload = await snap.createTransaction(parameter)
        .then((transaction) => {
            let transactionToken = transaction.token;
           return {transactionToken:transactionToken}

            
        }).catch((err) => {
            console.log(err.ApiResponse)
           return err
        })
      
        return payload
}

const paymentNotification = async (req, res) => {

    let data = req.body ? req.body : false

    // console.log(data.order_id)
    let datarespon
    let snap = payment.config()
    let orderId
    const connection = await db.connection()
    // snap.transaction.notification()
    try {
        snap.transaction.notification(data)
            .then(async (statusResponse) => {
                datarespon = statusResponse
                orderId = datarespon.order_id;
                let codeSplit = JSON.stringify(orderId).split('-')
                let appCode = codeSplit[0]
                const account = await Account.findOne({app_code:appCode});
                
                if(appCode == account.app_code) {
                    let transactionStatus = datarespon.transaction_status;
                    let fraudStatus = datarespon.fraud_status;
                   
                    let status_order = 0
                    let keterangan = ''
    
                    switch (transactionStatus) {
                        case "capture":
                            if (fraudStatus == 'accept') {
                                status_order = 4
                                keterangan = 'Verifikasi Pembayaran No Order ' + orderId
                            }
                            // if (fraudStatus == 'challenge') {
                            //     status_order = 9
                            //     keterangan = 'Card yang digunakan bermasalah'
                            // } else if (fraudStatus == 'accept') {
                            //     status_order = 4
                            //     keterangan = 'Verifikasi Pembayaran No Order ' + orderId
                            // }
                            break
                        case "pending":
                            status_order = 3
                            keterangan = 'Menunggu Pelanggan Membayar No. Order ' + orderId
                            break
                        case "settlement":
                            status_order = 4
                            keterangan = 'Verifikasi Pembayaran No Order ' + orderId
                            break
                        case "cancel":
                        case "deny":
                        case "expire":
                            status_order = 9
                            keterangan = 'Order ' + orderId + ' dibatalkan'
                            break
    
                    }
                } else {
                      console.log('app code tidak valid')
                }
           
            }).catch((error) => {
                console.log(error);
            
                return false
            });
    } catch (err) {
        // Manage Errors
        console.log(err);
 
    } finally {
        
    }
}

const paymentStatus = async (req) => {
    let snap = await payment.config()
    snap.transaction.status(req.params['order_id'])
        .then((response) => {
            return response
        }).catch((err) => {
            console.log(err.ApiResponse)
            return err
        });
}

module.exports = {pay,paymentStatus}