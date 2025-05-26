
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, CheckCircle } from "lucide-react";
import { Alerta } from "@/types";

interface AlertasListProps {
  alertas: Alerta[];
  onMarkAsRead: (alertaId: string) => void;
}

export function AlertasList({ alertas, onMarkAsRead }: AlertasListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-orange-600" />
          <span>Alertas Activas</span>
          <Badge variant="destructive" className="ml-auto">
            {alertas.filter(a => a.estado === 'No leida').length}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {alertas.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <CheckCircle className="w-8 h-8 mx-auto mb-2 text-agave-500" />
            <p>No hay alertas activas</p>
          </div>
        ) : (
          alertas.map((alerta) => (
            <div
              key={alerta.id}
              className={`p-3 rounded-lg border ${
                alerta.estado === 'No leida' 
                  ? 'border-orange-200 bg-orange-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    {alerta.mensaje}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="w-3 h-3 text-gray-500" />
                    <span className="text-xs text-gray-500">
                      {alerta.fechaEmision.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                {alerta.estado === 'No leida' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onMarkAsRead(alerta.id)}
                    className="ml-2"
                  >
                    Marcar leída
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
