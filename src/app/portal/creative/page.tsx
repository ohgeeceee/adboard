"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Check, FileImage, ImagePlus, Trash2, UploadCloud } from "lucide-react";

type Creative = { name: string; type: string; size: string; url: string; uploaded: string };

export default function CreativeLibrary() {
  const [creative, setCreative] = useState<Creative[]>([]);
  const [selected, setSelected] = useState<Creative | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try { setCreative(JSON.parse(localStorage.getItem("adboard-creatives") || "[]")); } catch { setCreative([]); }
  }, []);

  const upload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setMessage("Please choose a PNG, JPG, SVG, or WebP image."); return; }
    if (file.size > 10 * 1024 * 1024) { setMessage("That file is over the 10 MB limit."); return; }
    const next: Creative = { name: file.name, type: file.type, size: `${(file.size / 1024 / 1024).toFixed(2)} MB`, url: URL.createObjectURL(file), uploaded: "Just now" };
    const updated = [next, ...creative]; setCreative(updated); setSelected(next); setMessage("Creative uploaded to your browser library.");
    localStorage.setItem("adboard-creatives", JSON.stringify(updated));
  };
  const remove = (name: string) => { const updated = creative.filter(item => item.name !== name); setCreative(updated); setSelected(null); localStorage.setItem("adboard-creatives", JSON.stringify(updated)); };
  return <div className="mx-auto max-w-7xl space-y-7"><div><p className="text-sm text-cyan-300">Creative studio</p><h2 className="mt-2 text-3xl font-bold">Your creative library</h2><p className="mt-2 text-sm text-white/50">Upload the art your audience should see. We’ll validate it before it reaches a screen.</p></div>
    <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]"><section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"><div className="rounded-2xl border border-dashed border-cyan-300/35 bg-cyan-300/5 p-10 text-center"><UploadCloud className="mx-auto h-10 w-10 text-cyan-200"/><h3 className="mt-4 text-lg font-semibold">Drop your artwork here</h3><p className="mx-auto mt-2 max-w-sm text-sm text-white/45">PNG, JPG, SVG, or WebP · up to 10 MB · landscape banners recommended</p><label className="mx-auto mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-300 to-blue-400 px-4 py-2.5 text-sm font-semibold text-[#04121a]"> <ImagePlus className="h-4 w-4"/>Choose artwork<input type="file" accept="image/png,image/jpeg,image/svg+xml,image/webp" onChange={upload} className="hidden"/></label>{message && <p className="mt-4 text-xs text-cyan-200">{message}</p>}</div><div className="mt-6 grid gap-3 sm:grid-cols-2">{creative.length===0?<div className="col-span-full rounded-xl border border-white/10 p-8 text-center text-sm text-white/40">Your uploaded artwork will appear here.</div>:creative.map(item=><button key={item.name} onClick={()=>setSelected(item)} className={`overflow-hidden rounded-xl border text-left transition ${selected?.name===item.name?"border-cyan-300":"border-white/10 hover:border-white/25"}`}><div className="flex h-36 items-center justify-center bg-black/40">{item.url?<img src={item.url} alt={item.name} className="max-h-full max-w-full object-contain"/>:<FileImage className="h-8 w-8 text-white/30"/>}</div><div className="p-3"><p className="truncate text-sm font-medium">{item.name}</p><p className="mt-1 text-[11px] text-white/40">{item.size} · {item.uploaded}</p></div></button>)}</div></section>
      <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"><h3 className="font-semibold">Creative checklist</h3><div className="mt-5 space-y-4">{["High contrast and readable at distance","No prohibited or misleading content","Correct aspect ratio for the selected screen","Logo and brand marks have clear space"].map(text=><div key={text} className="flex gap-3 text-sm text-white/60"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-emerald-200"><Check className="h-3 w-3"/></span>{text}</div>)}</div>{selected&&<div className="mt-8 border-t border-white/10 pt-6"><p className="text-xs uppercase tracking-widest text-white/35">Selected file</p><p className="mt-3 truncate text-sm font-semibold">{selected.name}</p><button onClick={()=>remove(selected.name)} className="mt-5 inline-flex items-center gap-2 text-xs text-rose-200"><Trash2 className="h-3.5 w-3.5"/>Remove creative</button></div>}</aside></div>
  </div>;
}
