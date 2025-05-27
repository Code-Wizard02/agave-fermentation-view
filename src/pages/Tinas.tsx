
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreateTinaDialog } from "@/components/CreateTinaDialog";
import { Search, Filter, Loader2 } from "lucide-react";
import { useTinas } from "@/hooks/useTinas";
import { CreateTinaData } from "@/types/database";

// Función auxiliar para obtener color del estado
const getEstadoColor = (estado: string) => {
  switch (estado) {
    case 'Fermentando':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'Destilando':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Reposando':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Disponible':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const Tinas = () => {
  const { tinas, isLoading, createTina, isCreating } = useTinas();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado, setFilterEstado] = useState<string>("all");

  const handleCreateTina = async (tinaData: CreateTinaData) => {
    await createTina(tinaData);
  };

  const filteredTinas = tinas.filter(tina => {
    const matchesSearch = tina.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (tina.tipo_agave?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesFilter = filterEstado === "all" || tina.estado === filterEstado;
    
    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gradient-to-br from-mezcal-50 to-agave-50">
          <AppSidebar />
          <main className="flex-1 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Cargando tinas...</span>
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-mezcal-50 to-agave-50">
        <AppSidebar />
        <main className="flex-1">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="hover:bg-mezcal-100" />
                <div>
                  <h1 className="text-2xl font-bold text-mezcal-800">Gestión de Tinas</h1>
                  <p className="text-mezcal-600">Administra todas las tinas de fermentación</p>
                </div>
              </div>
              
              <CreateTinaDialog onCreateTina={handleCreateTina} isLoading={isCreating} />
            </div>

            {/* Filtros y búsqueda */}
            <Card className="mb-6 border-mezcal-200">
              <CardHeader>
                <CardTitle className="text-lg text-mezcal-800">Filtros</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Buscar por nombre o tipo de agave..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={filterEstado} onValueChange={setFilterEstado}>
                    <SelectTrigger className="w-full md:w-48">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filtrar por estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los estados</SelectItem>
                      <SelectItem value="Fermentando">Fermentando</SelectItem>
                      <SelectItem value="Destilando">Destilando</SelectItem>
                      <SelectItem value="Reposando">Reposando</SelectItem>
                      <SelectItem value="Disponible">Disponible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Lista de tinas */}
            <div className="grid gap-4">
              {filteredTinas.map((tina) => (
                <Card key={tina.id} className="border-mezcal-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="text-lg font-semibold text-mezcal-800">{tina.nombre}</h3>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                            <span>Capacidad: {tina.capacidad} L</span>
                            <span>Agave: {tina.tipo_agave || 'No asignado'}</span>
                            {tina.sensor && (
                              <span>Sensor: {tina.sensor.tipo}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Badge className={`${getEstadoColor(tina.estado)} px-3 py-1`}>
                          {tina.estado}
                        </Badge>
                        
                        <Button variant="outline" size="sm">
                          Ver Detalles
                        </Button>
                        
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Creada:</span>
                          <div className="font-medium">
                            {new Date(tina.fecha_creacion).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Última actualización:</span>
                          <div className="font-medium">
                            {new Date(tina.fecha_actualizacion).toLocaleTimeString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Temperatura:</span>
                          <div className="font-medium">
                            {tina.temperatura ? `${tina.temperatura}°C` : 'Sin datos'}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">pH:</span>
                          <div className="font-medium">
                            {tina.ph ? tina.ph : 'Sin datos'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTinas.length === 0 && (
              <Card className="border-mezcal-200">
                <CardContent className="text-center py-8">
                  <p className="text-gray-500">
                    {tinas.length === 0 
                      ? "No hay tinas registradas. Crea la primera tina para comenzar."
                      : "No se encontraron tinas que coincidan con los criterios de búsqueda."
                    }
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Tinas;
