"use client"

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, HelpCircle, BarChart2, TrendingUp, Filter, Eye, FileText } from "lucide-react";

const questionStats = [
    {
        period: 'Janeiro 2024',
        totalQuestions: 45,
        activeQuestions: 38,
        totalResponses: 1234,
        avgCompletion: 78
    },
    {
        period: 'Fevereiro 2024',
        totalQuestions: 52,
        activeQuestions: 45,
        totalResponses: 1567,
        avgCompletion: 82
    },
    {
        period: 'Março 2024',
        totalQuestions: 38,
        activeQuestions: 32,
        totalResponses: 1345,
        avgCompletion: 75
    },
    {
        period: 'Abril 2024',
        totalQuestions: 67,
        activeQuestions: 58,
        totalResponses: 1890,
        avgCompletion: 85
    },
];

const topQuestions = [
    {
        title: 'Qual é sua opinião sobre o produto?',
        type: 'Múltipla Escolha',
        responses: 234,
        completion: 92,
        avgTime: '45s'
    },
    {
        title: 'Como você avalia nosso atendimento?',
        type: 'Escala',
        responses: 189,
        completion: 88,
        avgTime: '30s'
    },
    {
        title: 'Você recomendaria nosso serviço?',
        type: 'Sim/Não',
        responses: 156,
        completion: 95,
        avgTime: '15s'
    },
    {
        title: 'Qual sua idade?',
        type: 'Texto',
        responses: 145,
        completion: 78,
        avgTime: '60s'
    },
];

export default function QuestionsReportsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Relatórios de Questões</h1>
                    <p className="text-gray-500 mt-1">Análise de desempenho e uso das questões</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" />
                        Filtros
                    </Button>
                    <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Exportar
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Total de Questões
                        </CardTitle>
                        <HelpCircle className="h-5 w-5 text-quizzer-darkgreen" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">342</div>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +15% este mês
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Questões Ativas
                        </CardTitle>
                        <BarChart2 className="h-5 w-5 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">298</div>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +12% este mês
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Total de Respostas
                        </CardTitle>
                        <FileText className="h-5 w-5 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">6,036</div>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +23% este mês
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Taxa de Conclusão
                        </CardTitle>
                        <BarChart2 className="h-5 w-5 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">85%</div>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +7% este mês
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Desempenho das Questões</CardTitle>
                        <CardDescription>Taxa de conclusão e tempo médio por tipo</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80">
                            {/* Chart placeholder */}
                            <div className="flex items-center justify-center h-full text-gray-500">
                                <BarChart2 className="h-12 w-12 mr-3" />
                                Gráfico de desempenho
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Distribuição por Tipo</CardTitle>
                        <CardDescription>Quantidade de questões por tipo</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80">
                            {/* Chart placeholder */}
                            <div className="flex items-center justify-center h-full text-gray-500">
                                <BarChart2 className="h-12 w-12 mr-3" />
                                Gráfico de distribuição
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
                                    <th className="pb-3 text-left font-medium text-gray-500">Total Questões</th>
                                    <th className="pb-3 text-left font-medium text-gray-500">Questões Ativas</th>
                                    <th className="pb-3 text-left font-medium text-gray-500">Total Respostas</th>
                                    <th className="pb-3 text-left font-medium text-gray-500">Taxa Conclusão</th>
                                </tr>
                            </thead>
                            <tbody>
                                {questionStats.map((stat, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="py-4 font-medium">{stat.period}</td>
                                        <td className="py-4">{stat.totalQuestions}</td>
                                        <td className="py-4">{stat.activeQuestions}</td>
                                        <td className="py-4">{stat.totalResponses}</td>
                                        <td className="py-4">
                                            <Badge variant="outline" className="text-green-600">
                                                {stat.avgCompletion}%
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Top Questions */}
            <Card>
                <CardHeader>
                    <CardTitle>Questões Mais Respondidas</CardTitle>
                    <CardDescription>Questões com maior engajamento e respostas</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {topQuestions.map((question, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 bg-quizzer-accent rounded-full flex items-center justify-center text-sm font-medium">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h3 className="font-medium">{question.title}</h3>
                                        <div className="flex items-center gap-4 mt-1">
                                            <Badge variant="secondary">{question.type}</Badge>
                                            <span className="text-sm text-gray-500">
                                                {question.responses} respostas
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Conclusão</p>
                                            <p className="font-medium">{question.completion}%</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Tempo médio</p>
                                            <p className="font-medium">{question.avgTime}</p>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4 mr-1" />
                                            Ver
                                        </Button>
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