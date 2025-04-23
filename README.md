# Müşteri Takip Sistemi (Customer Transactions) - Full Stack Uygulaması

Bu proje, müşteri ve işlem verilerini yönetmek amacıyla geliştirilmiş, RESTful API backend'i (Node.js/Express) ve modern bir kullanıcı arayüzünü (Next.js) içeren tam teşekküllü (full-stack) bir web uygulamasıdır. Bu uygulama, [Buraya görüşme yaptığınız pozisyonla ilgili vurgulamak istediğiniz 1-2 yetkinliği yazın, örn: REST API tasarımı, JWT tabanlı kimlik doğrulama, React/Next.js ile frontend geliştirme, MongoDB veri modelleme] konularındaki yetkinlikleri sergilemek amacıyla hazırlanmıştır.


## İçindekiler

- [Öne Çıkan Özellikler](#öne-çıkan-özellikler)
- [Kullanılan Teknolojiler](#kullanılan-teknolojiler)
- [Proje Yapısı](#proje-yapısı)
- [Gereksinimler](#gereksinimler)
- [Başlarken](#başlarken)
  - [Depoyu Klonlama](#depoyu-klonlama)
  - [Ortam Değişkenleri](#ortam-değişkenleri)
  - [Bağımlılıkların Kurulumu](#bağımlılıkların-kurulumu)
  - [Uygulamayı Çalıştırma](#uygulamayı-çalıştırma)
- [API Dokümantasyonu](#api-dokümantasyonu) - [Katkıda Bulunma](#katkıda-bulunma) - [Lisans](#lisans)

## Öne Çıkan Özellikler

- Rol tabanlı kullanıcı kimlik doğrulama (JWT ile)
- Müşteri ve işlem verileri için CRUD (Create, Read, Update, Delete) operasyonları
- Belirli olaylarda (örn. yeni kayıt) e-posta ile bildirim gönderimi
- [Varsa eklemek istediğiniz başka bir özellik]

## Kullanılan Teknolojiler

- **Backend:**
    - Node.js
    - Express.js (Web framework)
    - MongoDB (Mongoose ODM ile)
    - JSON Web Token (JWT) (Kimlik doğrulama)
    - Nodemailer (E-posta gönderimi)
    - [Varsa diğer backend kütüphaneleri, örn: bcrypt]
- **Frontend:**
    - Next.js (React framework)
    - React
    - [ UI kütüphanesi (Tailwind CSS, Material UI vb.), Veri çekme (Axios, SWR vb.)]
- **Veritabanı:**
    - MongoDB (Yerel veya MongoDB Atlas)

## Proje Yapısı

Repository, aşağıdaki gibi mantıksal olarak ayrılmış iki ana dizin içerir:


## Gereksinimler

Projeyi yerel makinenizde çalıştırabilmek için aşağıdaki araçların kurulu olması gerekmektedir:

- Node.js (v18.x veya daha güncel bir sürüm önerilir)
- npm (Node.js ile birlikte gelir) veya yarn
- Git Sürüm Kontrol Sistemi
- MongoDB (Yerel olarak veya MongoDB Atlas gibi bir bulut hizmeti üzerinden erişim)

## Başlarken

Projeyi yerel makinenize kurup çalıştırmak için aşağıdaki adımları izleyin.

### Depoyu Klonlama

```bash
# Kendi GitHub repo URL'niz ile değiştirin
git clone [https://github.com/umutbektass/customer-transactionsv2.git]
cd customer-transactionsv2




backend/.env
# Sunucu Yapılandırması
PORT=5000 # Backend API'nin çalışacağı port

MONGODB_URI= # MongoDB bağlantı adresiniz (Yerel veya Atlas)

# JWT Yapılandırması
JWT_SECRET= 
JWT_EXPIRES_IN=1h 

# E-posta Servisi Yapılandırması
EMAIL_HOST= # SMTP sunucu adresiniz (örn: smtp.example.com)
EMAIL_PORT=587 # SMTP portu (örn: 587, 465, 25)
EMAIL_USER= # E-posta gönderme yetkisi olan kullanıcı adı
EMAIL_PASS= # İlgili e-posta hesabının şifresi veya uygulama şifresi
EMAIL_FROM="Uygulama Adı <noreply@example.com>" # Gönderen e-posta adresi ve adı



frontend/.env

NEXTAUTH_SECRET= # NextAuth oturumları için gizli anahtar
API_URL=http://localhost:5000 # Yerelde çalışan backend için varsayılan adres