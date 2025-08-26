import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getInitials(name: string) {
    if (!name) return "";

    const words = name.trim().split(/\s+/); // separa pelas palavras
    const initials = words.map((word) => word[0].toUpperCase()); // pega a primeira letra de cada palavra

    return (initials[0] || "") + (initials[1] || ""); // retorna só as duas primeiras letras
}
