<div align="center">

# Product Dashboard – React + TypeScript

Aplikasi katalog & dashboard e-commerce mini sebagai ujian bulanan React JS.

</div>

## ✨ Gambaran Umum

Project ini membangun pengalaman lengkap untuk pengguna dan admin:

- Pengunjung dapat melihat daftar produk, mem-filter, mencari, melihat detail, dan menambah ke keranjang.
- Admin (login khusus) dapat mengelola data produk melalui dashboard (CRUD simulasi) yang terhubung langsung dengan tampilan publik.
- Semua state global (auth, cart, produk) dikelola dengan Context API & custom hook.

## 🧭 Fitur Utama

- **Autentikasi simulasi** dengan penyimpanan `localStorage` (`user/user123` & `admin/admin123`).
- **Private route** untuk halaman checkout & dashboard.
- **Daftar produk publik** dengan pencarian dan filter kategori.
- **Detail produk** lengkap + tombol tambah keranjang atau editor khusus admin.
- **Dashboard admin** dengan penambahan, penyuntingan, dan penghapusan produk (disinkronkan ke halaman publik).
- **Keranjang belanja sederhana** (menambah, menghitung total item).
- **ErrorBoundary** khusus area produk agar aplikasi tidak crash.
- Optimisasi dengan `useMemo` dan `useCallback`.

## 🗺️ Routing

| Route           | Deskripsi                                     | Proteksi |
| --------------- | --------------------------------------------- | -------- |
| `/`             | Halaman landing (berisi hero dsb.)            | -        |
| `/products`     | Daftar produk publik                          | -        |
| `/products/:id` | Detail produk dinamis (add cart / edit admin) | -        |
| `/login`        | Halaman login simulasi                        | -        |
| `/checkout`     | Keranjang/checkout pengguna                   | Login    |
| `/dashboard`    | Manajemen produk (CRUD simulasi)              | Admin    |
| `/about`, dll.  | Halaman pendukung                             | -        |
| `*`             | Not Found                                     | -        |

## 🔐 Kredensial Login

| Peran | Username | Password   |
| ----- | -------- | ---------- |
| User  | `user`   | `user123`  |
| Admin | `admin`  | `admin123` |

> Setelah login sebagai admin kamu otomatis dapat mengakses `/dashboard`. Logout tersedia di navbar.

## 🧱 Struktur Konteks & Hook

- `useAuth` + `AuthProvider` → status login, role, login/logout.
- `useProducts` + `ProductProvider` → cache data API + CRUD lokal + helper `getProductById`.
- `useCart` + `CartProvider` → keranjang (item, total, add/remove).

Semua provider dibungkus di `src/main.tsx`, sehingga bisa diakses di seluruh aplikasi.

## 🛠️ Teknologi

- **React 19 + TypeScript + Vite**
- **React Router DOM v6**
- **Context API & Custom Hooks**
- **Tailwind CSS util classes** (via manual setup)
- **ESLint & TypeScript config** bawaan Vite

## 🚀 Menjalankan Project

```bash
npm install
npm run dev
```

Environment default Vite akan berjalan di `http://localhost:5173`.

## 📂 Folder Penting

```
src/
├── components/            # UI reusable, error boundary, kartu produk, dsb.
├── hooks/                 # useAuth, useCart, useProducts
├── pages/                 # Products, ProductDetail, Dashboard, Login, About, dsb.
├── components/ui/...      # Komponen shadcn.io yang disesuaikan
└── main.tsx               # Root render + provider
```

## 📝 Catatan

- CRUD di dashboard hanya simulasi (tidak mengirim ke server), tetapi tetap tersinkron dengan daftar produk publik selama sesi berjalan.
- Data dasar di-fetch dari [Fake Store API](https://fakestoreapi.com/products).
- Error pada area produk akan ditangani `ErrorBoundary` sehingga UI tetap aman.

---

Selamat mengeksplor kode & semoga project ini membantu dalam ujian React JS! 🎯
