"use client"

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { FileText, HelpCircle, List, PlusCircle, TrendingUp, Clock, Eye, Edit } from "lucide-react";
import Link from "next/link";

const registrationCategories = [
    {
        id: 1,
        title: 'Questionários',
        description: 'Gerencie seus questionários e pesquisas',
        icon: FileText,
        href: '/registrations/questionnaires',
        count: 24,
        color: 'text-quizzer-darkgreen'
    },
    {
        id: 2,
        title: 'Perguntas',
        description: 'Crie e organize suas perguntas',
        icon: HelpCircle,
        href: '/registrations/questions',
        count: 156,
        color: 'text-quizzer-accent'
    },
    {
        id: 3,
        title: 'Grupos de Escolha',
        description: 'Organize opções de resposta em grupos',
        icon: List,
        href: '/registrations/choice-groups',
        count: 32,
        color: 'text-quizzer.green'
    }
];

const recentRegistrations = [
    { id: 1, type: 'Questionário', title: 'Pesquisa de Satisfação', created: 'Há 2 horas', status: 'Ativo' },
    { id: 2, type: 'Pergunta', title: 'Como você avalia nosso serviço?', created: 'Há 4 horas', status: 'Rascunho' },
    { id: 3, type: 'Grupo de Escolha', title: 'Níveis de Satisfação', created: 'Há 1 dia', status: 'Ativo' },
    { id: 4, type: 'Questionário', title: 'Feedback do Evento', created: 'Há 2 dias', status: 'Pausado' }
];

export default function RegistrationsPage() {

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-xl sm:text-2xl font-bold">Registros</h1>
                <Button className="w-full sm:w-auto">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Novo Registro
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Total de Questionários
                        </CardTitle>
                        <FileText className="h-5 w-5 text-quizzer-darkgreen" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold">24</div>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            3 novos este mês
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Total de Perguntas
                        </CardTitle>
                        <HelpCircle className="h-5 w-5 text-quizzer-accent" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold">156</div>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            12 novas este mês
                        </p>
                    </CardContent>
                </Card>

                <Card className="sm:col-span-2 lg:col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Grupos de Escolha
                        </CardTitle>
                        <List className="h-5 w-5 text-quizzer.green" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold">32</div>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            5 novos este mês
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Registration Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {registrationCategories.map((category) => (
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

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Registros Recentes</CardTitle>
                        <CardDescription>Últimos registros criados ou modificados</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentRegistrations.map((registration) => (
                                <div key={registration.id} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                                {registration.type}
                                            </span>
                                            <span className={`text-xs px-2 py-1 rounded ${registration.status === 'Ativo' ? 'bg-green-100 text-green-700' :
                                                registration.status === 'Pausado' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-gray-100 text-gray-700'
                                                }`}>
                                                {registration.status}
                                            </span>
                                        </div>
                                        <h3 className="font-medium text-sm truncate mt-1">{registration.title}</h3>
                                        <p className="text-xs text-gray-500 truncate">{registration.created}</p>
                                    </div>
                                    <div className="flex gap-1">
                                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                            <Eye className="h-3 w-3" />
                                        </Button>
                                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                            <Edit className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Estatísticas Rápidas</CardTitle>
                        <CardDescription>Resumo das atividades de registro</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Questionários Ativos</span>
                                <span className="text-sm text-green-600">18 de 24</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Perguntas Reutilizáveis</span>
                                <span className="text-sm text-blue-600">89 de 156</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Grupos Padrão</span>
                                <span className="text-sm text-purple-600">12 de 32</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Última Atividade</span>
                                <span className="text-sm text-gray-600">Há 2 horas</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Ações Rápidas</CardTitle>
                    <CardDescription>Ações frequentes para gerenciar registros</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Button variant="outline" className="h-16 sm:h-20 flex flex-col items-center justify-center">
                            <FileText className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-2" />
                            <span className="text-xs sm:text-sm">Novo Questionário</span>
                        </Button>
                        <Button variant="outline" className="h-16 sm:h-20 flex flex-col items-center justify-center">
                            <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-2" />
                            <span className="text-xs sm:text-sm">Nova Pergunta</span>
                        </Button>
                        <Button variant="outline" className="h-16 sm:h-20 flex flex-col items-center justify-center">
                            <List className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-2" />
                            <span className="text-xs sm:text-sm">Novo Grupo</span>
                        </Button>
                        <Button variant="outline" className="h-16 sm:h-20 flex flex-col items-center justify-center">
                            <Clock className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-2" />
                            <span className="text-xs sm:text-sm">Histórico</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 