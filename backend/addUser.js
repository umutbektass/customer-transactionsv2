// addUser.js
const mongoose = require('mongoose');
const User = require('./models/User'); // User modelinizin dosya yolunu doğru belirttiğinizden emin olun
                                       // Örneğin, modeliniz projenizin kök dizinindeki User.js ise './User' olabilir.

// Veritabanı Bağlantı Bilgisi (Ortam değişkenlerinden veya doğrudan yazılabilir)
// .env dosyası kullanıyorsanız: require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/customer-tracker'; // Kendi bağlantı adresinizi yazın

// Komut satırı argümanlarını alma (node addUser.js kullaniciAdi email sifre)
const args = process.argv.slice(2);
const username = args[0];
const email = args[1];
const password = args[2];

// Gerekli argümanların kontrolü
if (!username || !email || !password) {
    console.error('Hata: Lütfen kullanıcı adı, e-posta ve şifreyi argüman olarak girin.');
    console.log('Kullanım: node addUser.js <kullaniciAdi> <email> <sifre>');
    process.exit(1); // Hata koduyla çık
}

// Veritabanına bağlanma ve kullanıcı ekleme fonksiyonu
const createUser = async () => {
    try {
        console.log('MongoDB\'ye bağlanılıyor...');
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB bağlantısı başarılı.');

        console.log(`'${username}' kullanıcısı oluşturuluyor...`);

        // Yeni kullanıcı nesnesi oluşturma
        // Bu aşamada şifre henüz hashlenmedi
        const newUser = new User({
            username: username,
            email: email,
            password: password,
            // Diğer alanlar şemadaki varsayılan değerleri alacaktır
            // Örneğin isAdmin: true, twoFactorEnabled: false vb.
        });

        // Kullanıcıyı kaydetme
        // BU ADIMDA pre('save') hook'u TETİKLENİR ve şifre hashlenir!
        const savedUser = await newUser.save();

        console.log('Kullanıcı başarıyla oluşturuldu!');
        console.log('---------------------------------');
        console.log(`ID: ${savedUser._id}`);
        console.log(`Kullanıcı Adı: ${savedUser.username}`);
        console.log(`E-posta: ${savedUser.email}`);
        console.log('Şifre veritabanına hashlenerek kaydedildi.');
        console.log('---------------------------------');

    } catch (error) {
        console.error('Kullanıcı oluşturulurken hata oluştu:', error.message);
        // Validation hatalarını gösterme (eğer varsa)
        if (error.errors) {
            Object.keys(error.errors).forEach(key => {
                console.error(`- ${error.errors[key].message}`);
            });
        }
         // Özellikle unique constraint hatası varsa belirtelim
         if (error.code === 11000) {
            console.error('Bu kullanıcı adı veya e-posta zaten mevcut.');
        }
    } finally {
        // Bağlantıyı kapat
        await mongoose.disconnect();
        console.log('MongoDB bağlantısı kapatıldı.');
    }
};

// Fonksiyonu çalıştırma
createUser();