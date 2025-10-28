export default function AboutStory() {
  return (
    <section className="py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
            Kisah Kami
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Perjalanan Lexx Store dari awal hingga kini.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="https://upload.lexxganz.my.id/uploads/Gemini_Generated_Image_dd5ai3dd5ai3dd5a%20(1).png"
              alt="Our Story"
              className="rounded-xl shadow-lg border border-slate-200 w-full h-auto object-cover"
            />
            <div className="absolute -bottom-4 -right-4 bg-indigo-600 w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              2025
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-lg text-slate-700 leading-relaxed">
              Lexx Store didirikan pada tahun 2025 dengan visi untuk merevolusi
              cara orang berbelanja fashion online. Berawal dari sebuah ide
              sederhana untuk menyediakan pakaian berkualitas tinggi dengan
              harga terjangkau, kami memulai perjalanan kami dengan koleksi
              kecil namun penuh gaya.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              Seiring berjalannya waktu, kami terus tumbuh dan mengembangkan
              diri, mendengarkan masukan pelanggan, dan beradaptasi dengan tren
              fashion terbaru. Kini, Lexx Store telah menjadi destinasi
              terpercaya bagi ribuan pelanggan yang mencari gaya, kualitas, dan
              kenyamanan dalam berbelanja.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              Kami percaya bahwa setiap orang berhak tampil percaya diri dengan
              busana yang mereka kenakan. Oleh karena itu, kami berkomitmen
              untuk terus berinovasi, menghadirkan koleksi terbaru, dan
              memberikan pelayanan terbaik untuk memenuhi kebutuhan fashion
              Anda.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
