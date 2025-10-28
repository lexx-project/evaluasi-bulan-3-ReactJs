export default function WhyUs() {
  return (
    <section className="py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
            Kenapa Memilih Lexx Store?
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Kami berkomitmen untuk memberikan pengalaman belanja terbaik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-slate-200">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-indigo-100 text-indigo-600">
              <img
                src="https://upload.lexxganz.my.id/uploads/Quality.png"
                alt="Quality Icon"
                className="w-15 h-15"
              />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Produk Berkualitas Tinggi
            </h3>
            <p className="text-slate-600">
              Kami hanya menyediakan produk fashion terbaik dari brand ternama
              dengan kualitas terjamin.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-slate-200">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-indigo-100 text-indigo-600">
              <img
                src="https://upload.lexxganz.my.id/uploads/besValue.png"
                alt="Best Price"
                className="w-15 h-15"
              />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Harga Terbaik
            </h3>
            <p className="text-slate-600">
              Dapatkan penawaran harga yang kompetitif dan diskon menarik setiap
              hari.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-slate-200">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-indigo-100 text-indigo-600">
              <img
                src="https://upload.lexxganz.my.id/uploads/CustomerServices.png"
                alt="Customer Services"
                className="w-15 h-15"
              />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Customer Services
            </h3>
            <p className="text-slate-600">
              Tim layanan pelanggan kami siap membantu Anda dengan ramah dan
              profesional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
