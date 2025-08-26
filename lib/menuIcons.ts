import {
    LayoutDashboard,
    Settings,
    BarChart3,
    Users,
    FileText,
    HelpCircle,
    ClipboardList,
    BookOpen,
    Database,
    Shield,
    Building2,
    Dog
} from 'lucide-react';

// Configuração de ícones para cada rota do menu
export const menuIcons: Record<string, React.ComponentType<any>> = {
    // Páginas principais
    '/': LayoutDashboard,
    '/settings': Settings,
    
    // Relatórios
    '/reports': BarChart3,
    '/reports/admin': Shield,
    '/reports/admin/resources': Database,
    '/reports/admin/users': Users,
    '/reports/registrations': ClipboardList,
    
    // Cadastros
    '/registrations': FileText,
    '/registrations/farms': Building2,
    '/registrations/animals': Dog,
    
    // Administração
    '/admin': Shield,
    '/admin/accounts': Building2,
    '/admin/users': Users,
};

// Função para obter o ícone de uma rota
export const getMenuIcon = (url: string): React.ComponentType<any> => {
    return menuIcons[url] || FileText; // FileText como ícone padrão
};