export default function VisiMisi() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
            Visi & Misi Kami
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Mengarahkan langkah kami menuju masa depan fashion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-slate-200">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-purple-100 text-purple-600">
              <img
                src="https://upload.lexxganz.my.id/uploads/visi.png"
                alt=""
              />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Visi</h3>
            <p className="text-slate-600">
              Menjadi destinasi fashion online terkemuka yang menginspirasi gaya
              dan kepercayaan diri melalui koleksi produk berkualitas tinggi dan
              pengalaman belanja yang tak tertandingi.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-slate-200">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-purple-100 text-purple-600">
              <img
                src="https://upload.lexxganz.my.id/uploads/Misi.png"
                alt=""
              />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Misi</h3>
            <p className="text-slate-600">
              Menyediakan beragam pilihan produk fashion terkini dari brand
              lokal dan internasional, memastikan kualitas terbaik, dan
              memberikan pelayanan pelanggan yang responsif dan personal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
