'use client'

import { getInitials } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuShortcut
} from "@/components/ui/dropdown-menu";
import {
    Bell,
    Settings,
    LogOut,
    User,
    Shield,
    HelpCircle,
    MessageSquare,
    ChevronDown
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function TopBar({ session }: { session: any }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleSettingsClick = () => {
        router.push('/settings');
        setIsOpen(false);
    };

    const handleProfileClick = () => {
        router.push('/profile');
        setIsOpen(false);
    };

    const handleHelpClick = () => {
        router.push('/help');
        setIsOpen(false);
    };

    const handleLogout = async () => {
        setIsOpen(false);
        signOut();
    };

    const handleNotificationsClick = () => {
        // Implementar lógica de notificações
        console.log('Abrir notificações');
    };

    return (
        <header className="sticky top-0 z-30 h-16 flex items-center justify-end gap-2 sm:gap-4 px-4 sm:px-6 bg-white border-b shadow-sm">
            <Button
                variant="ghost"
                size="icon"
                aria-label="Notificações"
                onClick={handleNotificationsClick}
                className="relative hover:bg-gray-100 transition-colors"
            >
                <Bell size={18} className="sm:w-5 sm:h-5" />
                {/* Indicador de notificações não lidas */}
                <span className="absolute -top-1 -right-1 h-2 w-2 sm:h-3 sm:w-3 bg-red-500 rounded-full border border-white"></span>
            </Button>

            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex items-center gap-2 px-2 sm:px-3 py-2 rounded-full hover:bg-gray-100"
                    >
                        <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                            <AvatarImage src={session?.user?.image ?? ''} />
                            <AvatarFallback className="bg-devon-accent text-gray-700 text-sm">
                                {getInitials(session?.user?.name ?? session?.user?.loginName ?? 'User')}
                            </AvatarFallback>
                        </Avatar>
                        <ChevronDown
                            size={14}
                            className={`transition-transform duration-200 sm:w-4 sm:h-4 ${isOpen ? 'rotate-180' : ''}`}
                        />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    className="w-72 p-2 bg-white border border-gray-200 shadow-lg rounded-lg"
                    sideOffset={8}
                >
                    <DropdownMenuLabel className="px-3 py-2">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 sm:h-12 sm:w-12 ring-2 ring-gray-200">
                                <AvatarImage
                                    src={session?.user?.image || ""}
                                    alt={session?.user?.name || 'Usuário'}
                                />
                                <AvatarFallback className="bg-devon-accent text-gray-700">
                                    {getInitials(session?.user?.name || 'Usuário')}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col min-w-0">
                                <p className="text-sm font-semibold text-gray-900 leading-tight truncate">
                                    {session?.user?.name || 'Usuário'}
                                </p>
                                <p className="text-xs text-gray-500 leading-tight truncate">
                                    {session?.user?.email || 'email@exemplo.com'}
                                </p>
                                <div className="flex items-center gap-1 mt-1">
                                    <Shield size={10} className="text-green-500 sm:w-3 sm:h-3" />
                                    <span className="text-xs text-green-600 font-medium">Ativo</span>
                                </div>
                            </div>
                        </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator className="my-2" />

                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            onClick={handleProfileClick}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            <User size={14} className="text-gray-600 sm:w-4 sm:h-4" />
                            <Link href="/settings" className="text-sm text-gray-700">Meu Perfil</Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={handleSettingsClick}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            <Settings size={14} className="text-gray-600 sm:w-4 sm:h-4" />
                            <Link href="/settings" className="text-sm text-gray-700">Configurações</Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={handleHelpClick}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            <HelpCircle size={14} className="text-gray-600 sm:w-4 sm:h-4" />
                            <Link href="/help" className="text-sm text-gray-700">Ajuda & Suporte</Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            <MessageSquare size={14} className="text-gray-600 sm:w-4 sm:h-4" />
                            <Link href="/feedback" className="text-sm text-gray-700">Feedback</Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator className="my-2" />

                    <DropdownMenuItem
                        onClick={handleLogout}
                        variant="destructive"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-red-50 transition-colors cursor-pointer text-red-600 hover:text-red-700"
                    >
                        <LogOut size={14} className="text-red-500 sm:w-4 sm:h-4" />
                        <span className="text-sm font-medium">Sair da Conta</span>
                        <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    )
}