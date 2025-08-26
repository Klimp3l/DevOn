"use client"

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Shield, Users, Settings, Activity, TrendingUp } from "lucide-react";
import Link from "next/link";

const adminCategories = [
    {
        id: 1,
        title: 'Usuários',
        description: 'Gerenciar usuários do sistema',
        icon: Users,
        href: '/admin/users',
        count: 324,
        color: 'text-quizzer.green'
    },
    {
        id: 2,
        title: 'Contas',
        description: 'Gerenciar contas e permissões',
        icon: Shield,
        href: '/admin/accounts',
        count: 156,
        color: 'text-quizzer-accent'
    }
];

const recentActivities = [
    { id: 1, action: 'Novo usuário registrado', user: 'João Silva', time: 'Há 5 minutos' },
    { id: 2, action: 'Permissão atualizada', user: 'Maria Santos', time: 'Há 15 minutos' },
    { id: 3, action: 'Conta desativada', user: 'Pedro Costa', time: 'Há 1 hora' },
    { id: 4, action: 'Novo administrador adicionado', user: 'Ana Oliveira', time: 'Há 2 horas' }
];

export default function AdminPage() {

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-xl sm:text-2xl font-bold">Administração</h1>
                <Button className="w-full sm:w-auto">
                    <Settings className="mr-2 h-4 w-4" />
                    Configurações
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Total de Usuários
                        </CardTitle>
                        <Users className="h-5 w-5 text-quizzer.green" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold">324</div>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            12 novos este mês
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Contas Ativas
                        </CardTitle>
                        <Shield className="h-5 w-5 text-quizzer-accent" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold">156</div>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            8 novas este mês
                        </p>
                    </CardContent>
                </Card>

                <Card className="sm:col-span-2 lg:col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Administradores
                        </CardTitle>
                        <Activity className="h-5 w-5 text-quizzer-darkgreen" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold">8</div>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            2 novos este mês
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Admin Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {adminCategories.map((category) => (
                    <Link key={category.id} href={category.href}>
                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">{category.title}</CardTitle>
                                    <category.icon className={`h-6 w-6 ${category.color}`} />
                                </div>
                                <CardDescription>{category.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">
                                        {category.count} itens
                                    </span>
                                    <Button variant="outline" size="sm">
                                        Gerenciar
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* System Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Status do Sistema</CardTitle>
                        <CardDescription>Informações sobre o estado atual</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Servidor</span>
                                <span className="text-sm text-green-600">Online</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Banco de Dados</span>
                                <span className="text-sm text-green-600">Conectado</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Autenticação</span>
                                <span className="text-sm text-green-600">Ativo</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Backup</span>
                                <span className="text-sm text-green-600">Último: 2h atrás</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Atividade Recente</CardTitle>
                        <CardDescription>Ações administrativas recentes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivities.map((activity) => (
                                <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-sm truncate">{activity.action}</h3>
                                        <p className="text-xs text-gray-500 truncate">{activity.user} • {activity.time}</p>
                                    </div>
                                    <Button variant="outline" size="sm" className="ml-2 flex-shrink-0">Ver</Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Ações Rápidas</CardTitle>
                    <CardDescription>Ações administrativas frequentes</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Button variant="outline" className="h-16 sm:h-20 flex flex-col items-center justify-center">
                            <Users className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-2" />
                            <span className="text-xs sm:text-sm">Adicionar Usuário</span>
                        </Button>
                        <Button variant="outline" className="h-16 sm:h-20 flex flex-col items-center justify-center">
                            <Shield className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-2" />
                            <span className="text-xs sm:text-sm">Gerenciar Permissões</span>
                        </Button>
                        <Button variant="outline" className="h-16 sm:h-20 flex flex-col items-center justify-center">
                            <Settings className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-2" />
                            <span className="text-xs sm:text-sm">Configurações</span>
                        </Button>
                        <Button variant="outline" className="h-16 sm:h-20 flex flex-col items-center justify-center">
                            <Activity className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-2" />
                            <span className="text-xs sm:text-sm">Logs do Sistema</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 