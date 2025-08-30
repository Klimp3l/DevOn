import { auth } from "@/auth";

export interface MenuItem {
  label: string;
  url: string;
  icon?: string;
  children: MenuItem[];
}

export async function getMenu(): Promise<MenuItem[]> {
  const session = await auth()

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
  const data = await fetch(`${process.env.API_ENDPOINT}/app/menu`, {
    headers: { "Authorization":  `Bearer ${session?.accessToken}` },
    cache: "no-store",
    next: { revalidate: 0 }
  })

  let menu = await data.json()

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