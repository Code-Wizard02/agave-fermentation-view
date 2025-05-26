
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { TipoSensor } from "@/types";

interface CreateSensorDialogProps {
  tinas: Array<{ id: string; nombre: string }>;
  onCreateSensor: (sensorData: {
    tinaId: string;
    tipo: TipoSensor;
  }) => void;
}

const tiposSensor: TipoSensor[] = ['Temperatura', 'pH', 'Nivel', 'Humedad'];

export function CreateSensorDialog({ tinas, onCreateSensor }: CreateSensorDialogProps) {
  const [open, setOpen] = useState(false);
  const [tinaId, setTinaId] = useState("");
  const [tipo, setTipo] = useState<TipoSensor | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tinaId && tipo) {
      onCreateSensor({
        tinaId,
        tipo: tipo as TipoSensor
      });
      setOpen(false);
      setTinaId("");
      setTipo("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-agave-600 hover:bg-agave-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Crear Sensor
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-agave-800">Crear Nuevo Sensor</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tina">Tina Asignada</Label>
            <Select value={tinaId} onValueChange={setTinaId}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tina" />
              </SelectTrigger>
              <SelectContent>
                {tinas.map((tina) => (
                  <SelectItem key={tina.id} value={tina.id}>
                    {tina.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo de Sensor</Label>
            <Select value={tipo} onValueChange={(value) => setTipo(value as TipoSensor)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                {tiposSensor.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-agave-600 hover:bg-agave-700">
              Crear Sensor
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
