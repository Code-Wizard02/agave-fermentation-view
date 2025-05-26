
export type TinaEstado = 'Fermentando' | 'Destilando' | 'Reposando' | 'Disponible';
export type TipoAgave = 'Espadin' | 'Madre cuishe' | 'Cuishe' | 'Jabali' | 'Mexicano' | 'Arroqueño' | 'Tobala' | 'Tepextate' | 'Tequilero';
export type TipoSensor = 'Temperatura' | 'pH' | 'Nivel' | 'Humedad';
export type EstadoSensor = 'Conectado' | 'Desconectado' | 'Actualizando';
export type EstadoLote = 'En proceso' | 'Finalizado';
export type EstadoAlerta = 'Leida' | 'No leida';
export type TipoValvula = 'Caliente' | 'Frio';
export type EstadoValvula = 'Abierto' | 'Cerrado';
export type RolUsuario = 'Admin' | 'Operador' | 'Supervisor';

export interface Tina {
  id: string;
  nombre: string;
  capacidad: number; // en litros
  estado: TinaEstado;
  tipoAgave: TipoAgave | null;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}

export interface Sensor {
  id: string;
  tinaId: string;
  tipo: TipoSensor;
  estado: EstadoSensor;
  lectura: number;
  ultimaLectura: Date;
}

export interface Lote {
  id: string;
  tinaId: string;
  tipoAgave: TipoAgave;
  fechaInicio: Date;
  fechaFin: Date | null;
  estado: EstadoLote;
  notas: string;
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  rol: RolUsuario;
  fechaCreacion: Date;
  activo: boolean;
}

export interface Alerta {
  id: string;
  tinaId: string;
  sensorId: string;
  mensaje: string;
  fechaEmision: Date;
  estado: EstadoAlerta;
  leidaEn: Date | null;
  leidaPor: string | null;
}

export interface Valvula {
  id: string;
  tinaId: string;
  tipo: TipoValvula;
  estado: EstadoValvula;
  ultimaAccionPor: string | null;
}

export interface Lectura {
  id: string;
  sensorId: string;
  temperatura?: number;
  ph?: number;
  nivelLiquido?: number;
  timestamp: Date;
}

export interface DashboardStats {
  totalTinas: number;
  tinasFermentando: number;
  tinasDestilando: number;
  alertasActivas: number;
  sensoresDesconectados: number;
}
