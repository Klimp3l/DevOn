'use client'

import UserChip from "@/app/_components/_SideBar/UserChip"
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { useSidebar } from "@/hooks/useSidebar";

export default function SideBar({ children, session }: { children: React.ReactNode, session: Session }) {
    const { isSidebarOpen, openSidebar, closeSidebar } = useSidebar();

    return (
        <>
            {/* Mobile sidebar toggle */}
            {
                isSidebarOpen && (
                    <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden" onClick={closeSidebar} />
                )
            }

            <div className="fixed left-2 sm:left-4 top-2 z-50 lg:hidden">
                {!isSidebarOpen && (
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={openSidebar}
                        className="bg-white shadow-md h-9 w-9 sm:h-10 sm:w-10"
                    >
                        <Menu size={18} className="sm:w-5 sm:h-5" />
                    </Button>
                )}
            </div>

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out bg-white border-r lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-4 sm:p-6 border-b">
                        <div className="text-lg sm:text-xl font-bold text-devon-darkgreen">DevOn</div>
                    </div>

                    {/* Navigation */}
                    {children}

                    {/* User */}
                    <UserChip session={session} />
                </div>
            </div>

        </>
    )
}