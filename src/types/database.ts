
import { Database } from '@/integrations/supabase/types';

export type TinasRow = Database['public']['Tables']['tinas']['Row'];
export type TinasInsert = Database['public']['Tables']['tinas']['Insert'];
export type TinasUpdate = Database['public']['Tables']['tinas']['Update'];

export type SensoresRow = Database['public']['Tables']['sensores']['Row'];
export type SensoresInsert = Database['public']['Tables']['sensores']['Insert'];
export type SensoresUpdate = Database['public']['Tables']['sensores']['Update'];

// Extended types with better typing
export interface TinaWithSensor extends TinasRow {
  sensor?: SensoresRow | null;
}

export interface CreateTinaData {
  nombre: string;
  capacidad: number;
  tipo_agave?: string | null;
}
