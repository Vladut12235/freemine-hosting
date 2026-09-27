import './globals.css';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_right,_rgba(139,92,246,0.16),transparent_25%),#020817] text-white">
      <section className="mx-auto max-w-7xl px-6 py-12">
        <nav className="mb-16 flex items-center justify-between rounded-full border border-slate-800 bg-slate-900/60 px-5 py-3 shadow-neon backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 font-bold text-slate-950">F</div>
            <div>
              <div className="text-lg font-bold">FreeMine Hosting</div>
            </div>
          </div>
          <div className="hidden gap-6 text-sm text-slate-300 md:flex">
            <a href="#features">Features</a>
            <a href="#plans">Plans</a>
            <a href="#discord">Discord</a>
          </div>
          <a href="/dashboard" className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950">Dashboard</a>
        </nav>

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.26em] text-cyan-300">Free Minecraft Hosting</span>
            <h1 className="mt-6 text-5xl font-black leading-tight md:text-6xl">Create your Minecraft server in seconds.</h1>
            <p className="mt-6 max-w-xl text-lg text-slate-300">
              Real Java/Paper/Vanilla hosting with live console, backup automation, plugin support, dashboard monitoring, and Docker-backed resource isolation.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/dashboard" className="rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3 font-semibold text-slate-950">Create Server</a>
              <a href="/plans" className="rounded-xl border border-slate-700 bg-slate-900/70 px-6 py-3 font-semibold">View Plans</a>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-neon backdrop-blur">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-400">Server status</div>
                <div className="text-2xl font-bold">play.freemine.example</div>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-semibold text-emerald-300">ONLINE</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4"><div className="text-xs text-slate-400">RAM</div><div className="mt-2 text-2xl font-bold">2.1 / 4 GB</div></div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4"><div className="text-xs text-slate-400">CPU</div><div className="mt-2 text-2xl font-bold">14%</div></div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4"><div className="text-xs text-slate-400">Players</div><div className="mt-2 text-2xl font-bold">5 / 20</div></div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4"><div className="text-xs text-slate-400">TPS</div><div className="mt-2 text-2xl font-bold">19.98</div></div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold">Why FreeMine?</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[
            'Real Minecraft Servers',
            'Instant Setup',
            'Live Console',
            'Real Resources',
            'Plugin Manager',
            'Automatic Backups',
            'DDoS-aware architecture',
            '24/7 infrastructure monitoring',
          ].map((feature) => (
            <div key={feature} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="mb-3 h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500/30 to-violet-500/30" />
              <h3 className="text-xl font-semibold">{feature}</h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
