'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";
import { getInitials } from "@/lib/utils";
import {
    User,
    Mail,
    Shield,
    Bell,
    Palette,
    Settings,
    Save,
    Trash2,
    Camera,
    Eye,
    EyeOff,
    Info,
    CheckCircle,
    Loader2
} from "lucide-react";
import { useState, useEffect } from "react";

export default function SettingsPage() {
    const { user, isAuthenticated, isLoading, logout } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Preencher dados do usuário quando carregados
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user?.name || '',
                email: user?.email || ''
            }));
        }
    }, [user]);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        setSaveSuccess(false);

        try {
            // Simular salvamento (implementar API real depois)
            await new Promise(resolve => setTimeout(resolve, 1500));

            setSaveSuccess(true);
            setIsEditing(false);

            // Limpar campos de senha
            setFormData(prev => ({
                ...prev,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }));

            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (error) {
            console.error('Erro ao salvar:', error);
        } finally {
            setIsSaving(false);
        }
    };


    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="text-center py-12">
                <Shield className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Acesso Negado</h2>
                <p className="text-gray-500">Você precisa estar logado para acessar as configurações.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4 sm:space-y-6 max-w-4xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Configurações</h1>
                    <p className="text-gray-500 mt-1">
                        Gerencie suas configurações de conta e preferências
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {saveSuccess && (
                        <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Alterações salvas
                        </Badge>
                    )}
                    <Badge variant="outline" className="text-green-600 border-green-200">
                        <Shield className="w-3 h-3 mr-1" />
                        Conta Ativa
                    </Badge>
                </div>
            </div>

            {/* Perfil do Usuário */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Perfil do Usuário
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Avatar e informações básicas */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                        <div className="relative self-start">
                            <Avatar className="w-16 h-16 sm:w-20 sm:h-20">
                                <AvatarImage src="/placeholder-avatar.jpg" />
                                <AvatarFallback className="text-lg bg-blue-100 text-blue-600">
                                    {getInitials(formData.name || user?.name || 'Usuário')}
                                </AvatarFallback>
                            </Avatar>
                            <Button
                                size="icon"
                                variant="outline"
                                className="absolute -bottom-1 -right-1 rounded-full w-6 h-6 sm:w-8 sm:h-8"
                                disabled={!isEditing}
                            >
                                <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                        </div>
                        <div className="flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nome completo</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        placeholder="Seu nome completo"
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        placeholder="seu@email.com"
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>
                            {user && (
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <Badge variant="secondary">ID: {user?.userxId}</Badge>
                                    <Badge variant="secondary">Status: {user?.status == 'A' ? 'Ativo' : 'Inativo'}</Badge>
                                    {user?.roles && user?.roles.length > 0 && (
                                        <Badge variant="outline">
                                            Perfil: {user?.roles[0].description}
                                        </Badge>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Botões de ação */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        {!isEditing ? (
                            <Button onClick={() => setIsEditing(true)} className="w-full sm:w-auto">
                                <Settings className="w-4 h-4 mr-2" />
                                Editar Perfil
                            </Button>
                        ) : (
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="w-full sm:w-auto"
                                >
                                    {isSaving ? (
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    ) : (
                                        <Save className="w-4 h-4 mr-2" />
                                    )}
                                    {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setIsEditing(false);
                                        // Resetar dados para valores originais
                                        if (user) {
                                            setFormData(prev => ({
                                                ...prev,
                                                name: user?.name || '',
                                                email: user?.email || ''
                                            }));
                                        }
                                    }}
                                    disabled={isSaving}
                                    className="w-full sm:w-auto"
                                >
                                    Cancelar
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Segurança */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Segurança da Conta
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Alert>
                        <Info className="w-4 h-4" />
                        <AlertDescription>
                            Mantenha sua conta segura alterando sua senha regularmente e usando senhas fortes.
                        </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword">Senha atual</Label>
                            <div className="relative">
                                <Input
                                    id="currentPassword"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.currentPassword}
                                    onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="newPassword">Nova senha</Label>
                            <Input
                                id="newPassword"
                                type={showPassword ? "text" : "password"}
                                value={formData.newPassword}
                                onChange={(e) => handleInputChange('newPassword', e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirmar senha</Label>
                            <Input
                                id="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                value={formData.confirmPassword}
                                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowPassword(!showPassword)}
                            className="w-full sm:w-auto"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                            {showPassword ? 'Ocultar' : 'Mostrar'} senhas
                        </Button>
                        <Button
                            variant="default"
                            disabled={!formData.currentPassword || !formData.newPassword || formData.newPassword !== formData.confirmPassword}
                            className="w-full sm:w-auto"
                        >
                            Alterar Senha
                        </Button>
                    </div>

                    {formData.newPassword && formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                        <Alert variant="destructive">
                            <AlertDescription>
                                As senhas não coincidem.
                            </AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>

            {/* Preferências de Notificação */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bell className="w-5 h-5" />
                        Notificações
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium">Notificações por email</h4>
                                <p className="text-sm text-gray-500">Receba atualizações sobre seus quizzes por email</p>
                            </div>
                            <input type="checkbox" className="w-4 h-4 text-blue-600 flex-shrink-0 ml-2" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium">Relatórios semanais</h4>
                                <p className="text-sm text-gray-500">Resumo semanal dos seus quizzes e estatísticas</p>
                            </div>
                            <input type="checkbox" className="w-4 h-4 text-blue-600 flex-shrink-0 ml-2" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium">Notificações de sistema</h4>
                                <p className="text-sm text-gray-500">Atualizações importantes da plataforma</p>
                            </div>
                            <input type="checkbox" className="w-4 h-4 text-blue-600 flex-shrink-0 ml-2" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Preferências de Aparência */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Palette className="w-5 h-5" />
                        Aparência
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <div>
                            <Label className="text-base font-medium">Tema</Label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                                <button className="p-3 border rounded-lg text-left hover:border-blue-300 border-blue-200 bg-blue-50 transition-colors">
                                    <div className="font-medium">Claro</div>
                                    <div className="text-sm text-gray-500">Tema padrão</div>
                                </button>
                                <button className="p-3 border rounded-lg text-left hover:border-gray-300 transition-colors">
                                    <div className="font-medium">Escuro</div>
                                    <div className="text-sm text-gray-500">Melhor para ambientes escuros</div>
                                </button>
                                <button className="p-3 border rounded-lg text-left hover:border-gray-300 transition-colors">
                                    <div className="font-medium">Automático</div>
                                    <div className="text-sm text-gray-500">Baseado no sistema</div>
                                </button>
                            </div>
                        </div>
                        <div>
                            <Label className="text-base font-medium">Idioma</Label>
                            <select className="w-full mt-2 p-2 border rounded-lg bg-white hover:border-gray-300 transition-colors">
                                <option value="pt-BR">Português (Brasil)</option>
                                <option value="en-US">English (US)</option>
                                <option value="es-ES">Español</option>
                            </select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Zona de Perigo */}
            <Card className="border-red-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                        <Trash2 className="w-5 h-5" />
                        Zona de Perigo
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Alert variant="destructive">
                        <AlertDescription>
                            Ações irreversíveis. Proceda com cuidado.
                        </AlertDescription>
                    </Alert>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50 gap-4">
                        <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-red-800">Excluir conta</h4>
                            <p className="text-sm text-red-600">
                                Exclua permanentemente sua conta e todos os dados associados. Esta ação não pode ser desfeita.
                            </p>
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => {
                            if (confirm('Tem certeza que deseja excluir sua conta? Esta ação é irreversível.')) {
                                // Implementar lógica de exclusão
                                console.log('Excluindo conta...');
                            }
                        }} className="w-full sm:w-auto">
                            Excluir Conta
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}