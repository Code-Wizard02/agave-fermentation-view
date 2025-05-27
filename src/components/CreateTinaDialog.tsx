
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Loader2 } from "lucide-react";
import { CreateTinaData } from "@/types/database";

interface CreateTinaDialogProps {
  onCreateTina: (tinaData: CreateTinaData) => Promise<void>;
  isLoading?: boolean;
}

const tiposAgave = [
  'Espadin', 'Madre cuishe', 'Cuishe', 'Jabali', 'Mexicano', 
  'Arroqueño', 'Tobala', 'Tepextate', 'Tequilero'
];

const capacidadesPermitidas = [1000, 1500];

export function CreateTinaDialog({ onCreateTina, isLoading = false }: CreateTinaDialogProps) {
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [capacidad, setCapacidad] = useState<number>(1000);
  const [tipoAgave, setTipoAgave] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nombre && capacidad) {
      try {
        await onCreateTina({
          nombre,
          capacidad,
          tipo_agave: tipoAgave || null
        });
        setOpen(false);
        setNombre("");
        setCapacidad(1000);
        setTipoAgave("");
      } catch (error) {
        console.error('Error creating tina:', error);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-mezcal-600 hover:bg-mezcal-700 text-white" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Plus className="w-4 h-4 mr-2" />
          )}
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
            <Select value={capacidad.toString()} onValueChange={(value) => setCapacidad(parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar capacidad" />
              </SelectTrigger>
              <SelectContent>
                {capacidadesPermitidas.map((cap) => (
                  <SelectItem key={cap} value={cap.toString()}>
                    {cap} L
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tipoAgave">Tipo de Agave (Opcional)</Label>
            <Select value={tipoAgave} onValueChange={setTipoAgave}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo de agave" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Sin asignar</SelectItem>
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
            <Button type="submit" className="bg-mezcal-600 hover:bg-mezcal-700" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creando...
                </>
              ) : (
                "Crear Tina"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
