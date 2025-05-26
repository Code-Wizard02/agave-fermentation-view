
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Lectura } from "@/types";

interface TinaChartProps {
  lecturas: Lectura[];
  title: string;
  dataKey: keyof Lectura;
  color: string;
  unit: string;
}

export function TinaChart({ lecturas, title, dataKey, color, unit }: TinaChartProps) {
  const data = lecturas.map(lectura => ({
    ...lectura,
    time: lectura.timestamp.toLocaleTimeString('es-MX', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }));

  return (
    <Card className="border-mezcal-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-mezcal-800">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="time" 
              fontSize={12}
              stroke="#666"
            />
            <YAxis 
              fontSize={12}
              stroke="#666"
            />
            <Tooltip 
              labelFormatter={(value) => `Hora: ${value}`}
              formatter={(value: any) => [`${value?.toFixed(1)} ${unit}`, title]}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, fill: color }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
