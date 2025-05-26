
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Beaker, Thermometer, AlertTriangle, WifiOff } from "lucide-react";
import { DashboardStats } from "@/types";

interface StatsCardsProps {
  stats: DashboardStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Tinas",
      value: stats.totalTinas,
      icon: Beaker,
      color: "text-mezcal-600",
      bgColor: "bg-mezcal-100"
    },
    {
      title: "Fermentando",
      value: stats.tinasFermentando,
      icon: Thermometer,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      title: "Destilando",
      value: stats.tinasDestilando,
      icon: Beaker,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Alertas Activas",
      value: stats.alertasActivas,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      title: "Sensores Desconectados",
      value: stats.sensoresDesconectados,
      icon: WifiOff,
      color: "text-gray-600",
      bgColor: "bg-gray-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, index) => (
        <Card key={index} className="border-mezcal-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {card.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${card.bgColor}`}>
              <card.icon className={`w-4 h-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
