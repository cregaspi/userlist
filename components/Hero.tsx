export function Hero() {
  return (
    <div
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #20B2AA 0%, #17998F 60%, #0d7a72 100%)" }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute -top-8 -right-8 w-48 h-48 rounded-full opacity-20"
        style={{ background: "rgba(255,255,255,0.3)" }}
      />
      <div
        className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full opacity-10"
        style={{ background: "rgba(255,255,255,0.4)" }}
      />
      <div
        className="absolute top-4 right-32 w-24 h-24 rounded-full opacity-15"
        style={{ background: "rgba(255,255,255,0.2)" }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.7)" }}>
          Directory
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight">
          User Directory
        </h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
          Browse and filter users by name, username, email, or company
        </p>
      </div>
    </div>
  );
}
