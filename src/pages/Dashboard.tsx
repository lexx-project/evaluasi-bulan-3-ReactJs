import { useState } from "react";

import useAuth from "@/components/hooks/useAuth";
import {
  useProducts,
  type ProductInput,
} from "@/components/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

type ProductDraft = {
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
};

const emptyDraft: ProductDraft = {
  title: "",
  price: 0,
  category: "",
  image: "",
  description: "",
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Dashboard() {
  const { user } = useAuth();
  const {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();
  const [draft, setDraft] = useState<ProductDraft>(emptyDraft);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const title = editingId ? "Edit Produk" : "Tambah Produk";

  const openCreateModal = () => {
    setDraft(emptyDraft);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (productId: number) => {
    const product = products.find((item) => item.id === productId);
    if (!product) {
      return;
    }

    setDraft({
      title: product.title,
      price: product.price,
      category: product.category,
      image: product.image,
      description: product.description,
    });
    setEditingId(productId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setDraft(emptyDraft);
    setIsSaving(false);
  };

  const handleDraftChange = <Key extends keyof ProductDraft>(
    key: Key,
    value: ProductDraft[Key]
  ) => {
    setDraft((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveDraft = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!draft.title.trim()) {
      return;
    }

    setIsSaving(true);

    const normalizedDraft = {
      title: draft.title.trim(),
      price: draft.price,
      category: draft.category.trim() || "General",
      image:
        draft.image.trim() || "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=300&q=80",
      description: draft.description.trim() || "Produk terbaru dari LexxStore.",
    };

    if (editingId) {
      updateProduct(editingId, normalizedDraft);
    } else {
      const payload: ProductInput = {
        ...normalizedDraft,
        rating: { rate: 0, count: 0 },
      };
      addProduct(payload);
    }

    closeModal();
  };

  return (
    <div className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Dashboard Admin
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Manajemen Produk
          </h1>
          {user ? (
            <p className="text-sm text-muted-foreground">
              Masuk sebagai{" "}
              <span className="font-semibold text-foreground">
                {user.username}
              </span>
            </p>
          ) : null}
        </div>
        <Button
          onClick={openCreateModal}
          className="self-start sm:self-auto"
          disabled={loading}
        >
          + Produk Baru
        </Button>
      </header>

      <section className="rounded-lg border bg-background shadow-sm">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-foreground">
            Daftar Produk ({products.length})
          </h2>
          <p className="text-sm text-muted-foreground">
            Tambah, ubah, atau hapus produk yang tampil di katalog user.
          </p>
        </div>
        <div className="divide-y">
          {loading ? (
            <p className="px-6 py-10 text-center text-sm text-muted-foreground">
              Memuat data produk…
            </p>
          ) : error ? (
            <p className="px-6 py-10 text-center text-sm text-red-500">
              Gagal memuat produk: {error}
            </p>
          ) : products.length === 0 ? (
            <p className="px-6 py-10 text-center text-sm text-muted-foreground">
              Belum ada produk. Tambahkan produk baru untuk mulai mengelola.
            </p>
          ) : (
            products.map((product) => (
              <article
                key={product.id}
                className="flex flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-20 w-20 rounded-md border object-cover"
                  />
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-foreground">
                      {product.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Kategori: {product.category || "General"}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {currencyFormatter.format(product.price)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 self-end sm:self-auto">
                  <Button
                    variant="outline"
                    onClick={() => openEditModal(product.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Hapus
                  </Button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      {isModalOpen ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 px-4 py-6 backdrop-blur">
          <div className="w-full max-w-lg rounded-lg border bg-background shadow-xl">
            <header className="px-6 py-4">
              <h2 className="text-xl font-semibold text-foreground">{title}</h2>
              <p className="text-sm text-muted-foreground">
                Isi detail produk lalu simpan perubahan.
              </p>
            </header>
            <Separator />
            <form className="px-6 py-4" onSubmit={handleSaveDraft}>
              <FieldGroup className="space-y-4">
                <Field>
                  <FieldLabel htmlFor="title">Nama Produk</FieldLabel>
                  <Input
                    id="title"
                    value={draft.title}
                    onChange={(event) =>
                      handleDraftChange("title", event.target.value)
                    }
                    placeholder="Contoh: Leather Backpack"
                    required
                  />
                </Field>
                <Field className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <FieldLabel htmlFor="price">Harga (IDR)</FieldLabel>
                    <Input
                      id="price"
                      type="number"
                      min={0}
                      value={draft.price}
                      onChange={(event) =>
                        handleDraftChange("price", Number(event.target.value))
                      }
                      placeholder="599000"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <FieldLabel htmlFor="category">Kategori</FieldLabel>
                    <Input
                      id="category"
                      value={draft.category}
                      onChange={(event) =>
                        handleDraftChange("category", event.target.value)
                      }
                      placeholder="Accessories"
                    />
                  </div>
                </Field>
                <Field>
                  <FieldLabel htmlFor="image">URL Gambar</FieldLabel>
                  <Input
                    id="image"
                    value={draft.image}
                    onChange={(event) =>
                      handleDraftChange("image", event.target.value)
                    }
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Kosongkan jika ingin menggunakan gambar bawaan.
                  </p>
                </Field>
                <Field>
                  <FieldLabel htmlFor="description">Deskripsi</FieldLabel>
                  <textarea
                    id="description"
                    value={draft.description}
                    onChange={(event) =>
                      handleDraftChange("description", event.target.value)
                    }
                    placeholder="Tuliskan deskripsi singkat produk."
                    className="min-h-[96px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </Field>
              </FieldGroup>
              <Separator className="my-4" />
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  className="sm:w-auto"
                  onClick={closeModal}
                  disabled={isSaving}
                >
                  Batal
                </Button>
                <Button type="submit" className="sm:w-auto" disabled={isSaving}>
                  {isSaving ? "Menyimpan..." : "Simpan"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
