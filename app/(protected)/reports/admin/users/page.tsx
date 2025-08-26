"use client"

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Calendar, Users, TrendingUp, BarChart2, Filter } from "lucide-react";

const userStats = [
    { period: 'Janeiro 2024', newUsers: 45, activeUsers: 234, totalUsers: 1234 },
    { period: 'Fevereiro 2024', newUsers: 52, activeUsers: 267, totalUsers: 1286 },
    { period: 'Março 2024', newUsers: 38, activeUsers: 289, totalUsers: 1324 },
    { period: 'Abril 2024', newUsers: 67, activeUsers: 312, totalUsers: 1391 },
];

const topUsers = [
    { name: 'João Silva', quizzes: 15, responses: 234, lastActivity: '2 horas atrás' },
    { name: 'Maria Santos', quizzes: 12, responses: 189, lastActivity: '1 dia atrás' },
    { name: 'Pedro Costa', quizzes: 8, responses: 156, lastActivity: '3 dias atrás' },
    { name: 'Ana Oliveira', quizzes: 10, responses: 145, lastActivity: '1 semana atrás' },
];

export default function UsersReportsPage() {
    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold">Relatórios de Usuários</h1>
                    <p className="text-gray-500 mt-1">Análise detalhada do comportamento dos usuários</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" className="w-full sm:w-auto">
                        <Filter className="mr-2 h-4 w-4" />
                        Filtros
                    </Button>
                    <Button className="w-full sm:w-auto">
                        <Download className="mr-2 h-4 w-4" />
                        Exportar
                    </Button>
                </div>
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
                        <div className="text-2xl sm:text-3xl font-bold">1,391</div>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +12% este mês
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Usuários Ativos
                        </CardTitle>
                        <BarChart2 className="h-5 w-5 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold">312</div>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +8% este mês
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Novos Usuários
                        </CardTitle>
                        <Users className="h-5 w-5 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold">67</div>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +76% este mês
                        </p>
                    </CardContent>
                </Card>

                <Card className="sm:col-span-2 lg:col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Taxa de Retenção
                        </CardTitle>
                        <BarChart2 className="h-5 w-5 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold">78%</div>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +5% este mês
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Crescimento de Usuários</CardTitle>
                        <CardDescription>Evolução mensal do número de usuários</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-60 sm:h-80">
                            {/* Chart placeholder */}
                            <div className="flex items-center justify-center h-full text-gray-500">
                                <BarChart2 className="h-8 w-8 sm:h-12 sm:w-12 mr-2 sm:mr-3" />
                                <span className="text-sm sm:text-base">Gráfico de crescimento</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Atividade dos Usuários</CardTitle>
                        <CardDescription>Distribuição de usuários por nível de atividade</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-60 sm:h-80">
                            {/* Chart placeholder */}
                            <div className="flex items-center justify-center h-full text-gray-500">
                                <BarChart2 className="h-8 w-8 sm:h-12 sm:w-12 mr-2 sm:mr-3" />
                                <span className="text-sm sm:text-base">Gráfico de atividade</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Monthly Stats Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Estatísticas Mensais</CardTitle>
                    <CardDescription>Resumo detalhado por período</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="pb-3 text-left font-medium text-gray-500">Período</th>
                                    <th className="pb-3 text-left font-medium text-gray-500 hidden sm:table-cell">Novos Usuários</th>
                                    <th className="pb-3 text-left font-medium text-gray-500 hidden md:table-cell">Usuários Ativos</th>
                                    <th className="pb-3 text-left font-medium text-gray-500 hidden lg:table-cell">Total</th>
                                    <th className="pb-3 text-left font-medium text-gray-500">Crescimento</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userStats.map((stat, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="py-4">
                                            <div>
                                                <div className="font-medium">{stat.period}</div>
                                                <div className="text-sm text-gray-500 sm:hidden">
                                                    {stat.newUsers} novos • {stat.activeUsers} ativos
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 hidden sm:table-cell">{stat.newUsers}</td>
                                        <td className="py-4 hidden md:table-cell">{stat.activeUsers}</td>
                                        <td className="py-4 hidden lg:table-cell">{stat.totalUsers}</td>
                                        <td className="py-4">
                                            <Badge variant="outline" className="text-green-600">
                                                +{Math.round((stat.newUsers / stat.totalUsers) * 100)}%
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Top Users */}
            <Card>
                <CardHeader>
                    <CardTitle>Usuários Mais Ativos</CardTitle>
                    <CardDescription>Usuários com maior engajamento na plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {topUsers.map((user, index) => (
                            <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 bg-quizzer-accent rounded-full flex items-center justify-center text-sm font-medium">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium truncate">{user?.name}</h3>
                                        <p className="text-sm text-gray-500">
                                            {user?.quizzes} quizzes • {user?.responses} respostas
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Última atividade</p>
                                    <p className="text-sm font-medium">{user?.lastActivity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 