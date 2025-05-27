
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { SensoresRow } from '@/types/database';

export function useSensores() {
  const { user } = useAuth();

  const {
    data: sensores = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['sensores'],
    queryFn: async (): Promise<SensoresRow[]> => {
      const { data, error } = await supabase
        .from('sensores')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching sensores:', error);
        throw error;
      }

      return data || [];
    },
    enabled: !!user,
  });

  const {
    data: sensoresDisponibles = [],
    isLoading: isLoadingDisponibles
  } = useQuery({
    queryKey: ['sensores-disponibles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('get_sensores_disponibles');

      if (error) {
        console.error('Error fetching sensores disponibles:', error);
        throw error;
      }

      return data || [];
    },
    enabled: !!user,
  });

  return {
    sensores,
    sensoresDisponibles,
    isLoading,
    isLoadingDisponibles,
    error,
  };
}
