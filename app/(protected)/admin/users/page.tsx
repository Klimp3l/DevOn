"use client"

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle, Search, Users, Activity, Clock, Mail } from "lucide-react";

const users = [
    {
        id: 1,
        name: 'João Silva',
        email: 'joao@exemplo.com',
        avatar: '/placeholder-avatar.jpg',
        lastActivity: '2 horas atrás',
        status: 'Online',
        quizzes: 15,
        responses: 234
    },
    {
        id: 2,
        name: 'Maria Santos',
        email: 'maria@exemplo.com',
        avatar: '/placeholder-avatar.jpg',
        lastActivity: '1 dia atrás',
        status: 'Offline',
        quizzes: 8,
        responses: 156
    },
    {
        id: 3,
        name: 'Pedro Costa',
        email: 'pedro@exemplo.com',
        avatar: '/placeholder-avatar.jpg',
        lastActivity: '3 dias atrás',
        status: 'Offline',
        quizzes: 22,
        responses: 445
    },
    {
        id: 4,
        name: 'Ana Oliveira',
        email: 'ana@exemplo.com',
        avatar: '/placeholder-avatar.jpg',
        lastActivity: '1 hora atrás',
        status: 'Online',
        quizzes: 12,
        responses: 189
    },
];

export default function UsersPage() {
    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold">Usuários</h1>
                    <p className="text-gray-500 mt-1">Gerencie usuários e suas atividades</p>
                </div>
                <Button className="w-full sm:w-auto">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Novo Usuário
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Total de Usuários
                        </CardTitle>
                        <Users className="h-5 w-5 text-quizzer-darkgreen" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold">1,247</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Usuários Ativos
                        </CardTitle>
                        <Activity className="h-5 w-5 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold">892</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Online Agora
                        </CardTitle>
                        <Clock className="h-5 w-5 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold">156</div>
                    </CardContent>
                </Card>

                <Card className="sm:col-span-2 lg:col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Novos este mês
                        </CardTitle>
                        <Mail className="h-5 w-5 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold">89</div>
                    </CardContent>
                </Card>
            </div>

            {/* Users List */}
            <Card>
                <CardHeader>
                    <CardTitle>Lista de Usuários</CardTitle>
                    <CardDescription>Visualize e gerencie todos os usuários da plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Buscar usuários..."
                                className="pl-10"
                            />
                        </div>
                        <Button variant="outline" className="w-full sm:w-auto">Filtros</Button>
                    </div>

                    <div className="space-y-4">
                        {users.map((user) => (
                            <div key={user?.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors gap-4">
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
                                        <AvatarImage src={user?.avatar} />
                                        <AvatarFallback className="bg-quizzer-accent">
                                            {user?.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium truncate">{user?.name}</h3>
                                        <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1">
                                            <span className="text-xs text-gray-400">
                                                Última atividade: {user?.lastActivity}
                                            </span>
                                            <Badge variant={user?.status === 'Online' ? 'outline' : 'secondary'} className="w-fit">
                                                {user?.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                                    <div className="flex gap-4 sm:gap-6">
                                        <div className="text-center">
                                            <div className="text-sm font-medium">{user?.quizzes}</div>
                                            <div className="text-xs text-gray-500">Quizzes</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-sm font-medium">{user?.responses}</div>
                                            <div className="text-xs text-gray-500">Respostas</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" className="flex-1 sm:flex-none">Ver</Button>
                                        <Button variant="outline" size="sm" className="flex-1 sm:flex-none">Editar</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 