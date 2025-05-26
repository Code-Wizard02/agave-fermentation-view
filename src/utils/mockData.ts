
import { 
  Tina, 
  Sensor, 
  Lote, 
  Usuario, 
  Alerta, 
  Valvula, 
  Lectura,
  TinaEstado,
  TipoAgave,
  TipoSensor,
  EstadoSensor
} from '@/types';

// Mock data para demostración
export const mockTinas: Tina[] = [
  {
    id: '1',
    nombre: 'Tina #1',
    capacidad: 1265.8,
    estado: 'Fermentando',
    tipoAgave: 'Cuishe',
    fechaCreacion: new Date('2024-05-20T08:00:00'),
    fechaActualizacion: new Date()
  },
  {
    id: '2',
    nombre: 'Tina #2',
    capacidad: 660.8,
    estado: 'Fermentando',
    tipoAgave: 'Madre cuishe',
    fechaCreacion: new Date('2024-05-18T10:30:00'),
    fechaActualizacion: new Date()
  },
  {
    id: '3',
    nombre: 'Tina #3',
    capacidad: 1530.5,
    estado: 'Disponible',
    tipoAgave: 'Arroqueño',
    fechaCreacion: new Date('2024-05-15T14:15:00'),
    fechaActualizacion: new Date()
  },
  {
    id: '4',
    nombre: 'Tina #4',
    capacidad: 649.0,
    estado: 'Destilando',
    tipoAgave: 'Jabali',
    fechaCreacion: new Date('2024-05-10T09:45:00'),
    fechaActualizacion: new Date()
  },
  {
    id: '5',
    nombre: 'Tina #5',
    capacidad: 784.2,
    estado: 'Disponible',
    tipoAgave: 'Tobala',
    fechaCreacion: new Date('2024-05-05T11:20:00'),
    fechaActualizacion: new Date()
  },
  {
    id: '6',
    nombre: 'Tina #6',
    capacidad: 1813.2,
    estado: 'Destilando',
    tipoAgave: 'Tobala',
    fechaCreacion: new Date('2024-05-01T16:00:00'),
    fechaActualizacion: new Date()
  }
];

export const mockSensores: Sensor[] = [
  {
    id: '1',
    tinaId: '1',
    tipo: 'Temperatura',
    estado: 'Conectado',
    lectura: 25.2,
    ultimaLectura: new Date()
  },
  {
    id: '2',
    tinaId: '1',
    tipo: 'pH',
    estado: 'Conectado',
    lectura: 4.9,
    ultimaLectura: new Date()
  },
  {
    id: '3',
    tinaId: '1',
    tipo: 'Nivel',
    estado: 'Conectado',
    lectura: 84,
    ultimaLectura: new Date()
  },
  {
    id: '4',
    tinaId: '2',
    tipo: 'Temperatura',
    estado: 'Conectado',
    lectura: 30.3,
    ultimaLectura: new Date()
  },
  {
    id: '5',
    tinaId: '2',
    tipo: 'pH',
    estado: 'Conectado',
    lectura: 3.5,
    ultimaLectura: new Date()
  },
  {
    id: '6',
    tinaId: '2',
    tipo: 'Nivel',
    estado: 'Conectado',
    lectura: 63.2,
    ultimaLectura: new Date()
  }
];

export const mockLotes: Lote[] = [
  {
    id: '1',
    tinaId: '1',
    tipoAgave: 'Cuishe',
    fechaInicio: new Date('2024-05-20T08:00:00'),
    fechaFin: null,
    estado: 'En proceso',
    notas: 'Lote de agave cuishe de excelente calidad, proceso de fermentación natural iniciado.'
  },
  {
    id: '2',
    tinaId: '2',
    tipoAgave: 'Madre cuishe',
    fechaInicio: new Date('2024-05-18T10:30:00'),
    fechaFin: null,
    estado: 'En proceso',
    notas: 'Agave madre cuishe silvestre, fermentación con levaduras nativas.'
  }
];

export const mockUsuarios: Usuario[] = [
  {
    id: '1',
    nombre: 'Juan Pérez',
    email: 'juan@mezcaleria.com',
    telefono: '+52 951 123 4567',
    rol: 'Admin',
    fechaCreacion: new Date('2024-01-15'),
    activo: true
  },
  {
    id: '2',
    nombre: 'María González',
    email: 'maria@mezcaleria.com',
    telefono: '+52 951 765 4321',
    rol: 'Operador',
    fechaCreacion: new Date('2024-02-20'),
    activo: true
  }
];

export const mockAlertas: Alerta[] = [
  {
    id: '1',
    tinaId: '1',
    sensorId: '2',
    mensaje: 'pH fuera del rango óptimo (4.9) - Se recomienda revisión',
    fechaEmision: new Date(),
    estado: 'No leida',
    leidaEn: null,
    leidaPor: null
  },
  {
    id: '2',
    tinaId: '2',
    sensorId: '4',
    mensaje: 'Temperatura elevada (30.3°C) - Monitorear de cerca',
    fechaEmision: new Date(Date.now() - 1000 * 60 * 30),
    estado: 'No leida',
    leidaEn: null,
    leidaPor: null
  }
];

export const mockValvulas: Valvula[] = [
  {
    id: '1',
    tinaId: '1',
    tipo: 'Frio',
    estado: 'Cerrado',
    ultimaAccionPor: '1'
  },
  {
    id: '2',
    tinaId: '1',
    tipo: 'Caliente',
    estado: 'Cerrado',
    ultimaAccionPor: '1'
  }
];

export const mockLecturas: Lectura[] = Array.from({ length: 50 }, (_, i) => ({
  id: `${i + 1}`,
  sensorId: '1',
  temperatura: 25 + Math.random() * 5,
  ph: 4.5 + Math.random() * 1,
  nivelLiquido: 80 + Math.random() * 10,
  timestamp: new Date(Date.now() - (50 - i) * 1000 * 60 * 30) // datos cada 30 min
}));

// Funciones para simular actualizaciones en tiempo real
export const generateRandomReading = (sensorId: string, type: TipoSensor): Lectura => {
  const baseValues = {
    Temperatura: 25 + Math.random() * 8,
    pH: 4.2 + Math.random() * 1.5,
    Nivel: 70 + Math.random() * 25,
    Humedad: 60 + Math.random() * 30
  };

  return {
    id: Date.now().toString(),
    sensorId,
    temperatura: type === 'Temperatura' ? baseValues.Temperatura : undefined,
    ph: type === 'pH' ? baseValues.pH : undefined,
    nivelLiquido: type === 'Nivel' ? baseValues.Nivel : undefined,
    timestamp: new Date()
  };
};

export const calculateFermentationTime = (fechaCreacion: Date): string => {
  const now = new Date();
  const diff = now.getTime() - fechaCreacion.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  
  if (days > 0) {
    return `${days}d ${remainingHours}h`;
  }
  return `${remainingHours}h`;
};

export const getEstadoColor = (estado: TinaEstado): string => {
  switch (estado) {
    case 'Fermentando':
      return 'bg-mezcal-500 text-white';
    case 'Destilando':
      return 'bg-orange-500 text-white';
    case 'Reposando':
      return 'bg-amber-500 text-white';
    case 'Disponible':
      return 'bg-agave-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

export const getSensorEstadoColor = (estado: EstadoSensor): string => {
  switch (estado) {
    case 'Conectado':
      return 'text-agave-600';
    case 'Desconectado':
      return 'text-red-600';
    case 'Actualizando':
      return 'text-mezcal-600';
    default:
      return 'text-gray-600';
  }
};
