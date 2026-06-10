/** Bandeau permanent obligatoire (REQ-14) — visible sur tout l'espace démo. */
export default function DemoBanner() {
  return (
    <div className="bg-[#cc2200] text-white text-center text-xs sm:text-sm font-semibold px-4 py-2 flex items-center justify-center gap-2">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0" aria-hidden="true">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
      <span>COMPTE DÉMO — Les données affichées sont fictives</span>
    </div>
  )
}
