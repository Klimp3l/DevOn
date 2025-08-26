"use client"

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { BarChart3, Users, FileText, TrendingUp } from "lucide-react";
import Link from "next/link";

const reportCategories = [
    {
        id: 1,
        title: 'Relatórios Administrativos',
        description: 'Relatórios de usuários e recursos do sistema',
        icon: Users,
        href: '/reports/admin',
        count: 2
    },
    {
        id: 2,
        title: 'Relatórios de Registros',
        description: 'Relatórios de questionários e respostas',
        icon: FileText,
        href: '/reports/registrations',
        count: 1
    }
];

export default function ReportsPage() {

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-xl sm:text-2xl font-bold">Relatórios</h1>
                <Button className="w-full sm:w-auto">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Gerar Relatório
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Total de Relatórios
                        </CardTitle>
                        <BarChart3 className="h-5 w-5 text-quizzer.green" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold">15</div>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                            Relatórios gerados
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Relatórios Ativos
                        </CardTitle>
                        <TrendingUp className="h-5 w-5 text-quizzer-accent" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold">8</div>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                            Em uso atualmente
                        </p>
                    </CardContent>
                </Card>

                <Card className="sm:col-span-2 lg:col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Downloads Este Mês
                        </CardTitle>
                        <FileText className="h-5 w-5 text-quizzer-darkgreen" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold">127</div>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                            Relatórios baixados
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Report Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {reportCategories.map((category) => (
                    <Link key={category.id} href={category.href}>
                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">{category.title}</CardTitle>
                                    <category.icon className="h-6 w-6 text-quizzer.green" />
                                </div>
                                <CardDescription>{category.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">
                                        {category.count} subcategorias
                                    </span>
                                    <Button variant="outline" size="sm">
                                        Acessar
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Recent Reports */}
            <Card>
                <CardHeader>
                    <CardTitle>Relatórios Recentes</CardTitle>
                    <CardDescription>Relatórios gerados recentemente</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium truncate">Relatório de Usuários - Março 2025</h3>
                                <p className="text-sm text-gray-500">Gerado em 15/03/2025</p>
                            </div>
                            <Button variant="outline" size="sm" className="ml-2 flex-shrink-0">Download</Button>
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium truncate">Relatório de Questionários - Q1 2025</h3>
                                <p className="text-sm text-gray-500">Gerado em 10/03/2025</p>
                            </div>
                            <Button variant="outline" size="sm" className="ml-2 flex-shrink-0">Download</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 