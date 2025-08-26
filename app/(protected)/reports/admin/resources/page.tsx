"use client"

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Database, HardDrive, Cpu, Activity, TrendingUp, BarChart2, Filter } from "lucide-react";

const resourceStats = [
    {
        name: 'Armazenamento',
        current: '2.4 GB',
        total: '10 GB',
        percentage: 24,
        trend: '+5%'
    },
    {
        name: 'CPU',
        current: '45%',
        total: '100%',
        percentage: 45,
        trend: '+12%'
    },
    {
        name: 'Memória RAM',
        current: '3.2 GB',
        total: '8 GB',
        percentage: 40,
        trend: '+8%'
    },
    {
        name: 'Bandwidth',
        current: '156 GB',
        total: '500 GB',
        percentage: 31,
        trend: '+15%'
    },
];

const topResources = [
    { name: 'Imagens de Perfil', size: '1.2 GB', files: 1247, lastUsed: '2 horas atrás' },
    { name: 'Arquivos de Quiz', size: '856 MB', files: 234, lastUsed: '1 dia atrás' },
    { name: 'Logs do Sistema', size: '234 MB', files: 156, lastUsed: '3 dias atrás' },
    { name: 'Backups', size: '156 MB', files: 89, lastUsed: '1 semana atrás' },
];

export default function ResourcesReportsPage() {
    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold">Relatórios de Recursos</h1>
                    <p className="text-gray-500 mt-1">Monitoramento de uso de recursos do sistema</p>
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

            {/* Resource Usage Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Armazenamento
                        </CardTitle>
                        <HardDrive className="h-5 w-5 text-quizzer-darkgreen" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold">2.4 GB</div>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +5% este mês
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div className="bg-quizzer-darkgreen h-2 rounded-full" style={{ width: '24%' }}></div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            CPU
                        </CardTitle>
                        <Cpu className="h-5 w-5 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold">45%</div>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +12% este mês
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Memória RAM
                        </CardTitle>
                        <Activity className="h-5 w-5 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold">3.2 GB</div>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +8% este mês
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div className="bg-orange-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="sm:col-span-2 lg:col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Bandwidth
                        </CardTitle>
                        <Database className="h-5 w-5 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold">156 GB</div>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +15% este mês
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: '31%' }}></div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Uso de Recursos ao Longo do Tempo</CardTitle>
                        <CardDescription>Monitoramento de uso de CPU e memória</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-60 sm:h-80">
                            {/* Chart placeholder */}
                            <div className="flex items-center justify-center h-full text-gray-500">
                                <BarChart2 className="h-8 w-8 sm:h-12 sm:w-12 mr-2 sm:mr-3" />
                                <span className="text-sm sm:text-base">Gráfico de uso de recursos</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Distribuição de Armazenamento</CardTitle>
                        <CardDescription>Uso de espaço por tipo de arquivo</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-60 sm:h-80">
                            {/* Chart placeholder */}
                            <div className="flex items-center justify-center h-full text-gray-500">
                                <BarChart2 className="h-8 w-8 sm:h-12 sm:w-12 mr-2 sm:mr-3" />
                                <span className="text-sm sm:text-base">Gráfico de distribuição</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Resource Usage Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Uso Detalhado de Recursos</CardTitle>
                    <CardDescription>Estatísticas detalhadas por tipo de recurso</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="pb-3 text-left font-medium text-gray-500">Recurso</th>
                                    <th className="pb-3 text-left font-medium text-gray-500 hidden sm:table-cell">Uso Atual</th>
                                    <th className="pb-3 text-left font-medium text-gray-500 hidden md:table-cell">Total</th>
                                    <th className="pb-3 text-left font-medium text-gray-500">Percentual</th>
                                    <th className="pb-3 text-left font-medium text-gray-500 hidden lg:table-cell">Tendência</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resourceStats.map((resource, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="py-4">
                                            <div>
                                                <div className="font-medium">{resource.name}</div>
                                                <div className="text-sm text-gray-500 sm:hidden">
                                                    {resource.current} / {resource.total}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 hidden sm:table-cell">{resource.current}</td>
                                        <td className="py-4 hidden md:table-cell">{resource.total}</td>
                                        <td className="py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-12 sm:w-16 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-quizzer-darkgreen h-2 rounded-full"
                                                        style={{ width: `${resource.percentage}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm">{resource.percentage}%</span>
                                            </div>
                                        </td>
                                        <td className="py-4 hidden lg:table-cell">
                                            <Badge variant="outline" className="text-green-600">
                                                {resource.trend}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Top Resources by Size */}
            <Card>
                <CardHeader>
                    <CardTitle>Recursos por Tamanho</CardTitle>
                    <CardDescription>Arquivos e recursos que mais consomem espaço</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {topResources.map((resource, index) => (
                            <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 bg-quizzer-accent rounded-full flex items-center justify-center text-sm font-medium">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium truncate">{resource.name}</h3>
                                        <p className="text-sm text-gray-500">
                                            {resource.files} arquivos • Último uso: {resource.lastUsed}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">{resource.size}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 