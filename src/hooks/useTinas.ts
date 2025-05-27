
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { TinaWithSensor, CreateTinaData } from '@/types/database';

export function useTinas() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: tinas = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['tinas'],
    queryFn: async (): Promise<TinaWithSensor[]> => {
      const { data, error } = await supabase
        .from('tinas')
        .select(`
          *,
          sensor:sensores(*)
        `)
        .order('fecha_creacion', { ascending: false });

      if (error) {
        console.error('Error fetching tinas:', error);
        throw error;
      }

      return data || [];
    },
    enabled: !!user,
  });

  const createTinaMutation = useMutation({
    mutationFn: async (tinaData: CreateTinaData) => {
      const { data, error } = await supabase
        .from('tinas')
        .insert({
          ...tinaData,
          created_by: user?.id,
          updated_by: user?.id,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating tina:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tinas'] });
      toast({
        title: "Tina creada",
        description: "La tina ha sido creada exitosamente.",
      });
    },
    onError: (error) => {
      console.error('Create tina error:', error);
      toast({
        title: "Error",
        description: "No se pudo crear la tina. Inténtalo de nuevo.",
        variant: "destructive",
      });
    },
  });

  return {
    tinas,
    isLoading,
    error,
    createTina: createTinaMutation.mutateAsync,
    isCreating: createTinaMutation.isPending,
  };
}
