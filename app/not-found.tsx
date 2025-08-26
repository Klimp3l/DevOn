'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft, Home } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export default function NotFound() {
    const router = useRouter()
    const { status } = useSession()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (status === 'loading') {
            setIsLoading(true)
            return
        }
        setIsAuthenticated(status === 'authenticated')
        setIsLoading(false)
    }, [status])

    const handleGoBack = () => {
        if (typeof window !== 'undefined' && window.history.length > 1) {
            router.back()
        } else {
            // Se não há histórico, redireciona para a página apropriada
            if (isAuthenticated) {
                router.push('/')
            } else {
                router.push('/login')
            }
        }
    }

    // Mostrar loading enquanto verifica autenticação
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center max-w-md mx-auto px-6">
                <div className="text-8xl font-bold text-muted-foreground mb-4">404</div>
                <h1 className="text-2xl font-bold text-foreground mb-2">Página não encontrada</h1>
                <p className="text-muted-foreground mb-8">
                    A página que você está procurando não existe ou foi movida.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild variant="default">
                        <Link href={isAuthenticated ? "/" : "/login"}>
                            <Home className="w-4 h-4 mr-2" />
                            {isAuthenticated ? "Voltar ao Dashboard" : "Voltar ao Início"}
                        </Link>
                    </Button>
                    <Button onClick={handleGoBack} variant="outline">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Página Anterior
                    </Button>
                </div>
            </div>
        </div>
    )
}