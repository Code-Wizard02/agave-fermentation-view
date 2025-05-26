
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { TipoAgave } from "@/types";

interface CreateTinaDialogProps {
  onCreateTina: (tinaData: {
    nombre: string;
    capacidad: number;
    tipoAgave: TipoAgave | null;
  }) => void;
}

const tiposAgave: TipoAgave[] = [
  'Espadin', 'Madre cuishe', 'Cuishe', 'Jabali', 'Mexicano', 
  'Arroqueño', 'Tobala', 'Tepextate', 'Tequilero'
];

export function CreateTinaDialog({ onCreateTina }: CreateTinaDialogProps) {
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [tipoAgave, setTipoAgave] = useState<TipoAgave | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nombre && capacidad) {
      onCreateTina({
        nombre,
        capacidad: parseFloat(capacidad),
        tipoAgave
      });
      setOpen(false);
      setNombre("");
      setCapacidad("");
      setTipoAgave(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-mezcal-600 hover:bg-mezcal-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Crear Tina
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-mezcal-800">Crear Nueva Tina</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre de la Tina</Label>
            <Input
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Tina #7"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="capacidad">Capacidad (Litros)</Label>
            <Input
              id="capacidad"
              type="number"
              value={capacidad}
              onChange={(e) => setCapacidad(e.target.value)}
              placeholder="Ej: 1500"
              min="1"
              step="0.1"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tipoAgave">Tipo de Agave (Opcional)</Label>
            <Select value={tipoAgave || ""} onValueChange={(value) => setTipoAgave(value as TipoAgave)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo de agave" />
              </SelectTrigger>
              <SelectContent>
                {tiposAgave.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>
                    {tipo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-mezcal-600 hover:bg-mezcal-700">
              Crear Tina
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
