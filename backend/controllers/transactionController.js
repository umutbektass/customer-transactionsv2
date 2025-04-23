const Transaction = require('../models/Transaction');
const Customer = require('../models/Customer'); 

const { startOfDay, endOfDay, parse } = require('date-fns');
const dateFnsTz = require('date-fns-tz'); 

const addTransaction = async (req, res, next) => {
    const { customerId, type, amount, date, description } = req.body;

    if (!customerId || !type || !amount) {
        res.status(400);
        return next(new Error('Müşteri ID, işlem tipi ve tutar zorunludur.'));
    }

    try {
        const customer = await Customer.findById(customerId);
        if (!customer) {
            res.status(404);
            return next(new Error('İşlem eklenmek istenen müşteri bulunamadı.'));
        }

        const transaction = await Transaction.create({
            customerId,
            type,
            amount,
            date, 
            description
          
        });

        customer.lastActivityDate = transaction.date || Date.now();
        await customer.save();

        res.status(201).json({
            success: true,
            message: 'İşlem başarıyla eklendi.',
            transaction: transaction
        });

    } catch (error) {
        console.error('İşlem Ekleme Hatası:', error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            res.status(400);
            return next(new Error(messages.join(', ')));
        }
         if (error.name === 'CastError' && error.path === 'customerId') {
             res.status(400);
             return next(new Error('Geçersiz müşteri ID formatı.'));
         }
        next(new Error('İşlem eklenirken bir sunucu hatası oluştu.'));
    }
};


const getTransactionsByCustomer = async (req, res, next) => {
    try {
         const customerExists = await Customer.findById(req.params.customerId);
         if (!customerExists) {
             res.status(404);
             return next(new Error('Müşteri bulunamadı.'));
         }

        const transactions = await Transaction.find({ customerId: req.params.customerId })
                                           .sort({ date: -1 }); 

        res.status(200).json({
            success: true,
            count: transactions.length,
            transactions: transactions
        });

    } catch (error) {
        console.error('Müşteriye Ait İşlemleri Listeleme Hatası:', error);
        if (error.name === 'CastError') {
             res.status(400);
             return next(new Error('Geçersiz müşteri ID formatı.'));
         }
        next(new Error('İşlemler listelenirken bir sunucu hatası oluştu.'));
    }
};



const getAllTransactions = async (req, res, next) => {
    try {
        // İstekten startDate ve endDate query parametrelerini alın
        const { startDate, endDate } = req.query;

        // Hedef saat dilimini belirleyin (Türkiye için)
        const timeZone = 'Europe/Istanbul';

        // MongoDB sorgusu için boş bir filtre nesnesi oluşturun
        let filter = {};

        // Eğer startDate ve endDate parametreleri geldiyse tarih filtresini uygulayın
        if (startDate && endDate) {
            try {
                // 1. Gelen YYYY-MM-DD formatındaki string'leri Date nesnelerine parse edin
                const parsedStartDate = parse(startDate, 'yyyy-MM-dd', new Date());
                const parsedEndDate = parse(endDate, 'yyyy-MM-dd', new Date());

                // Hata kontrolü: Eğer parse işlemi başarısızsa (geçersiz format vb.)
                if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
                     throw new Error('Geçersiz tarih formatı. YYYY-MM-DD kullanın.');
                }

                // 2. Seçilen tarihlerin 'Europe/Istanbul' saat dilimindeki gün başlangıcını ve bitişini bulun
                const localStart = startOfDay(parsedStartDate); // Sistem lokal saatine göre 00:00
                const localEnd = endOfDay(parsedEndDate);       // Sistem lokal saatine göre 23:59:59.999

                // 3. Bulunan lokal gün başlangıç/bitişini temsil eden Date nesnelerini,
                //    'Europe/Istanbul'daymış gibi kabul edip karşılık gelen UTC Date nesnesine çevir
                // *** DÜZELTME: zonedTimeToUtc yerine fromZonedTime kullan ***
                const utcStart = dateFnsTz.fromZonedTime(localStart, timeZone);
                const utcEnd = dateFnsTz.fromZonedTime(localEnd, timeZone);

                // 4. MongoDB filtresini oluşturun
                filter.date = {
                    $gte: utcStart,
                    $lte: utcEnd
                };

                // Konsola uygulanan filtreyi loglayın (Debugging için)
               

            } catch (dateError) {
                // Tarih işleme sırasında bir hata olursa
                console.error("Tarih işleme hatası:", dateError);
                if (dateError instanceof Error && dateError.message.includes('Invalid time value')) {
                     return res.status(400).json({ success: false, message: 'Geçersiz tarih formatı. YYYY-MM-DD kullanın.' });
                }
                // Diğer olası hataları da yakalayabiliriz
                return res.status(400).json({ success: false, message: dateError.message || 'Tarih aralığı işlenirken bir hata oluştu.' });
            }
        } else {
            // Eğer tarih parametreleri gelmediyse, filtre uygulanmaz
        }

        // Filtreyi kullanarak veritabanından işlemleri bulun
        const transactions = await Transaction.find(filter)
            .populate('customerId', 'name email') // Müşteri bilgilerini ekle
            .sort({ date: -1 });                  // Tarihe göre tersten sırala

        // Başarılı yanıtı istemciye gönderin
        res.status(200).json({
            success: true,
            count: transactions.length, // Bulunan işlem sayısı
            transactions: transactions  // İşlem verileri
        });

    } catch (error) {
        // Genel bir sunucu hatası oluşursa
        console.error('Tüm İşlemleri Listeleme Hatası:', error);
        // Hata middleware'ine yönlendirin veya standart bir hata mesajı gönderin
        next(new Error('Tüm işlemler listelenirken bir sunucu hatası oluştu.'));
    }
};



module.exports = {
    addTransaction,
    getTransactionsByCustomer,
    getAllTransactions
};