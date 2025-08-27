"use client";

import { KPICard } from "@/app/_components/_Dashboard/KPICard";
import { ChartCard } from "@/app/_components/_Dashboard/ChartCard";
import {
  PawPrint,
  TrendingUp,
  TrendingDown,
  Users,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Dados simulados
const movimentacaoData = [
  { mes: "Janeiro", entradas: 45, saidas: 12, mortes: 3 },
  { mes: "Fevereiro", entradas: 38, saidas: 15, mortes: 2 },
  { mes: "Março", entradas: 52, saidas: 18, mortes: 4 },
  { mes: "Abril", entradas: 41, saidas: 22, mortes: 1 },
  { mes: "Maio", entradas: 48, saidas: 16, mortes: 3 },
  { mes: "Junho", entradas: 55, saidas: 19, mortes: 2 },
];

const rebanhoData = [
  { categoria: "Bovinos", quantidade: 1250, color: "var(--success)" },
  { categoria: "Suínos", quantidade: 340, color: "var(--movement)" },
  { categoria: "Ovinos", quantidade: 120, color: "var(--info)" },
  { categoria: "Caprinos", quantidade: 85, color: "var(--primary)" },
];

const fazendaData = [
  { nome: "Fazenda São José", animais: 456 },
  { nome: "Fazenda Boa Vista", animais: 389 },
  { nome: "Fazenda Santa Clara", animais: 298 },
  { nome: "Fazenda Primavera", animais: 652 },
];

export default function Dashboard() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500 mt-1">Visão geral do seu rebanho e operações</p>
        </div>
      </div>

      {/* KPIs principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total de Animais"
          value={1795}
          icon={<PawPrint className="w-5 h-5" />}
          color="success"
          trend={{ value: 8.2, isPositive: true, label: "este mês" }}
          subtitle="Todos os tipos de animais"
        />
        <KPICard
          title="Entradas no Mês"
          value={55}
          icon={<TrendingUp className="w-5 h-5" />}
          color="info"
          trend={{ value: 12.5, isPositive: true, label: "vs mês anterior" }}
          subtitle="Nascimentos e aquisições"
        />
        <KPICard
          title="Saídas no Mês"
          value={19}
          icon={<TrendingDown className="w-5 h-5" />}
          color="movement"
          trend={{ value: 3.1, isPositive: false, label: "vs mês anterior" }}
          subtitle="Vendas e transferências"
        />
        <KPICard
          title="Fazendas Ativas"
          value={4}
          icon={<Users className="w-5 h-5" />}
          color="accent"
          subtitle="Propriedades cadastradas"
        />
      </div>

      {/* Gráficos */}
      <div className="grid gap-6 md:grid-cols-2">
        <ChartCard
          title="Movimentações do Rebanho"
          subtitle="Últimos 6 meses"
          className="md:col-span-2"
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={movimentacaoData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip
                contentStyle={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                labelStyle={{ color: 'var(--foreground)' }}
                itemStyle={{ color: 'var(--foreground)' }}
              />
              <Line
                type="monotone"
                dataKey="entradas"
                stroke="var(--success)"
                strokeWidth={2}
                name="Entradas"
              />
              <Line
                type="monotone"
                dataKey="saidas"
                stroke="var(--movement)"
                strokeWidth={2}
                name="Saídas"
              />
              <Line
                type="monotone"
                dataKey="mortes"
                stroke="var(--destructive)"
                strokeWidth={2}
                strokeDasharray="4 4"
                name="Mortes"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Distribuição do Rebanho" subtitle="Por tipo de animal">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={rebanhoData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="quantidade"
              >
                {rebanhoData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} animais`, "Quantidade"]}
                contentStyle={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                labelStyle={{ color: 'var(--foreground)' }}
                itemStyle={{ color: 'var(--foreground)' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-4">
            {rebanhoData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-muted-foreground">
                  {item.categoria}: {item.quantidade}
                </span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Animais por Fazenda" subtitle="Distribuição atual">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={fazendaData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nome" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip
                contentStyle={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                labelStyle={{ color: 'var(--foreground)' }}
                itemStyle={{ color: 'var(--foreground)' }}
              />
              <Bar
                dataKey="animais"
                fill="var(--info)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Resumo de atividades recentes */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-card p-4 rounded-lg border">
          <h3 className="font-semibold text-sm text-muted-foreground mb-2">
            ÚLTIMAS MOVIMENTAÇÕES
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Nascimento - Fazenda São José</span>
              <span className="text-xs text-muted-foreground">2h atrás</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Venda - Fazenda Boa Vista</span>
              <span className="text-xs text-muted-foreground">5h atrás</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Transferência - Santa Clara</span>
              <span className="text-xs text-muted-foreground">1d atrás</span>
            </div>
          </div>
        </div>

        <div className="bg-card p-4 rounded-lg border">
          <h3 className="font-semibold text-sm text-muted-foreground mb-2">
            ALERTAS IMPORTANTES
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span className="text-sm">3 animais próximos ao desmame</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-info rounded-full" />
              <span className="text-sm">Vacinação pendente - Lote B</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span className="text-sm">Exames em dia</span>
            </div>
          </div>
        </div>

        <div className="bg-card p-4 rounded-lg border">
          <h3 className="font-semibold text-sm text-muted-foreground mb-2">
            PRÓXIMAS TAREFAS
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Vacinação - Lote A</span>
              <span className="text-xs text-muted-foreground">Amanhã</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Pesagem mensal</span>
              <span className="text-xs text-muted-foreground">3 dias</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Inspeção veterinária</span>
              <span className="text-xs text-muted-foreground">1 semana</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}