"use client"

import * as React from "react";
import { Pie, PieChart, Label } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import { useAvaliations } from "@/app/services/avaliations.swr";

export const description = "A donut chart with text"

const chartConfig = {
    satisfied: {
        label: "Gostaram",
        color: "var(--chart-1)",
    },
    unsatisfied: {
        label: "Não gostaram",
        color: "var(--chart-2)",
    },
    empty: {
        label: "Sem avaliações",
        color: "var(--muted)",
    }
} satisfies ChartConfig

export default function CharGeracaoDeEstudo() {
    const { avaliations } = useAvaliations();

    const { chartData, totalAvaliations, accuracy, isEmpty } = React.useMemo(() => {
        const list = avaliations ?? [];

        const satisfiedCount = list.filter((a) => a.satisfied).length;
        const unsatisfiedCount = list.length - satisfiedCount;
        const total = list.length;

        const accuracyValue = total > 0
            ? Math.round((satisfiedCount / total) * 100)
            : 0;

        const empty = total === 0;

        return {
            chartData: empty
                ? [{ status: "empty", visitors: 1, fill: "var(--color-empty)" }]
                : [
                    { status: "satisfied", visitors: satisfiedCount, fill: "var(--color-satisfied)" },
                    { status: "unsatisfied", visitors: unsatisfiedCount, fill: "var(--color-unsatisfied)" },
                ],
            totalAvaliations: total,
            accuracy: accuracyValue,
            isEmpty: empty,
        };
    }, [avaliations]);

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0!">
                <CardTitle className="text-black">Acuracia das recomendações</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0!">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-62.5"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            nameKey="status"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="text-3xl text-black! font-bold"
                                                >
                                                    {isEmpty ? "0%" : `${accuracy}%`}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    avaliações
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col text-sm">
                <div className="text-black flex items-center leading-none font-medium">
                    {totalAvaliations} Avaliações
                </div>
            </CardFooter>
        </Card>
    )
}