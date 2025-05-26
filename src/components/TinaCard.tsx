
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Thermometer, Droplets, Clock, Beaker } from "lucide-react";
import { Tina, Sensor } from "@/types";
import { getEstadoColor, calculateFermentationTime } from "@/utils/mockData";

interface TinaCardProps {
  tina: Tina;
  sensores: Sensor[];
  onViewDetails: (tinaId: string) => void;
}

export function TinaCard({ tina, sensores, onViewDetails }: TinaCardProps) {
  const temperaturaSensor = sensores.find(s => s.tinaId === tina.id && s.tipo === 'Temperatura');
  const phSensor = sensores.find(s => s.tinaId === tina.id && s.tipo === 'pH');
  const nivelSensor = sensores.find(s => s.tinaId === tina.id && s.tipo === 'Nivel');
  
  const tiempoFermentacion = tina.estado !== 'Disponible' 
    ? calculateFermentationTime(tina.fechaCreacion)
    : '0h';

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-mezcal-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-mezcal-800">{tina.nombre}</h3>
          <Badge className={`${getEstadoColor(tina.estado)} px-2 py-1 text-xs font-medium`}>
            {tina.estado}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Thermometer className="w-4 h-4 text-mezcal-600" />
            <span className="text-sm font-medium">
              {temperaturaSensor?.lectura.toFixed(1) || '--'}°C
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">pH</span>
            <span className="text-sm">{phSensor?.lectura.toFixed(1) || '--'}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-blue-600" />
            <span className="text-sm">
              {nivelSensor?.lectura.toFixed(1) || '--'}%
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-mezcal-600" />
            <span className="text-sm">{tiempoFermentacion}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Beaker className="w-4 h-4 text-agave-600" />
            <span className="text-sm font-medium">
              Agave: {tina.tipoAgave || 'No asignado'}
            </span>
          </div>
          
          <div className="text-sm text-gray-600">
            Capacidad: {tina.capacidad.toFixed(1)} L
          </div>
          
          <div className="text-xs text-gray-500">
            Actualizado: {tina.fechaActualizacion.toLocaleTimeString()}
          </div>
        </div>
        
        <Button 
          onClick={() => onViewDetails(tina.id)}
          className="w-full bg-mezcal-600 hover:bg-mezcal-700 text-white"
        >
          Ver Detalles
        </Button>
      </CardContent>
    </Card>
  );
}
