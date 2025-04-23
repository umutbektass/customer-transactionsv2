// createUser.js

const mongoose = require('mongoose');
const User = require('./models/User'); // User modelini import ediyoruz

// --- BURAYI DEĞİŞTİRİN ---
// MongoDB Atlas bağlantı dizenizi buraya yapıştırın
// Dikkat: Şifrenizdeki özel karakterler sorun çıkarırsa encodeURIComponent kullanmanız gerekebilir.
const MONGO_URI = 'mongodb+srv://bektasbey78:riKW9XS3omkBdC2p@customer-transaction.uyrsblr.mongodb.net/customer-transactions?retryWrites=true&w=majority&appName=customer-transaction';
// Örnek: const MONGO_URI = 'mongodb+srv://bektasbey78:GUVENLI_SIFRE@mycluster.mongodb.net/customer-transactions?retryWrites=true&w=majority';
// <kullanici_adi>: Atlas'ta oluşturduğunuz veritabanı kullanıcısı (örn: bektasbey78)
// <sifre>: O kullanıcının şifresi
// <cluster_adresi>: Atlas kümenizin adresi (Atlas arayüzünden alabilirsiniz)
// <veritabani_adi>: Bağlanmak istediğiniz veritabanı adı (örn: customer-transactions)
// --- DEĞİŞTİRME SONU ---

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true, // Mongoose 6 ve sonrası için gerekli değil
      // useFindAndModify: false // Mongoose 6 ve sonrası için gerekli değil
    });
    console.log(`MongoDB Bağlandı: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Bağlantı Hatası: ${error.message}`);
    process.exit(1); // Bağlantı hatasında script'i sonlandır
  }
};

const createAdminUser = async () => {
  await connectDB(); // Önce veritabanına bağlan

  try {
    // Yeni kullanıcı bilgileri
    const username = 'admin';
    const password = 'admin1234'; // Schema pre-save hook bunu hash'leyecek
    const email = 'admin@example.com'; // Geçerli bir e-posta adresi olmalı, isterseniz değiştirin

    // Kullanıcının veya e-postanın zaten var olup olmadığını kontrol et
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      console.log(`Kullanıcı adı "${username}" veya e-posta "${email}" zaten mevcut.`);
      return; // Kullanıcı varsa ekleme yapma
    }

    // Yeni kullanıcıyı oluştur
    const user = new User({
      username: username,
      email: email,
      password: password,
      isAdmin: true // Schema'da default true ama yine de belirtilebilir
      // Diğer alanlar schema'daki varsayılan değerleri alacak
    });

    // Kullanıcıyı veritabanına kaydet
    await user.save();
    console.log(`"${username}" kullanıcısı başarıyla oluşturuldu!`);

  } catch (error) {
    console.error('Kullanıcı oluşturulurken hata:', error.message);
    if (error.errors) {
        // Mongoose validation hatalarını göster
        for (let field in error.errors) {
            console.error(`- ${error.errors[field].message}`);
        }
    }
  } finally {
    // İşlem bitince bağlantıyı kapat
    await mongoose.connection.close();
    console.log('MongoDB bağlantısı kapatıldı.');
  }
};

// Script'i çalıştır
createAdminUser();