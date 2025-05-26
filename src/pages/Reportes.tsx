
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FileText, Download, Calendar } from "lucide-react";
import { mockTinas, mockLecturas } from "@/utils/mockData";

const Reportes = () => {
  // Datos para gráficas de reportes
  const estadosData = [
    { estado: 'Fermentando', cantidad: mockTinas.filter(t => t.estado === 'Fermentando').length },
    { estado: 'Destilando', cantidad: mockTinas.filter(t => t.estado === 'Destilando').length },
    { estado: 'Reposando', cantidad: mockTinas.filter(t => t.estado === 'Reposando').length },
    { estado: 'Disponible', cantidad: mockTinas.filter(t => t.estado === 'Disponible').length },
  ];

  const agaveData = mockTinas.reduce((acc, tina) => {
    if (tina.tipoAgave) {
      acc[tina.tipoAgave] = (acc[tina.tipoAgave] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const agaveChartData = Object.entries(agaveData).map(([tipo, cantidad]) => ({
    tipo,
    cantidad
  }));

  const COLORS = ['#f58c4a', '#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];

  const promediosData = [
    { mes: 'Enero', temperatura: 24.5, ph: 4.3 },
    { mes: 'Febrero', temperatura: 25.2, ph: 4.5 },
    { mes: 'Marzo', temperatura: 26.1, ph: 4.2 },
    { mes: 'Abril', temperatura: 27.3, ph: 4.6 },
    { mes: 'Mayo', temperatura: 28.1, ph: 4.4 },
  ];

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
                  <h1 className="text-2xl font-bold text-mezcal-800">Reportes y Análisis</h1>
                  <p className="text-mezcal-600">Análisis detallado del proceso de fermentación</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button variant="outline" className="border-mezcal-300">
                  <Calendar className="w-4 h-4 mr-2" />
                  Filtrar Fechas
                </Button>
                <Button className="bg-mezcal-600 hover:bg-mezcal-700">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar PDF
                </Button>
              </div>
            </div>

            {/* Resumen de reportes */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="border-mezcal-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Procesos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-mezcal-800">{mockTinas.length}</div>
                  <p className="text-xs text-gray-500">Tinas registradas</p>
                </CardContent>
              </Card>
              
              <Card className="border-mezcal-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Eficiencia</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-agave-600">94.2%</div>
                  <p className="text-xs text-gray-500">Promedio mensual</p>
                </CardContent>
              </Card>
              
              <Card className="border-mezcal-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Tiempo Promedio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">168h</div>
                  <p className="text-xs text-gray-500">Fermentación</p>
                </CardContent>
              </Card>
              
              <Card className="border-mezcal-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Producción</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">1,247L</div>
                  <p className="text-xs text-gray-500">Este mes</p>
                </CardContent>
              </Card>
            </div>

            {/* Gráficas principales */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card className="border-mezcal-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-mezcal-800">
                    Estados de Tinas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={estadosData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="estado" fontSize={12} stroke="#666" />
                      <YAxis fontSize={12} stroke="#666" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="cantidad" fill="#f58c4a" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-mezcal-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-mezcal-800">
                    Distribución por Tipo de Agave
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={agaveChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ tipo, percent }) => `${tipo} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="cantidad"
                      >
                        {agaveChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Tendencias mensuales */}
            <Card className="border-mezcal-200 mb-6">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-mezcal-800">
                  Tendencias de Parámetros (Últimos 5 Meses)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={promediosData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="mes" fontSize={12} stroke="#666" />
                    <YAxis fontSize={12} stroke="#666" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="temperatura" fill="#f58c4a" name="Temperatura °C" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="ph" fill="#22c55e" name="pH" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Reportes disponibles */}
            <Card className="border-mezcal-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-mezcal-800">
                  Reportes Disponibles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { titulo: "Reporte Diario", descripcion: "Estado actual de todas las tinas", fecha: "Hoy" },
                    { titulo: "Reporte Semanal", descripcion: "Resumen de la semana pasada", fecha: "Sem. pasada" },
                    { titulo: "Reporte Mensual", descripcion: "Análisis completo del mes", fecha: "Mayo 2025" },
                    { titulo: "Eficiencia por Lote", descripcion: "Análisis de rendimiento por lote", fecha: "Últimos 30 días" },
                    { titulo: "Consumo de Recursos", descripcion: "Uso de agua, energía y materiales", fecha: "Este mes" },
                    { titulo: "Análisis de Calidad", descripcion: "Parámetros de calidad del proceso", fecha: "Trimestre" },
                  ].map((reporte, index) => (
                    <div key={index} className="p-4 border border-mezcal-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-mezcal-800">{reporte.titulo}</h4>
                          <p className="text-sm text-gray-600 mt-1">{reporte.descripcion}</p>
                          <p className="text-xs text-mezcal-600 mt-2">{reporte.fecha}</p>
                        </div>
                        <Button size="sm" variant="outline" className="ml-2">
                          <FileText className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Reportes;
