# 🏆 Web Application Kuis Family 100 - Tingkat SMP

Aplikasi Kuis Game Show interaktif Family 100 modern berbasis Web HTML5, CSS3 3D Neumorphism, Vanilla JavaScript ES6+, dan Google Apps Script (GAS) dengan database Google Sheets.

---

## 🛠️ CARA SETUP DATABASE & GOOGLE APPS SCRIPT

1. **Buat Google Sheets Baru**:
   - Buka [Google Sheets](https://sheets.google.com) dan buat dokumen baru.
2. **Buka Apps Script**:
   - Klik menu **Extensions (Ekstensi)** > **Apps Script**.
3. **Pasang Kode**:
   - Salin seluruh isi file `Code.gs` ke editor Apps Script.
   - Jalankan fungsi `setupDatabase()` sekali dari editor untuk membuat Sheet & Data Dummy awal secara otomatis.
4. **Deploy Web App**:
   - Klik tombol **Deploy** > **New deployment**.
   - Pilih jenis deployment: **Web app**.
   - Set **Execute as**: `Me (Email Anda)`.
   - Set **Who has access**: `Anyone` (Siapa Saja).
   - Klik **Deploy**, beri izin akses, dan salin **Web App URL**.

---

## 🚀 CARA MENJALANKAN APLIKASI WEB

1. Buka file `index.html` langsung di browser web (Google Chrome, Edge, Safari, Firefox) atau host via GitHub Pages / Netlify / Live Server.
2. Klik tombol **⚙️ Host Panel** di kanan atas web.
3. Tempelkan **Google Apps Script Web App URL** ke dalam kolom yang tersedia.
4. Klik **🔄 Sync Data dari Google Sheets**. Data soal dan jawaban akan langsung terhubung secara live.

---

## 🎮 PETUNJUK MEMAINKAN & RULE GAME SHOW

1. **Aturan Permainan**:
   - **Tim Aktif** menjawab soal satu per satu.
   - Setiap jawaban benar yang terbuka akan menambahkan nilai ke **Poin Sementara Ronde**.
   - Jika Tim Aktif melakukan **3 Kali Salah (3 Strike)**, giliran berpindah ke **Tim Lawan (Fase Steal)**.
   - **Fase Steal**: Tim lawan mendapat **1x kesempatan menjawab**. Jika benar, seluruh Poin Sementara ronde direbut. Jika salah, seluruh poin kembali ke tim awal.
2. **Kontrol Host/Operator**:
   - `Enter` / Tombol **Jawab**: Mengecek jawaban peserta.
   - Tombol **❌ Salah (Strike)**: Memicu indikator & bunyi buzzer salah secara manual.
   - Klik Papan Jawaban Tertutup pasca-ronde: Membuka slot jawaban tanpa menambah poin.
   - **Ganti Tim Aktif** & **Reset Strike**: Memudahkan navigasi host.
