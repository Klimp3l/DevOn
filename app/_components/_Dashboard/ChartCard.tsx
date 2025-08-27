import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartCardProps {
    title: string;
    subtitle?: string;
    children: ReactNode;
    className?: string;
}

export function ChartCard({
    title,
    subtitle,
    children,
    className = "",
}: ChartCardProps) {
    return (
        <Card className={`shadow-md ${className}`}>
            <CardHeader>
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                {subtitle && (
                    <p className="text-sm text-muted-foreground">{subtitle}</p>
                )}
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
}