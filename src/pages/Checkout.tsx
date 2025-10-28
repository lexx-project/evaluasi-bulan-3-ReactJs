import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";

import useCart from "@/components/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Navbar01 } from "@/components/ui/shadcn-io/navbar-01";

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export default function Checkout() {
  const {
    items,
    addItem,
    removeItem,
    clearItem,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const hasItems = items.length > 0;

  return (
    <>
      <Navbar01 />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Keranjang Belanja
              </h1>
              <p className="text-sm text-muted-foreground">
                Kelola produk yang ingin kamu checkout dan lanjutkan pembayaran.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
                {totalItems} item
              </span>
              <Button
                variant="outline"
                disabled={!hasItems}
                onClick={clearCart}
              >
                Kosongkan Keranjang
              </Button>
            </div>
          </header>

          {!hasItems ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-12 text-center">
              <p className="text-lg font-medium text-foreground">
                Keranjang belanja masih kosong.
              </p>
              <p className="text-sm text-muted-foreground">
                Ayo jelajahi produk kami dan tambahkan barang favoritmu.
              </p>
              <Button asChild>
                <Link to="/products">Lihat Produk</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
              <section className="space-y-4">
                {items.map((item) => (
                  <article
                    key={item.id}
                    className="flex flex-col gap-4 rounded-lg border bg-background p-4 shadow-sm sm:flex-row sm:items-center"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-24 w-24 self-center rounded-md border object-contain p-3 sm:self-start"
                    />
                    <div className="flex flex-1 flex-col gap-2">
                      <h2 className="text-base font-semibold text-foreground sm:text-lg">
                        {item.title}
                      </h2>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {currencyFormatter.format(item.price)} · Qty:{" "}
                        {item.quantity}
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        Total:{" "}
                        {currencyFormatter.format(item.price * item.quantity)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-2 sm:flex-col sm:items-stretch">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Kurangi jumlah ${item.title}`}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="min-w-[2rem] text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => addItem(item, 1)}
                          aria-label={`Tambah jumlah ${item.title}`}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => clearItem(item.id)}
                        aria-label={`Hapus ${item.title} dari keranjang`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </article>
                ))}
              </section>

              <aside className="flex h-fit flex-col gap-4 rounded-lg border bg-background p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-foreground">
                  Ringkasan Belanja
                </h2>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Total Item</span>
                  <span>{totalItems}</span>
                </div>
                <div className="flex items-center justify-between text-lg font-semibold text-foreground">
                  <span>Total Harga</span>
                  <span>{currencyFormatter.format(totalPrice)}</span>
                </div>
                <Button size="lg" disabled={!hasItems}>
                  Lanjutkan Pembayaran
                </Button>
                <Button asChild variant="ghost">
                  <Link to="/products">Tambah Produk Lain</Link>
                </Button>
              </aside>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
