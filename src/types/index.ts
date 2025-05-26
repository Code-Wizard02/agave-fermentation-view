
export type TinaEstado = 'Fermentando' | 'Destilando' | 'Reposando' | 'Disponible';
export type TipoAgave = 'Espadin' | 'Madre cuishe' | 'Cuishe' | 'Jabali' | 'Mexicano' | 'Arroqueño' | 'Tobala' | 'Tepextate' | 'Tequilero';
export type TipoSensor = 'Temperatura' | 'pH' | 'Nivel' | 'Humedad';
export type EstadoSensor = 'Conectado' | 'Desconectado' | 'Actualizando';
export type EstadoLote = 'En proceso' | 'Finalizado';
export type EstadoAlerta = 'Leida' | 'No leida';
export type TipoValvula = 'Llenado' | 'Vaciado';
export type EstadoValvula = 'Abierto' | 'Cerrado';
export type RolUsuario = 'admin' | 'empleado';

export interface Tina {
  id: string;
  nombre: string;
  capacidad: number; // en litros
  estado: TinaEstado;
  tipoAgave: TipoAgave | null;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}

export interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: RolUsuario;
  assigned_by: string | null;
  created_at: Date;
}

export interface Lote {
  id: string;
  tina_id: string;
  numero_lote: string;
  tipo_agave: string;
  fecha_inicio: Date;
  fecha_fin: Date | null;
  estado: EstadoLote;
  notas: string | null;
  created_by: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface Valvula {
  id: string;
  tina_id: string;
  nombre: string;
  tipo: TipoValvula;
  estado: EstadoValvula;
  porcentaje_liquido: number;
  controlado_por: string | null;
  ultima_accion: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface CicloCompletado {
  id: string;
  tina_id: string;
  lote_id: string | null;
  fecha_inicio: Date;
  fecha_fin: Date;
  tipo_agave: string;
  created_at: Date;
}

export interface Sensor {
  id: string;
  tinaId: string;
  tipo: TipoSensor;
  estado: EstadoSensor;
  lectura: number;
  ultimaLectura: Date;
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
