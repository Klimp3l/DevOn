"use client"

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Search, Users, Shield, Mail, Calendar } from "lucide-react";

const accounts = [
    { id: 1, name: 'João Silva', email: 'joao@exemplo.com', role: 'Admin', status: 'Ativo', created: '15/01/2024' },
    { id: 2, name: 'Maria Santos', email: 'maria@exemplo.com', role: 'Usuário', status: 'Ativo', created: '20/02/2024' },
    { id: 3, name: 'Pedro Costa', email: 'pedro@exemplo.com', role: 'Moderador', status: 'Inativo', created: '10/03/2024' },
    { id: 4, name: 'Ana Oliveira', email: 'ana@exemplo.com', role: 'Usuário', status: 'Ativo', created: '05/04/2024' },
];

export default function AccountsPage() {
    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold">Gerenciamento de Contas</h1>
                    <p className="text-gray-500 mt-1">Gerencie contas de usuários e permissões</p>
                </div>
                <Button className="w-full sm:w-auto">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Nova Conta
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Total de Contas
                        </CardTitle>
                        <Users className="h-5 w-5 text-quizzer-darkgreen" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold">156</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Contas Ativas
                        </CardTitle>
                        <Shield className="h-5 w-5 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold">142</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Administradores
                        </CardTitle>
                        <Shield className="h-5 w-5 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold">8</div>
                    </CardContent>
                </Card>

                <Card className="sm:col-span-2 lg:col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Novos este mês
                        </CardTitle>
                        <Calendar className="h-5 w-5 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold">12</div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filters */}
            <Card>
                <CardHeader>
                    <CardTitle>Contas de Usuários</CardTitle>
                    <CardDescription>Lista de todas as contas registradas no sistema</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Buscar por nome ou email..."
                                className="pl-10"
                            />
                        </div>
                        <Button variant="outline" className="w-full sm:w-auto">Filtros</Button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="pb-3 text-left font-medium text-gray-500">Usuário</th>
                                    <th className="pb-3 text-left font-medium text-gray-500 hidden sm:table-cell">Email</th>
                                    <th className="pb-3 text-left font-medium text-gray-500">Perfil</th>
                                    <th className="pb-3 text-left font-medium text-gray-500 hidden md:table-cell">Status</th>
                                    <th className="pb-3 text-left font-medium text-gray-500 hidden lg:table-cell">Criado</th>
                                    <th className="pb-3 text-right font-medium text-gray-500">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accounts.map((account) => (
                                    <tr key={account.id} className="border-b">
                                        <td className="py-4">
                                            <div>
                                                <div className="font-medium">{account.name}</div>
                                                <div className="text-sm text-gray-500 sm:hidden">{account.email}</div>
                                            </div>
                                        </td>
                                        <td className="py-4 text-gray-600 hidden sm:table-cell">{account.email}</td>
                                        <td className="py-4">
                                            <Badge variant={account.role === 'Admin' ? 'default' : 'secondary'}>
                                                {account.role}
                                            </Badge>
                                        </td>
                                        <td className="py-4 hidden md:table-cell">
                                            <Badge variant={account.status === 'Ativo' ? 'outline' : 'destructive'}>
                                                {account.status}
                                            </Badge>
                                        </td>
                                        <td className="py-4 text-gray-600 hidden lg:table-cell">{account.created}</td>
                                        <td className="py-4 text-right">
                                            <div className="flex gap-2 justify-end">
                                                <Button variant="outline" size="sm" className="flex-1 sm:flex-none">Editar</Button>
                                                <Button variant="outline" size="sm" className="flex-1 sm:flex-none">Ver</Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 