import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function Hero() {
  const navigate = useNavigate();

  const toProducts = () => {
    navigate("/products");
  };

  return (
    <section className=" from-white via-slate-50 to-slate-100 p-10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-8 lg:px-12 py-20 grid gap-10 lg:gap-16 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Belanja kebutuhan umum, fashion, dan elektronik jadi lebih mudah
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Temukan Kebutuhan Anda dengan Mudah di Lexx Store - Pilihan Terbaik
            untuk Fashion, Elektronik, dan Kebutuhan Sehari-hari.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              className="inline-flex cursor-pointer items-center justify-center px-6 py-3 rounded-full bg-slate-900 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
              onClick={toProducts}
            >
              Lihat Produk
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-4 text-sm text-slate-500">
            <div>
              <span className="block text-2xl font-semibold text-slate-900">
                Gratis Ongkir
              </span>
              Tanpa minimum belanja
            </div>
            <div>
              <span className="block text-2xl font-semibold text-slate-900">
                14 Hari Retur
              </span>
              Dijamin mudah
            </div>
            <div>
              <span className="block text-2xl font-semibold text-slate-900">
                500+
              </span>
              Brand pilihan
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="absolute -bottom-12 -right-8 h-32 w-32 rounded-full bg-slate-900/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[32px] shadow-2xl border border-white/80">
            <img
              src="https://upload.lexxganz.my.id/uploads/ecomerceHero.jpg"
              alt="Fashion outfit terbaru di Lexx Store"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
