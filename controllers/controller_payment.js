const payment = require('../midtrans/config')
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

// const paymentNotification = async (req, res) => {

//     let data = req.body ? req.body : false

//     // console.log(data.order_id)
//     let datarespon
//     let snap = payment.config()
//     let orderId
//     const connection = await db.connection()
//     // snap.transaction.notification()
//     try {
//         snap.transaction.notification(data)
//             .then(async (statusResponse) => {
//                 datarespon = statusResponse
//                 orderId = datarespon.order_id;

//                 let transactionStatus = datarespon.transaction_status;
//                 let fraudStatus = datarespon.fraud_status;
//                 let transaction_id = datarespon.transaction_id
//                 let tlgsekarang = helper.formatTanggal(new Date())
//                 let status_order = 0
//                 let keterangan = ''

//                 switch (transactionStatus) {
//                     case "capture":
//                         if (fraudStatus == 'accept') {
//                             status_order = 4
//                             keterangan = 'Verifikasi Pembayaran No Order ' + orderId
//                         }
//                         // if (fraudStatus == 'challenge') {
//                         //     status_order = 9
//                         //     keterangan = 'Card yang digunakan bermasalah'
//                         // } else if (fraudStatus == 'accept') {
//                         //     status_order = 4
//                         //     keterangan = 'Verifikasi Pembayaran No Order ' + orderId
//                         // }
//                         break
//                     case "pending":
//                         status_order = 3
//                         keterangan = 'Menunggu Pelanggan Membayar No. Order ' + orderId
//                         break
//                     case "settlement":
//                         status_order = 4
//                         keterangan = 'Verifikasi Pembayaran No Order ' + orderId
//                         break
//                     case "cancel":
//                     case "deny":
//                     case "expire":
//                         status_order = 9
//                         keterangan = 'Order ' + orderId + ' dibatalkan'
//                         break

//                 }

//                 let statusordernew = JSON.stringify({
//                     status: status_order,
//                     tanggal: tlgsekarang,
//                     keterangan: keterangan
//                 })

            
//                 let update = await cOrder.updateStatusOrder(statusordernew, status_order, orderId, JSON.stringify(datarespon))
//                 if (!update.status) {
//                     return res.sendStatus(401)
//                 }
//                 return res.sendStatus(200)
           
//             }).catch((error) => {
//                 console.log(error);
//                 res.sendStatus(401)
//                 return false
//             });
//     } catch (err) {
//         // Manage Errors
//         console.log(err);
//         res.sendStatus(401)
//     } finally {
//         // Close Connection
//         await connection.release();
//     }
// }
module.exports = {pay}