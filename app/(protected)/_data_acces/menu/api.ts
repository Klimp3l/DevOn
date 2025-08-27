import { auth } from "@/auth";

export interface MenuItem {
  label: string;
  url: string;
  icon?: string;
  children: MenuItem[];
}

export async function getMenu(): Promise<MenuItem[]> {
  const session = await auth()
    
  const data = await fetch(`${process.env.API_ENDPOINT}/app/menu`, {
    headers: { "Authorization":  `Bearer ${session?.accessToken}` }
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