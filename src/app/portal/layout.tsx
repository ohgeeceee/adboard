"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Monitor, Megaphone, Wallet, Settings, LogOut, ExternalLink, ImagePlus, ShoppingBag, Wrench, Headphones } from "lucide-react";

const nav = [
  ["/portal", "Overview", LayoutDashboard],
  ["/portal/screens", "My screens", Monitor],
  ["/portal/campaigns", "Campaigns", Megaphone],
  ["/portal/creative", "Creative library", ImagePlus],
  ["/portal/screen-manager", "Screen manager", Monitor],
  ["/portal/marketplace", "Buy screens", ShoppingBag],
  ["/portal/hardware", "Hardware & software", Wrench],
  ["/portal/support", "Tech support", Headphones],
  ["/portal/payouts", "Payouts", Wallet],
  ["/portal/settings", "Settings", Settings],
] as const;

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem("adboard-owner");
    router.push("/portal/login");
  };
  return (
    <div className="min-h-screen bg-ink text-white">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-white/10 bg-[#080b12] px-4 py-5 lg:block">
        <Link href="/" className="flex items-center gap-2.5 px-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-300 to-blue-500 font-black text-[#04121a]">A</span>
          <span className="font-bold">Ad<span className="text-cyan-300">Board</span><span className="ml-2 text-[10px] font-medium uppercase tracking-widest text-white/35">Owner</span></span>
        </Link>
        <p className="mt-10 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">Workspace</p>
        <nav className="mt-3 space-y-1">
          {nav.map(([href, label, Icon]) => <Link key={href} href={href} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${pathname === href ? "bg-cyan-300/10 text-cyan-200" : "text-white/55 hover:bg-white/5 hover:text-white"}`}><Icon className="h-4 w-4" />{label}</Link>)}
        </nav>
        <div className="absolute bottom-5 left-4 right-4 space-y-2 border-t border-white/10 pt-4">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 text-xs text-white/45 hover:text-white"><ExternalLink className="h-4 w-4" />View marketing site</Link>
          <button onClick={logout} className="flex w-full items-center gap-3 px-3 py-2 text-xs text-white/45 hover:text-white"><LogOut className="h-4 w-4" />Sign out</button>
        </div>
      </aside>
      <main className="lg:pl-64">
        <div className="border-b border-white/10 bg-[#080b12]/90 px-5 py-4 backdrop-blur-xl lg:px-10"><div className="flex items-center justify-between"><div><p className="text-xs text-white/40">Owner workspace</p><h1 className="text-lg font-semibold">Good morning, Alex</h1></div><div className="flex items-center gap-3"><span className="hidden rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-200 sm:inline-flex">● All systems live</span><div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-cyan-300 to-blue-500 text-sm font-bold text-[#04121a]">AR</div></div></div></div>
        <div className="p-5 lg:p-10">{children}</div>
      </main>
    </div>
  );
}
