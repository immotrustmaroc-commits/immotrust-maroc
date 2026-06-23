import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Gate « Coming Soon » — recouvre tout le site (front + démo) par la page
 * /coming-soon, SANS rien supprimer. Pour réactiver le site : supprimer ce
 * fichier (ou la ligne du matcher). Réversible à 100 %.
 *
 * Bypass équipe : ouvrir n'importe quelle page avec ?preview=SMAP2026 pose un
 * cookie qui laisse passer pendant 7 jours (pour continuer à démontrer en interne).
 */

const PREVIEW_TOKEN = 'SMAP2026'
const PREVIEW_COOKIE = 'immotrust_preview'

export function proxy(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('preview')

  // Active l'accès aperçu et mémorise via cookie.
  if (token === PREVIEW_TOKEN) {
    const res = NextResponse.next()
    res.cookies.set(PREVIEW_COOKIE, PREVIEW_TOKEN, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax',
    })
    return res
  }

  // Déjà autorisé (cookie présent) → site normal.
  if (request.cookies.get(PREVIEW_COOKIE)?.value === PREVIEW_TOKEN) {
    return NextResponse.next()
  }

  // Sinon : on réécrit vers la page Coming Soon (l'URL reste inchangée).
  const url = request.nextUrl.clone()
  url.pathname = '/coming-soon'
  return NextResponse.rewrite(url)
}

export const config = {
  // Tout sauf : la page coming-soon, les assets Next, le favicon, et tout
  // fichier statique (contenant un point : .png, .jpg, .svg, .ico…).
  matcher: ['/((?!coming-soon|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
