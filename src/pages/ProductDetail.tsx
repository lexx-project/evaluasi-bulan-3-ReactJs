import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import useAuth from "@/components/hooks/useAuth";
import useCart from "@/components/hooks/useCart";
import { useProducts, type ProductInput } from "@/components/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Navbar01 } from "@/components/ui/shadcn-io/navbar-01";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = Number(id);

  const { products, loading, error, getProductById, updateProduct } =
    useProducts();
  const { addItem } = useCart();
  const { user } = useAuth();

  const product = useMemo(
    () => (Number.isNaN(productId) ? null : getProductById(productId)),
    [getProductById, productId]
  );

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [draft, setDraft] = useState<ProductInput | null>(null);

  useEffect(() => {
    if (!isEditing && product) {
      setDraft({
        title: product.title,
        price: product.price,
        category: product.category,
        image: product.image,
        description: product.description,
        rating: product.rating,
      });
    }
  }, [isEditing, product]);

  useEffect(() => {
    if (!loading && !error && Number.isNaN(productId)) {
      navigate("/products", { replace: true });
    }
  }, [loading, error, productId, navigate]);

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
  };

  const handleEditToggle = () => {
    if (!product) {
      return;
    }

    setIsEditing((prev) => !prev);
  };

  const handleDraftChange = <Key extends keyof ProductInput>(
    key: Key,
    value: ProductInput[Key]
  ) => {
    setDraft((prev) =>
      prev
        ? {
            ...prev,
            [key]: value,
          }
        : prev
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!product || !draft) {
      return;
    }

    setIsSaving(true);
    updateProduct(product.id, {
      ...draft,
      title: draft.title.trim() || product.title,
      category: draft.category.trim() || product.category,
      description: draft.description.trim() || product.description,
      image:
        draft.image.trim() ||
        product.image ||
        "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=300&q=80",
    });
    setIsSaving(false);
    setIsEditing(false);
  };

  const renderContent = () => {
    if (loading && products.length === 0) {
      return (
        <p className="p-20 text-center text-lg text-gray-500">
          Memuat detail produk…
        </p>
      );
    }

    if (error) {
      return (
        <p className="text-center text-lg text-red-500">
          Gagal memuat produk: {error}
        </p>
      );
    }

    if (!product) {
      return (
        <div className="space-y-4 rounded-lg border border-dashed px-6 py-10 text-center">
          <h2 className="text-xl font-semibold text-foreground">
            Produk tidak ditemukan
          </h2>
          <p className="text-sm text-muted-foreground">
            Produk mungkin telah dihapus atau tautan tidak valid.
          </p>
          <Button asChild>
            <Link to="/products">Kembali ke daftar produk</Link>
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-10">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,360px),1fr] lg:items-start">
          <div className="group relative w-full justify-self-center overflow-hidden rounded-3xl border border-muted bg-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl lg:justify-self-start">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
            <img
              src={product.image}
              alt={product.title}
              className="relative z-[1] aspect-[3/4] w-full max-w-sm bg-white object-contain p-8 transition-transform duration-500 group-hover:scale-105 lg:max-w-none"
            />
          </div>
          <div className="flex h-full flex-col justify-between rounded-3xl border border-muted bg-background/70 p-8 shadow-lg backdrop-blur">
            <div className="space-y-6">
              <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                {product.category}
              </span>
              <div className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {product.title}
                </h1>
                <p className="text-2xl font-semibold text-primary">
                  {currencyFormatter.format(product.price)}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground lg:text-base">
                {product.description}
              </p>
              <aside className="grid gap-3 rounded-2xl bg-muted/40 p-4 text-sm text-muted-foreground sm:grid-cols-2">
                <div className="flex flex-col rounded-lg bg-background px-4 py-3 shadow-sm">
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">
                    Rating
                  </span>
                  <span className="text-base font-semibold text-foreground">
                    {product.rating.rate} / 5
                  </span>
                </div>
                <div className="flex flex-col rounded-lg bg-background px-4 py-3 shadow-sm">
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">
                    Jumlah Ulasan
                  </span>
                  <span className="text-base font-semibold text-foreground">
                    {product.rating.count} ulasan
                  </span>
                </div>
              </aside>
            </div>
            <footer className="mt-10 flex flex-wrap gap-3 lg:mt-12">
              {user?.role === "admin" ? (
                <Button
                  onClick={handleEditToggle}
                  size="lg"
                  className="min-w-[200px]"
                >
                  {isEditing ? "Batalkan Edit" : "Edit Produk"}
                </Button>
              ) : (
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="min-w-[200px]"
                >
                  Tambah ke Keranjang
                </Button>
              )}
              <Button variant="ghost" asChild size="lg">
                <Link to="/products">Kembali</Link>
              </Button>
            </footer>
          </div>
        </section>
        {user?.role === "admin" ? (
          <section className="rounded-3xl border border-muted bg-background shadow-lg">
            <header className="px-6 py-5">
              <h2 className="text-xl font-semibold text-foreground">
                {isEditing ? "Perbarui Detail Produk" : "Informasi Produk"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {isEditing
                  ? "Ubah data produk lalu simpan perubahan."
                  : "Detail produk untuk referensi admin."}
              </p>
            </header>
            <Separator />
            {isEditing ? (
              <form className="px-6 py-5 space-y-4" onSubmit={handleSubmit}>
                <FieldGroup className="space-y-4">
                  <Field>
                    <FieldLabel htmlFor="title">Nama Produk</FieldLabel>
                    <Input
                      id="title"
                      value={draft?.title ?? ""}
                      onChange={(event) =>
                        handleDraftChange("title", event.target.value)
                      }
                      required
                    />
                  </Field>
                  <Field className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <FieldLabel htmlFor="price">Harga</FieldLabel>
                      <Input
                        id="price"
                        type="number"
                        min={0}
                        value={draft?.price ?? 0}
                        onChange={(event) =>
                          handleDraftChange("price", Number(event.target.value))
                        }
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <FieldLabel htmlFor="category">Kategori</FieldLabel>
                      <Input
                        id="category"
                        value={draft?.category ?? ""}
                        onChange={(event) =>
                          handleDraftChange("category", event.target.value)
                        }
                      />
                    </div>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="image">URL Gambar</FieldLabel>
                    <Input
                      id="image"
                      value={draft?.image ?? ""}
                      onChange={(event) =>
                        handleDraftChange("image", event.target.value)
                      }
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="description">Deskripsi</FieldLabel>
                    <textarea
                      id="description"
                      value={draft?.description ?? ""}
                      onChange={(event) =>
                        handleDraftChange("description", event.target.value)
                      }
                      className="min-h-[96px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </Field>
                </FieldGroup>
                <Separator className="my-4" />
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleEditToggle}
                    disabled={isSaving}
                  >
                    Batal
                  </Button>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 px-6 py-5 text-sm text-muted-foreground">
                <div className="flex items-center justify-between rounded-md bg-muted/40 px-4 py-3">
                  <span className="font-medium text-foreground">Kategori</span>
                  <span>{product.category}</span>
                </div>
                <div className="flex items-center justify-between rounded-md bg-muted/40 px-4 py-3">
                  <span className="font-medium text-foreground">Harga</span>
                  <span>{currencyFormatter.format(product.price)}</span>
                </div>
                <div className="flex items-center justify-between rounded-md bg-muted/40 px-4 py-3">
                  <span className="font-medium text-foreground">Rating</span>
                  <span>
                    {product.rating.rate} / 5 ({product.rating.count} ulasan)
                  </span>
                </div>
              </div>
            )}
          </section>
        ) : null}
      </div>
    );
  };

  return (
    <>
      <Navbar01 />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {renderContent()}
      </main>
    </>
  );
}
