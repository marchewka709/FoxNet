import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { LogIn, LogOut, Pencil, Plus, Trash2, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PageShell } from "@/components/PageShell";
import type { Product, ProductCategory } from "@/lib/products";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin – Foxnet" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [session, setSession] = useState<{ userId: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getSession();
      const uid = data.session?.user.id ?? null;
      setSession(uid ? { userId: uid } : null);
      if (uid) {
        const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", uid);
        setIsAdmin(!!roles?.some((r) => r.role === "admin"));
      } else {
        setIsAdmin(null);
      }
      setLoading(false);
    };
    check();
    const { data: sub } = supabase.auth.onAuthStateChange(() => check());
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : !session ? (
          <LoginCard />
        ) : isAdmin ? (
          <Dashboard />
        ) : (
          <NotAdminCard />
        )}
      </div>
    </PageShell>
  );
}

function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setSubmitting(false);
    if (error) toast.error(error.message);
    else toast.success("Signed in");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-md rounded-3xl border border-primary/10 bg-white p-8 shadow-elegant"
    >
      <h1 className="text-2xl font-bold text-primary">Admin panel</h1>
      <p className="mt-2 text-sm text-muted-foreground">Sign in to manage products.</p>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
        <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} />
        <button disabled={submitting} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-[1.01] disabled:opacity-70">
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
          Sign in
        </button>
      </form>
      <p className="mt-4 text-xs text-muted-foreground">
        Need an account? Ask a workspace admin to create one and grant the <code>admin</code> role.
      </p>
    </motion.div>
  );
}

function NotAdminCard() {
  return (
    <div className="mx-auto max-w-md rounded-3xl border border-destructive/20 bg-white p-8 text-center shadow-card">
      <h1 className="text-xl font-semibold text-primary">Access denied</h1>
      <p className="mt-2 text-sm text-muted-foreground">This account does not have the admin role.</p>
      <button onClick={() => supabase.auth.signOut()} className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
        <LogOut className="h-4 w-4" /> Sign out
      </button>
    </div>
  );
}

const emptyForm = {
  category: "cash_register" as ProductCategory,
  name: "",
  slug: "",
  short_description_pl: "",
  short_description_en: "",
  description_pl: "",
  description_en: "",
  features_pl: "",
  features_en: "",
  image_url: "",
  price: "",
  sort_order: 0,
};

function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data, error } = await supabase.from("products").select("*").order("category").order("sort_order");
    if (error) toast.error(error.message);
    else setProducts((data ?? []) as unknown as Product[]);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setCreating(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      category: p.category,
      name: p.name,
      slug: p.slug,
      short_description_pl: p.short_description_pl ?? "",
      short_description_en: p.short_description_en ?? "",
      description_pl: p.description_pl ?? "",
      description_en: p.description_en ?? "",
      features_pl: (p.features_pl ?? []).join("\n"),
      features_en: (p.features_en ?? []).join("\n"),
      image_url: p.image_url ?? "",
      price: p.price ?? "",
      sort_order: p.sort_order,
    });
    setCreating(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      category: form.category,
      name: form.name,
      slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      short_description_pl: form.short_description_pl || null,
      short_description_en: form.short_description_en || null,
      description_pl: form.description_pl || null,
      description_en: form.description_en || null,
      features_pl: form.features_pl.split("\n").map((s) => s.trim()).filter(Boolean),
      features_en: form.features_en.split("\n").map((s) => s.trim()).filter(Boolean),
      image_url: form.image_url || null,
      price: form.price || null,
      sort_order: Number(form.sort_order) || 0,
    };
    const { error } = editing
      ? await supabase.from("products").update(payload).eq("id", editing.id)
      : await supabase.from("products").insert(payload);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(editing ? "Updated" : "Created");
    setCreating(false);
    setEditing(null);
    load();
  };

  const remove = async (p: Product) => {
    if (!confirm(`Delete "${p.name}"?`)) return;
    const { error } = await supabase.from("products").delete().eq("id", p.id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Products</h1>
          <p className="text-sm text-muted-foreground">Manage cash registers and printers.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow">
            <Plus className="h-4 w-4" /> New product
          </button>
          <button onClick={() => supabase.auth.signOut()} className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-4 py-2.5 text-sm font-medium text-primary">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-left text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-primary/8">
                <td className="px-4 py-3 font-medium text-primary">{p.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.category === "cash_register" ? "Cash register" : "Printer"}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.price ?? "—"}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.sort_order}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openEdit(p)} className="mr-2 inline-flex items-center gap-1 rounded-full border border-primary/15 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/5">
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button onClick={() => remove(p)} className="inline-flex items-center gap-1 rounded-full border border-destructive/30 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/5">
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {!products.length && (
              <tr><td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">No products yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {creating && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/40 p-4 backdrop-blur-sm">
          <motion.form
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            onSubmit={save}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-elegant sm:p-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-primary">{editing ? "Edit product" : "New product"}</h2>
              <button type="button" onClick={() => setCreating(false)} className="rounded-full p-2 text-muted-foreground hover:bg-primary/5">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Category">
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as ProductCategory })} className={inputCls}>
                  <option value="cash_register">Cash register</option>
                  <option value="printer">Printer</option>
                </select>
              </Field>
              <Field label="Sort order">
                <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} className={inputCls} />
              </Field>
              <Field label="Name"><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} /></Field>
              <Field label="Slug"><input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto" className={inputCls} /></Field>
              <Field label="Price"><input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className={inputCls} /></Field>
              <Field label="Image URL"><input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className={inputCls} /></Field>
              <Field label="Short (PL)"><input value={form.short_description_pl} onChange={(e) => setForm({ ...form, short_description_pl: e.target.value })} className={inputCls} /></Field>
              <Field label="Short (EN)"><input value={form.short_description_en} onChange={(e) => setForm({ ...form, short_description_en: e.target.value })} className={inputCls} /></Field>
              <Field label="Description (PL)" full><textarea rows={3} value={form.description_pl} onChange={(e) => setForm({ ...form, description_pl: e.target.value })} className={inputCls} /></Field>
              <Field label="Description (EN)" full><textarea rows={3} value={form.description_en} onChange={(e) => setForm({ ...form, description_en: e.target.value })} className={inputCls} /></Field>
              <Field label="Features PL (one per line)" full><textarea rows={4} value={form.features_pl} onChange={(e) => setForm({ ...form, features_pl: e.target.value })} className={inputCls} /></Field>
              <Field label="Features EN (one per line)" full><textarea rows={4} value={form.features_en} onChange={(e) => setForm({ ...form, features_en: e.target.value })} className={inputCls} /></Field>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={() => setCreating(false)} className="rounded-full border border-primary/15 bg-white px-5 py-2.5 text-sm font-medium text-primary">Cancel</button>
              <button disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow">
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                {editing ? "Save changes" : "Create"}
              </button>
            </div>
          </motion.form>
        </div>
      )}
    </div>
  );
}

const inputCls = "w-full rounded-xl border border-input bg-white px-3 py-2.5 text-sm text-primary outline-none transition focus:border-primary-bright focus:ring-2 focus:ring-primary-bright/20";

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
