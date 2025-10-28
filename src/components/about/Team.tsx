export default function Team() {
  return (
    <section className="py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
            Tim Kami
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Orang-orang di balik Lexx Store yang berdedikasi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-slate-200">
            <img
              src="https://upload.lexxganz.my.id/uploads/my.png"
              alt="Team Member 1"
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
            />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Lexx</h3>
            <p className="text-indigo-600 font-medium mb-3">CEO & Founder</p>
            <p className="text-slate-600">
              Memimpin visi dan misi Lexx Store untuk menjadi destinasi fashion
              terdepan.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-slate-200">
            <img
              src="https://upload.lexxganz.my.id/uploads/Avatar.png"
              alt="Team Member 2"
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
            />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Evan</h3>
            <p className="text-indigo-600 font-medium mb-3">
              Chief Marketing Officer
            </p>
            <p className="text-slate-600">
              Bertanggung jawab atas strategi pemasaran dan komunikasi brand
              Lexx Store.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-slate-200">
            <img
              src="https://upload.lexxganz.my.id/uploads/Avatar.png"
              alt="Team Member 3"
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
            />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Putra{" "}
            </h3>
            <p className="text-indigo-600 font-medium mb-3">
              Head of Product Development
            </p>
            <p className="text-slate-600">
              Memastikan setiap produk yang kami tawarkan memenuhi standar
              kualitas tertinggi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
