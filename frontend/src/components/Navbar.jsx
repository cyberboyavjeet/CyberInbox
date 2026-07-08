function Navbar() {
  return (
    <nav className="w-full bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-400">
          🛡 CyberInbox
        </h1>

        <span className="text-slate-400 text-sm">
          AI Email Spam Detection
        </span>
      </div>
    </nav>
  );
}

export default Navbar;