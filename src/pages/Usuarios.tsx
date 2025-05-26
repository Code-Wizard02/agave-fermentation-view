
import { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreateUserDialog } from "@/components/CreateUserDialog";
import { EditUserDialog } from "@/components/EditUserDialog";
import { Search, Filter, UserPlus, Edit, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

interface UserWithRole {
  id: string;
  email: string;
  full_name?: string;
  created_at: string;
  role?: 'admin' | 'empleado';
}

const Usuarios = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<'admin' | 'empleado' | 'all'>("all");
  const [editingUser, setEditingUser] = useState<UserWithRole | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      // Get profiles with their roles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          id,
          username,
          full_name,
          created_at
        `);

      if (profilesError) throw profilesError;

      // Get user roles
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Combine data
      const usersWithRoles = profiles?.map(profile => {
        const userRole = roles?.find(role => role.user_id === profile.id);
        return {
          id: profile.id,
          email: profile.username,
          full_name: profile.full_name,
          created_at: profile.created_at,
          role: userRole?.role
        };
      }) || [];

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error loading users:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los usuarios",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userData: { email: string; password: string; fullName: string; role: 'admin' | 'empleado' }) => {
    try {
      // Create user using Supabase Auth Admin API would require server-side implementation
      // For now, we'll show a message about manual user creation
      toast({
        title: "Información",
        description: "Los usuarios deben registrarse mediante el sistema de autenticación. Luego puedes asignar roles.",
        variant: "default",
      });
    } catch (error) {
      console.error('Error creating user:', error);
      toast({
        title: "Error",
        description: "No se pudo crear el usuario",
        variant: "destructive",
      });
    }
  };

  const handleUpdateUserRole = async (userId: string, newRole: 'admin' | 'empleado') => {
    try {
      // Check if user already has a role
      const { data: existingRole } = await supabase
        .from('user_roles')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (existingRole) {
        // Update existing role
        const { error } = await supabase
          .from('user_roles')
          .update({ role: newRole })
          .eq('user_id', userId);

        if (error) throw error;
      } else {
        // Insert new role
        const { error } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: newRole });

        if (error) throw error;
      }

      await loadUsers();
      toast({
        title: "Éxito",
        description: "Rol de usuario actualizado correctamente",
      });
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el rol del usuario",
        variant: "destructive",
      });
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesFilter = filterRole === "all" || user.role === filterRole;
    
    return matchesSearch && matchesFilter;
  });

  const getRoleBadgeColor = (role?: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500 text-white';
      case 'empleado':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  if (loading) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gradient-to-br from-mezcal-50 to-agave-50">
          <AppSidebar />
          <main className="flex-1 p-6">
            <div className="flex items-center justify-center h-64">
              <p className="text-mezcal-600">Cargando usuarios...</p>
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
                  <h1 className="text-2xl font-bold text-mezcal-800">Gestión de Usuarios</h1>
                  <p className="text-mezcal-600">Administra usuarios y roles del sistema</p>
                </div>
              </div>
              
              <CreateUserDialog onCreateUser={handleCreateUser} />
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
                      placeholder="Buscar por email o nombre..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={filterRole} onValueChange={(value: 'admin' | 'empleado' | 'all') => setFilterRole(value)}>
                    <SelectTrigger className="w-full md:w-48">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filtrar por rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los roles</SelectItem>
                      <SelectItem value="admin">Administradores</SelectItem>
                      <SelectItem value="empleado">Empleados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Lista de usuarios */}
            <div className="grid gap-4">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="border-mezcal-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-mezcal-100 rounded-full flex items-center justify-center">
                          <span className="text-mezcal-600 font-semibold">
                            {user.full_name ? user.full_name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-mezcal-800">
                            {user.full_name || 'Sin nombre'}
                          </h3>
                          <p className="text-gray-600">{user.email}</p>
                          <p className="text-sm text-gray-500">
                            Registrado: {new Date(user.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Badge className={`${getRoleBadgeColor(user.role)} px-3 py-1`}>
                          {user.role || 'Sin rol'}
                        </Badge>
                        
                        <Select value={user.role || ''} onValueChange={(value: 'admin' | 'empleado') => handleUpdateUserRole(user.id, value)}>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Asignar rol" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="empleado">Empleado</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setEditingUser(user)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredUsers.length === 0 && (
              <Card className="border-mezcal-200">
                <CardContent className="text-center py-8">
                  <p className="text-gray-500">No se encontraron usuarios que coincidan con los criterios de búsqueda.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>

      {editingUser && (
        <EditUserDialog
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onUpdateUser={() => {
            loadUsers();
            setEditingUser(null);
          }}
        />
      )}
    </SidebarProvider>
  );
};

export default Usuarios;
