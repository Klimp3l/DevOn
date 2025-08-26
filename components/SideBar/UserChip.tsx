'use client'

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

export default function UserChip({ session }: { session: any }) {
    return (
        <div className="p-3 sm:p-4 border-t">
            <div className="flex items-center gap-2 sm:gap-3">
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                    <AvatarImage src={session.user.image ?? ''} />
                    <AvatarFallback className="bg-devon-accent text-gray-700 text-sm">
                        {getInitials(session.user.name ?? session.user.loginName ?? 'User')}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                    <div className="font-medium truncate text-sm sm:text-base">{session.user.name || session.user.loginName}</div>
                    <div className="text-xs sm:text-sm text-gray-500 truncate">{session.user.email}</div>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => signOut()}
                    className="text-gray-500 hover:text-gray-700 h-8 w-8 sm:h-9 sm:w-9 p-0"
                    title="Sair"
                >
                    <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
            </div>
        </div>
    )
}