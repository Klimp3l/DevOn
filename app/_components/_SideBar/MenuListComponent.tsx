import { getMenu, MenuItem } from '@/app/(protected)/_data_acces/menu/api';
import MenuList from '@/app/_components/_SideBar/MenuIList';

export default async function MenuListComponent() {
    const menu: MenuItem[] = await getMenu();

    return <MenuList menu={menu} />;
}