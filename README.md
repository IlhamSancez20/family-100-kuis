<div align="center">

# 🎮 KUIS INTERAKTIF FAMILY 100
### *Interactive Family 100 Game for Classroom & Events*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](#)
[![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=flat&logo=google&logoColor=white)](#)

---

> **Pilih Bahasa / Select Language:**
> - [🇮🇩 Bahasa Indonesia](#-bahasa-indonesia)
> - [🇬🇧 English](#-english)

---

</div>

<a id="-bahasa-indonesia"></a>
## 🇮🇩 BAHASA INDONESIA

<details open>
<summary><b>1. 📖 Deskripsi Kuis Interaktif Family 100</b></summary>

<br>

**Kuis Interaktif Family 100** adalah aplikasi kuis berbasis web yang dirancang khusus untuk menciptakan pengalaman belajar interaktif, seru, dan kompetitif di dalam kelas maupun acara umum. Terinspirasi dari acara televisi populer *Family 100*, aplikasi ini memungkinkan guru atau pemandu acara untuk menyajikan pertanyaan survei, mengelola skor tim secara otomatis, menampilkan efek suara, serta mengontrol alur permainan secara *real-time*.

**Fitur Utama:**
- 🎯 **Papan Jawaban Interaktif:** Efek animasi *tile flip* saat jawaban benar tertebak.
- ⏱️ **Timer & Efek Suara (Web Audio API):** Suara *ding*, *buzzer*, *tick*, *steal alert*, dan *fanfare* otomatis tanpa dependensi file audio eksternal.
- ❌ **Sistem Strike & Steal:** Visualisasi salah (X) interaktif dan otomatisasi alur perebutan poin.
- 📊 **Manajemen Soal (CRUD) & Integrasi Cloud:** Fitur tambah, edit, atau hapus soal lokal serta sinkronisasi ke Google Sheets via Google Apps Script (GAS).
- 🎨 **Kustomisasi Lengkap:** Ubah nama tim, judul kuis, serta dukungan mode *Dark/Light theme* dan multi-bahasa.
</details>

<details>
<summary><b>2. 💡 Kenapa Kuis Ini Dibuat?</b></summary>

<br>

Pengembangan media kuis interaktif ini dilatarbelakangi oleh beberapa alasan utama:
1. **Meningkatkan Keterlibatan Siswa:** Pembelajaran konvensional sering kali memicu kejenuhan. Dengan membawa format gim televisi ke ruang kelas, motivasi dan partisipasi aktif siswa meningkat secara signifikan.
2. **Efisiensi Pengajaran:** Membantu sesama pendidik dalam mengelola asesmen formatif yang menyenangkan tanpa perlu melakukan perhitungan skor manual.
3. **Pemanfaatan Teknologi Sederhana namun Efektif:** Memanfaatkan teknologi berbasis *browser* tanpa memerlukan spesifikasi perangkat tinggi.
</details>

<details>
<summary><b>3. ⚙️ Cara Instalasi, Pemasangan, dan Penggunaan</b></summary>

<br>

Aplikasi ini dirancang modular dan dapat dijalankan langsung di laptop atau komputer tanpa perlu *web server* lokal yang rumit (seperti XAMPP).

### 🚀 Cara 1: Menjalankan Secara Lokal (Offline / Standalone)
1. **Unduh File Proyek:**
   - Unduh seluruh file proyek yang terdiri dari `index.html`, `style.css`, `script.js`, dan `Code.gs`.
   - Simpan semua file (`index.html`, `style.css`, `script.js`) dalam satu folder yang sama.
2. **Jalankan Aplikasi:**
   - Klik ganda pada file `index.html` untuk membukanya di *browser* (Google Chrome, Mozilla Firefox, Edge, atau Safari).
   - Kuis langsung siap dimainkan dengan data soal bawaan.

---

### 🌐 Cara 2: Menyambungkan Backend Google Sheets (Google Apps Script)
Untuk menyimpan data soal dan riwayat permainan secara permanen di *cloud*:
1. **Buat Google Sheets Baru:**
   - Buka [Google Sheets](https://sheets.google.com) dan buat dokumen baru.
2. **Buka Apps Script Editor:**
   - Klik menu **Ekstensi** > **Apps Script**.
3. **Pasang Kode `Code.gs`:**
   - Hapus semua kode default di Apps Script editor, lalu salin seluruh isi file `Code.gs`.
   - Simpan proyek script tersebut.
4. **Deploy sebagai Web App:**
   - Klik tombol **Deploy** > **Deployment baru**.
   - Pilih jenis: **Aplikasi web**.
   - *Penerapan (Execute as):* **Saya (Me)**.
   - *Yang memiliki akses (Who has access):* **Siapa saja (Anyone)**.
   - Klik **Terapkan (Deploy)** dan berikan izin akses (*Authorize Access*).
   - Salin **Web App URL** yang dihasilkan.
5. **Hubungkan ke Frontend (`script.js`):**
   - Buka file `script.js`.
   - Pada baris pertama, ganti nilai variabel `GAS_API_URL` dengan URL yang telah disalin:
     ```javascript
     const GAS_API_URL = "URL_GOOGLE_APPS_SCRIPT_ANDA_DI_SINI";
     ```
   - Simpan file `script.js`.

---

### 🎮 Cara Penggunaan Dalam Permainan
1. **Persiapan:**
   - Tekan tombol **⚙️ Soal** di pojok kanan atas untuk menambah, mengedit, atau menghapus pertanyaan.
   - Ubah nama tim dengan mengklik ikon ✏️ di samping nama **TIM A** dan **TIM B**.
2. **Pelaksanaan Game:**
   - Buka soal dan ketik jawaban siswa pada kolom input di bawah papan kuis, lalu tekan **Enter** atau tombol **JAWAB**.
   - Jika jawaban benar, papan akan terbuka dan poin ditambahkan ke pot ronde.
   - Jika jawaban salah, tanda **Strike (X)** akan muncul. Pada strike ke-3, alur berpindah ke babak *steal turn*.
3. **Navigasi Host:**
   - Gunakan bilah kontrol pemandu di bagian bawah untuk pindah tim, reset strike, atau melangkah ke soal berikutnya.
</details>

<details>
<summary><b>4. 👨‍🏫 Profil Pembuat</b></summary>

<br>

- **Nama Pembuat:** Ilham Muhammad Furqon, S.Kom.
- **Profesi:** Guru SMPN 1 Kuningan (Tenaga Honorer / Guru Non-ASN)
- **Dedikasi:** Mengabdi dalam dunia pendidikan dengan berfokus pada integrasi teknologi informasi (TIK) dan media pembelajaran digital interaktif guna menciptakan suasana belajar yang inklusif dan menyenangkan bagi para peserta didik.
</details>

<details>
<summary><b>5. 🔓 Mengapa Proyek Ini Open-Source?</b></summary>

<br>

Proyek ini dirilis di bawah lisensi terbuka (*Open-Source*) dengan alasan:
- **Pemerataan Akses Media Pembelajaran:** Banyak sekolah dan guru di daerah yang membutuhkan alat bantu mengajar interaktif namun terkendala oleh biaya lisensi perangkat lunak berbayar.
- **Kolaborasi & Pengembangan:** Membuka kesempatan bagi rekan-rekan sesama pendidik, pengembang, dan komunitas edukasi untuk ikut serta mengembangkan, memodifikasi, dan memperkaya fitur aplikasi ini.
- **Bentuk Pengabdian:** Sebagai sarana berbagi manfaat dan ilmu pengetahuan kepada masyarakat luas tanpa batasan komersial.
</details>

<details>
<summary><b>6. 💖 Dukungan & Pendanaan (Donasi)</b></summary>

<br>

Jika aplikasi ini bermanfaat bagi kegiatan belajar-mengajar Anda dan Anda ingin memberikan apresiasi serta mendukung pengembangan proyek-proyek edukasi gratis lainnya, Anda dapat menyalurkan dukungan melalui:

* **Transfer Bank / Rekening:**
  > **Bank:** [Nama Bank, contoh: Bank BCA / Mandiri / BRI / BJB]
  > **No. Rekening:** [Isi Nomor Rekening Anda]
  > **Atas Nama:** Ilham Muhammad Furqon

* **QRIS / QR Code Donasi:**
  > *(Pindai QR Code melalui aplikasi GoPay, OVO, Dana, ShopeePay, atau Mobile Banking)*
  >
  > `<img src="https://via.placeholder.com/220x220.png?text=QRIS+Donasi" alt="QRIS Donasi" width="220" />`

Dukungan Anda sangat berarti bagi kelanjutan pengembangan media pembelajaran bebas biaya bagi dunia pendidikan Indonesia!
</details>

---

<a id="-english"></a>
## 🇬🇧 ENGLISH

<details>
<summary><b>1. 📖 Description of Interactive Family 100</b></summary>

<br>

**Interactive Family 100 Quiz** is a web-based quiz application specially designed to create an interactive, engaging, and competitive learning experience in classrooms or public events. Inspired by the popular television game show *Family 100*, this application allows teachers or event hosts to present survey questions, auto-calculate team scores, trigger built-in sound effects, and control game progression in real time.

**Key Features:**
- 🎯 **Interactive Answer Board:** Animated tile-flip effects when answers are guessed correctly.
- ⏱️ **Timer & Sound FX (Web Audio API):** Built-in ding, buzzer, tick, steal alert, and fanfare audio without external file dependencies.
- ❌ **Strike & Steal System:** Interactive visual strike indicators (X) with automated turn transitions.
- 📊 **Question Manager (CRUD) & Cloud Integration:** Local question management with optional Google Sheets backend integration via Google Apps Script (GAS).
- 🎨 **Full Customization:** Editable team names, app title, dark/light theme toggle, and dual-language support.
</details>

<details>
<summary><b>2. 💡 Why Was This Project Created?</b></summary>

<br>

The motivation behind developing this interactive media includes:
1. **Enhancing Student Engagement:** Traditional classroom routines can lead to reduced focus. Bringing a game-show format into teaching boosts student enthusiasm and active participation.
2. **Teacher Efficiency:** Assisting fellow educators in conducting fun formative assessments without manual score calculation hassle.
3. **Accessible Technology:** Utilizing browser-based lightweight technology that runs smoothly on standard hardware without heavy installation.
</details>

<details>
<summary><b>3. ⚙️ Installation, Setup, and Usage Guide</b></summary>

<br>

The application is modular and runs directly in any modern web browser without requiring a complex local web server setup (e.g., XAMPP).

### 🚀 Option 1: Local Setup (Offline / Standalone)
1. **Download Project Files:**
   - Save `index.html`, `style.css`, `script.js`, and `Code.gs` in the same directory on your machine.
2. **Run the Application:**
   - Double-click `index.html` to open it in any web browser (Google Chrome, Firefox, Edge, or Safari).
   - The game is immediately playable using default built-in questions.

---

### 🌐 Option 2: Connecting Google Sheets Cloud Backend (Google Apps Script)
To persistently store questions and match history in the cloud:
1. **Create a Google Sheet:**
   - Visit [Google Sheets](https://sheets.google.com) and start a new spreadsheet.
2. **Open Apps Script Editor:**
   - Navigate to **Extensions** > **Apps Script**.
3. **Insert `Code.gs` Content:**
   - Clear default code, paste the contents of `Code.gs`, and save the project.
4. **Deploy as Web App:**
   - Click **Deploy** > **New deployment**.
   - Select type: **Web app**.
   - *Execute as:* **Me**.
   - *Who has access:* **Anyone**.
   - Click **Deploy** and authorize access permissions.
   - Copy the generated **Web App URL**.
5. **Link Backend to Frontend (`script.js`):**
   - Open `script.js`.
   - Update the `GAS_API_URL` variable at the top with your Web App URL:
     ```javascript
     const GAS_API_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
     ```
   - Save `script.js`.

---

### 🎮 How to Play
1. **Setup:**
   - Click **⚙️ Soal** in the top right header to manage questions.
   - Click the ✏️ edit icon next to team names to rename **TIM A** and **TIM B**.
2. **Gameplay:**
   - Read the question and type student answers in the input box below the board, then press **Enter** or click **JAWAB**.
   - Correct answers flip tiles and add points to the round pot.
   - Incorrect answers trigger a **Strike (X)**. On the 3rd strike, the game moves to a steal turn.
3. **Host Navigation:**
   - Use the bottom control toolbar to switch turns, reset strikes, or proceed to the next question.
</details>

<details>
<summary><b>4. 👨‍🏫 Author Profile</b></summary>

<br>

- **Author Name:** Ilham Muhammad Furqon, S.Kom.
- **Role:** Teacher at SMPN 1 Kuningan (Non-ASN / Honorary Teacher)
- **Dedication:** Dedicated to education with a focus on ICT integration and interactive digital learning media to create inclusive and engaging classroom environments.
</details>

<details>
<summary><b>5. 🔓 Why Is This Open-Source?</b></summary>

<br>

This project is made open-source to:
- **Democratize Educational Tools:** Provide free, high-quality interactive learning media to schools and teachers who may lack budgets for proprietary software.
- **Encourage Collaboration:** Enable fellow educators and developers to customize, improve, and extend application features.
- **Give Back to Community:** Share knowledge and utility openly without commercial barriers.
</details>

<details>
<summary><b>6. 💖 Support & Funding (Donations)</b></summary>

<br>

If this project helps your teaching or events and you wish to support the author in creating more free educational tools, you can donate via:

* **Bank Transfer:**
  > **Bank:** [Bank Name, e.g., Bank BCA / Mandiri / BRI / BJB]
  > **Account Number:** [Fill Account Number]
  > **Account Name:** Ilham Muhammad Furqon

* **QRIS / QR Code Donation:**
  > *(Scan the QR code using any e-wallet or mobile banking application)*
  >
  > `<img src="https://via.placeholder.com/220x220.png?text=QRIS+Donation" alt="QRIS Donation" width="220" />`

Your support is deeply appreciated and helps sustain free educational innovation!
</details>

---

<div align="center">

*Made with ❤️ for Education by Ilham Muhammad Furqon, S.Kom.*

</div>
