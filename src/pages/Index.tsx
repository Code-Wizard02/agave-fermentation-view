
import { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { StatsCards } from "@/components/StatsCards";
import { TinaCard } from "@/components/TinaCard";
import { AlertasList } from "@/components/AlertasList";
import { TinaChart } from "@/components/TinaChart";
import { CreateTinaDialog } from "@/components/CreateTinaDialog";
import { CreateSensorDialog } from "@/components/CreateSensorDialog";
import { 
  mockTinas, 
  mockSensores, 
  mockAlertas, 
  mockLecturas,
  generateRandomReading 
} from "@/utils/mockData";
import { Tina, Sensor, Alerta, Lectura, DashboardStats, TipoSensor } from "@/types";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [tinas, setTinas] = useState<Tina[]>(mockTinas);
  const [sensores, setSensores] = useState<Sensor[]>(mockSensores);
  const [alertas, setAlertas] = useState<Alerta[]>(mockAlertas);
  const [lecturas, setLecturas] = useState<Lectura[]>(mockLecturas);

  // Calcular estadísticas del dashboard
  const stats: DashboardStats = {
    totalTinas: tinas.length,
    tinasFermentando: tinas.filter(t => t.estado === 'Fermentando').length,
    tinasDestilando: tinas.filter(t => t.estado === 'Destilando').length,
    alertasActivas: alertas.filter(a => a.estado === 'No leida').length,
    sensoresDesconectados: sensores.filter(s => s.estado === 'Desconectado').length
  };

  // Simular actualizaciones en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      // Actualizar lecturas de sensores aleatoriamente
      setSensores(prevSensores => 
        prevSensores.map(sensor => {
          if (Math.random() > 0.7) { // 30% de probabilidad de actualización
            const newReading = generateRandomReading(sensor.id, sensor.tipo);
            const newValue = sensor.tipo === 'Temperatura' ? newReading.temperatura! :
                           sensor.tipo === 'pH' ? newReading.ph! :
                           sensor.tipo === 'Nivel' ? newReading.nivelLiquido! : sensor.lectura;
            
            return {
              ...sensor,
              lectura: newValue,
              ultimaLectura: new Date()
            };
          }
          return sensor;
        })
      );

      // Actualizar fechas de actualización de tinas
      setTinas(prevTinas =>
        prevTinas.map(tina => ({
          ...tina,
          fechaActualizacion: new Date()
        }))
      );
    }, 30000); // Actualizar cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  const handleCreateTina = (tinaData: { nombre: string; capacidad: number; tipoAgave: any }) => {
    const newTina: Tina = {
      id: (tinas.length + 1).toString(),
      nombre: tinaData.nombre,
      capacidad: tinaData.capacidad,
      estado: 'Disponible',
      tipoAgave: tinaData.tipoAgave,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    };
    
    setTinas([...tinas, newTina]);
    toast({
      title: "Tina creada",
      description: `${newTina.nombre} ha sido creada exitosamente.`,
    });
  };

  const handleCreateSensor = (sensorData: { tinaId: string; tipo: TipoSensor }) => {
    const newSensor: Sensor = {
      id: (sensores.length + 1).toString(),
      tinaId: sensorData.tinaId,
      tipo: sensorData.tipo,
      estado: 'Conectado',
      lectura: 0,
      ultimaLectura: new Date()
    };
    
    setSensores([...sensores, newSensor]);
    toast({
      title: "Sensor creado",
      description: `Sensor de ${sensorData.tipo} ha sido creado exitosamente.`,
    });
  };

  const handleMarkAlertAsRead = (alertaId: string) => {
    setAlertas(prev =>
      prev.map(alerta =>
        alerta.id === alertaId
          ? { ...alerta, estado: 'Leida' as const, leidaEn: new Date() }
          : alerta
      )
    );
    toast({
      title: "Alerta marcada como leída",
      description: "La alerta ha sido marcada como leída.",
    });
  };

  const handleViewTinaDetails = (tinaId: string) => {
    const tina = tinas.find(t => t.id === tinaId);
    toast({
      title: "Ver detalles",
      description: `Mostrando detalles de ${tina?.nombre}`,
    });
  };

  const alertasActivas = alertas.filter(a => a.estado === 'No leida');

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
                  <h1 className="text-2xl font-bold text-mezcal-800">
                    Monitoreo en Etapa de Fermentación
                  </h1>
                  <p className="text-mezcal-600">Dashboard principal del sistema</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <CreateSensorDialog 
                  tinas={tinas.map(t => ({ id: t.id, nombre: t.nombre }))}
                  onCreateSensor={handleCreateSensor}
                />
                <CreateTinaDialog onCreateTina={handleCreateTina} />
              </div>
            </div>

            {/* Estadísticas */}
            <StatsCards stats={stats} />

            {/* Alertas y Gráficas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <div className="lg:col-span-1">
                <AlertasList 
                  alertas={alertasActivas} 
                  onMarkAsRead={handleMarkAlertAsRead}
                />
              </div>
              
              <div className="lg:col-span-2 space-y-4">
                <TinaChart
                  lecturas={lecturas}
                  title="Temperatura (°C)"
                  dataKey="temperatura"
                  color="#f58c4a"
                  unit="°C"
                />
                <TinaChart
                  lecturas={lecturas}
                  title="Nivel de pH"
                  dataKey="ph"
                  color="#22c55e"
                  unit=""
                />
              </div>
            </div>

            {/* Grid de Tinas */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-mezcal-800">
                  Monitoreo en Tinas
                </h2>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    ● Sensores desconectados
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tinas.map((tina) => (
                  <TinaCard
                    key={tina.id}
                    tina={tina}
                    sensores={sensores.filter(s => s.tinaId === tina.id)}
                    onViewDetails={handleViewTinaDetails}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
