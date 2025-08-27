'use client'

import { useIsMobile } from "@/hooks/use-mobile";
import { useSidebar } from "@/hooks/useSidebar";
import { getMenuIconByName } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface MenuItem {
    label: string;
    url: string;
    icon?: string;
    children: MenuItem[];
}

interface MenuItemComponentProps {
    item: MenuItem;
    level?: number;
    onItemClick?: () => void;
    expandedItems: Set<string>;
    setExpandedItems: (items: Set<string>) => void;
    allMenuItems: MenuItem[];
}

interface DynamicMenuProps {
    onItemClick?: () => void;
}

export function MenuItem({ item, expandedItems, setExpandedItems, allMenuItems }: MenuItemComponentProps) {
    const pathname = usePathname();
    const isMobile = useIsMobile();
    const { closeSidebar } = useSidebar();

    const level = 0;

    const hasChildren = item.children && item.children.length > 0;
    const isActive = pathname === item.url;
    const isChildActive = hasChildren && item.children.some(child =>
        pathname === child.url || pathname.startsWith(child.url + '/')
    );
    const isExpanded = expandedItems.has(item.url);

    // Obter o ícone para este item do menu usando nome vindo da API quando existir
    const MenuIcon = getMenuIconByName(item.icon);

    const handleClick = () => {
        if (hasChildren) {
            const newExpandedItems = new Set(expandedItems);

            if (isExpanded) {
                // Se está expandido, fecha este item e todos os seus filhos
                newExpandedItems.delete(item.url);
                // Remove todos os filhos recursivamente
                const removeChildren = (menuItem: MenuItem) => {
                    if (menuItem.children) {
                        menuItem.children.forEach(child => {
                            newExpandedItems.delete(child.url);
                            removeChildren(child);
                        });
                    }
                };
                removeChildren(item);
            } else {
                // Se não está expandido, abre este item e fecha outros no mesmo nível
                newExpandedItems.add(item.url);

                // Fecha outros itens no mesmo nível (exceto o item atual)
                const closeSiblingsAtSameLevel = (menuItems: MenuItem[], currentLevel: number, targetLevel: number) => {
                    menuItems.forEach(menuItem => {
                        if (currentLevel === targetLevel && menuItem.url !== item.url) {
                            // Fecha este item e todos os seus filhos
                            newExpandedItems.delete(menuItem.url);
                            const removeChildren = (childItem: MenuItem) => {
                                if (childItem.children) {
                                    childItem.children.forEach(child => {
                                        newExpandedItems.delete(child.url);
                                        removeChildren(child);
                                    });
                                }
                            };
                            removeChildren(menuItem);
                        } else if (menuItem.children) {
                            closeSiblingsAtSameLevel(menuItem.children, currentLevel + 1, targetLevel);
                        }
                    });
                };

                // Fecha irmãos no nível atual
                closeSiblingsAtSameLevel(allMenuItems, 0, level);
            }

            setExpandedItems(newExpandedItems);
        } else {
            // Se não tem filhos, fecha o sidebar no mobile
            if (isMobile) {
                closeSidebar();
            }
        }
    };

    return (
        <div
            className="space-y-1 animate-in fade-in-0 slide-in-from-left-2 duration-300"
            style={{
                animationDelay: `${level * 50}ms`
            }}
        >
            <Link href={item.url}>
                <div
                    className={`flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-[1.02] ${isActive || isChildActive
                        ? 'bg-primary text-white shadow-md'
                        : 'hover:bg-devon-light text-gray-600 hover:text-devon-darkgreen hover:shadow-sm'
                        }`}
                    onClick={handleClick}
                >
                    <div className="flex items-center gap-2 sm:gap-3 flex-1">
                        <div className="transition-transform duration-200 ease-in-out hover:scale-110">
                            <MenuIcon size={16} className="sm:w-[18px] sm:h-[18px]" />
                        </div>
                        <span className="font-medium text-sm sm:text-base">{item.label}</span>
                    </div>
                    {hasChildren && (
                        <div className="flex-shrink-0">
                            <div
                                className="transition-transform duration-300 ease-in-out"
                                style={{
                                    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                            >
                                <ChevronRight size={14} className="sm:w-4 sm:h-4" />
                            </div>
                        </div>
                    )}
                </div>
            </Link>

            {hasChildren && (
                <div
                    className={`ml-3 sm:ml-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${isExpanded
                        ? 'max-h-screen opacity-100'
                        : 'max-h-0 opacity-0'
                        }`}
                    style={{
                        transform: isExpanded ? 'translateY(0)' : 'translateY(-10px)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                >
                    <div className="space-y-1 p-2">
                        {item.children.map((child, index) => (
                            <MenuItem
                                key={`${child.url}-${index}`}
                                item={child}
                                level={level + 1}
                                expandedItems={expandedItems}
                                setExpandedItems={setExpandedItems}
                                allMenuItems={allMenuItems}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}


export default function MenuList({ menu }: { menu: MenuItem[] }) {
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

    return (
        <nav className="flex-1 p-3 sm:p-4 space-y-4 sm:space-y-6 overflow-y-auto animate-in fade-in-0 slide-in-from-top-4 duration-500">
            {menu.map((item, index) => (
                <div
                    key={`${item.url}-${index}`}
                    className="animate-in fade-in-0 slide-in-from-left-2 duration-300"
                    style={{
                        animationDelay: `${index * 100}ms`
                    }}
                >
                    <MenuItem
                        item={item}
                        expandedItems={expandedItems}
                        setExpandedItems={setExpandedItems}
                        allMenuItems={menu}
                    />
                </div>
            ))}
        </nav>
    )
}
