import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface KPICardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: ReactNode;
    trend?: {
        value: number;
        isPositive: boolean;
        label: string;
    };
    color?: "success" | "movement" | "info" | "accent" | "default";
}

export function KPICard({
    title,
    value,
    subtitle,
    icon,
    trend,
    color = "default",
}: KPICardProps) {
    const getColorClasses = () => {
        switch (color) {
            case "success":
                return {
                    card: "border-success/20",
                    icon: "bg-gradient-success text-white",
                    trend: trend?.isPositive ? "text-success" : "text-destructive",
                };
            case "movement":
                return {
                    card: "border-movement/20",
                    icon: "bg-gradient-movement text-white",
                    trend: trend?.isPositive ? "text-success" : "text-destructive",
                };
            case "info":
                return {
                    card: "border-info/20",
                    icon: "bg-gradient-info text-white",
                    trend: trend?.isPositive ? "text-success" : "text-destructive",
                };
            case "accent":
                return {
                    card: "border-accent/20",
                    icon: "bg-accent text-foreground",
                    trend: trend?.isPositive ? "text-success" : "text-destructive",
                };
            default:
                return {
                    card: "border-border",
                    icon: "bg-gradient-primary text-white",
                    trend: trend?.isPositive ? "text-success" : "text-destructive",
                };
        }
    };

    const colorClasses = getColorClasses();

    return (
        <Card className={`transition-all duration-300 hover:scale-[1.02] ${colorClasses.card}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses.icon}`}>
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-baseline gap-2">
                    <div className="text-2xl font-bold">{value.toLocaleString()}</div>
                    {trend && (
                        <Badge
                            variant="secondary"
                            className={`text-xs ${colorClasses.trend}`}
                        >
                            {trend.isPositive ? "+" : ""}{trend.value}% {trend.label}
                        </Badge>
                    )}
                </div>
                {subtitle && (
                    <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
                )}
            </CardContent>
        </Card>
    );
}