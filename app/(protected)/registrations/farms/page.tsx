"use client"

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Search, FileText, BarChart2, Clock, Eye, Edit, Copy } from "lucide-react";

const questionnaires = [
    {
        id: 1,
        title: 'Pesquisa de Satisfação do Cliente',
        description: 'Avaliação geral da satisfação com nossos produtos e serviços',
        status: 'Ativo',
        questions: 15,
        responses: 234,
        created: '15/01/2024',
        lastModified: '2 dias atrás'
    },
    {
        id: 2,
        title: 'Feedback do Evento Tech 2024',
        description: 'Coleta de feedback sobre o evento realizado em março',
        status: 'Pausado',
        questions: 12,
        responses: 156,
        created: '20/02/2024',
        lastModified: '1 semana atrás'
    },
    {
        id: 3,
        title: 'Avaliação de Treinamento',
        description: 'Questionário para avaliar a qualidade dos treinamentos',
        status: 'Ativo',
        questions: 8,
        responses: 89,
        created: '10/03/2024',
        lastModified: '3 dias atrás'
    },
    {
        id: 4,
        title: 'Pesquisa de Mercado',
        description: 'Análise de preferências e comportamentos do consumidor',
        status: 'Rascunho',
        questions: 20,
        responses: 0,
        created: '05/04/2024',
        lastModified: '1 hora atrás'
    },
];

export default function QuestionnairesPage() {
    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold">Questionários</h1>
                    <p className="text-gray-500 mt-1">Crie e gerencie seus questionários</p>
                </div>
                <Button className="w-full sm:w-auto">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Novo Questionário
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Total de Questionários
                        </CardTitle>
                        <FileText className="h-5 w-5 text-quizzer-darkgreen" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold">24</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Questionários Ativos
                        </CardTitle>
                        <BarChart2 className="h-5 w-5 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold">18</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Total de Respostas
                        </CardTitle>
                        <BarChart2 className="h-5 w-5 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold">1,247</div>
                    </CardContent>
                </Card>

                <Card className="sm:col-span-2 lg:col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Criados este mês
                        </CardTitle>
                        <Clock className="h-5 w-5 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold">5</div>
                    </CardContent>
                </Card>
            </div>

            {/* Questionnaires List */}
            <Card>
                <CardHeader>
                    <CardTitle>Meus Questionários</CardTitle>
                    <CardDescription>Gerencie todos os seus questionários e visualize estatísticas</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Buscar questionários..."
                                className="pl-10"
                            />
                        </div>
                        <Button variant="outline" className="w-full sm:w-auto">Filtros</Button>
                    </div>

                    <div className="space-y-4">
                        {questionnaires.map((questionnaire) => (
                            <div key={questionnaire.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 border rounded-lg hover:bg-gray-50 transition-colors gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                                        <h3 className="font-medium text-base sm:text-lg truncate">{questionnaire.title}</h3>
                                        <Badge variant={
                                            questionnaire.status === 'Ativo' ? 'outline' :
                                                questionnaire.status === 'Pausado' ? 'secondary' : 'destructive'
                                        } className="w-fit">
                                            {questionnaire.status}
                                        </Badge>
                                    </div>
                                    <p className="text-gray-600 mb-3 text-sm sm:text-base">{questionnaire.description}</p>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm text-gray-500">
                                        <span>{questionnaire.questions} questões</span>
                                        <span>{questionnaire.responses} respostas</span>
                                        <span>Criado em {questionnaire.created}</span>
                                        <span>Modificado {questionnaire.lastModified}</span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                                        <Eye className="h-4 w-4 mr-1" />
                                        <span className="hidden sm:inline">Visualizar</span>
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                                        <Edit className="h-4 w-4 mr-1" />
                                        <span className="hidden sm:inline">Editar</span>
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                                        <Copy className="h-4 w-4 mr-1" />
                                        <span className="hidden sm:inline">Duplicar</span>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 