
import {
  Calendar,
  Home,
  Settings,
  BarChart3,
  Thermometer,
  AlertTriangle,
  Beaker,
  Users,
  FileText
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar";
import { useLocation, Link } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Tinas",
    url: "/tinas",
    icon: Beaker,
  },
  {
    title: "Sensores",
    url: "/sensores",
    icon: Thermometer,
  },
  {
    title: "Alertas",
    url: "/alertas",
    icon: AlertTriangle,
  },
  {
    title: "Reportes",
    url: "/reportes",
    icon: FileText,
  },
  {
    title: "Usuarios",
    url: "/usuarios",
    icon: Users,
  },
  {
    title: "Configuración",
    url: "/configuracion",
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-mezcal-200">
      <SidebarHeader className="border-b border-mezcal-200 px-6 py-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-mezcal-500 to-mezcal-600 rounded-lg flex items-center justify-center">
            <Beaker className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-mezcal-800">MEXCLAND</h2>
            <p className="text-xs text-mezcal-600">Sistema de Monitoreo</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-mezcal-700 font-semibold">
            Menú de Navegación
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="data-[active=true]:bg-mezcal-100 data-[active=true]:text-mezcal-800 hover:bg-mezcal-50"
                  >
                    <Link to={item.url} className="flex items-center space-x-3">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-mezcal-200 p-4">
        <div className="text-xs text-mezcal-600 text-center">
          © 2025 Monitor en Tinas
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
