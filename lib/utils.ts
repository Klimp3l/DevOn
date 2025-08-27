import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as LucideIcons from 'lucide-react';
import { Circle } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getInitials(name: string) {
    if (!name) return "";

    const words = name.trim().split(/\s+/); // separa pelas palavras
    const initials = words.map((word) => word[0].toUpperCase()); // pega a primeira letra de cada palavra

    return (initials[0] || "") + (initials[1] || ""); // retorna só as duas primeiras letras
}

// Obtém um ícone pelo nome vindo da API (ex.: "LayoutDashboard", "Settings", etc.)
export const getMenuIconByName = (iconName?: string): React.ComponentType<any> => {
    if (iconName && (LucideIcons as any)[iconName]) {
        return (LucideIcons as any)[iconName] as React.ComponentType<any>;
    }
    return Circle;
};