import { auth } from "@/auth";

export interface MenuItem {
  label: string;
  url: string;
  icon?: string;
  children: MenuItem[];
}

export async function getMenu(): Promise<MenuItem[]> {
  const session = await auth()

  console.log('[DEBUG] getMenu called at:', new Date().toISOString())
  console.log('[DEBUG] API_ENDPOINT:', process.env.API_ENDPOINT)
  console.log('[DEBUG] Session accessToken exists:', !!session?.accessToken)

  // Estratégia 1: Cache com revalidação a cada 5 minutos (mais eficiente)
  // const data = await fetch(`${process.env.API_ENDPOINT}/app/menu`, {
  //   headers: {
  //     "Authorization":  `Bearer ${session?.accessToken}`,
  //     "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600"
  //   },
  //   // Revalida a cada 5 minutos, mas serve dados antigos por até 10 minutos se a API estiver lenta
  //   next: { revalidate: 300 }
  // })

  // Estratégia 2: Se preferir forçar sempre dados frescos (menos eficiente):
  const fetchStart = Date.now()
  const data = await fetch(`${process.env.API_ENDPOINT}/app/menu`, {
    headers: {
      "Authorization":  `Bearer ${session?.accessToken}`,
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache",
      "Expires": "0"
    },
    cache: "no-store",
    next: { revalidate: 0 }
  })

  const fetchEnd = Date.now()
  console.log('[DEBUG] API fetch took:', fetchEnd - fetchStart, 'ms')
  console.log('[DEBUG] Response status:', data.status)
  console.log('[DEBUG] Response headers:', Object.fromEntries(data.headers.entries()))

  let menu = await data.json()
  console.log('[DEBUG] Menu items received:', menu.length)
  console.log('[DEBUG] First menu item:', menu[0])

  menu.unshift({
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      url: '/',
      children: []
  })
  menu.push({
      label: 'Configurações',
      icon: 'Settings',
      url: '/settings',
      children: []
  })

  return menu
} 