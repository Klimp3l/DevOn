import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
    const session = await auth();

    if (session) {
        redirect('/')
    }

    return (
        <>
            <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" name="name" type="text" placeholder="Seu nome completo" required autoComplete="name" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="exemplo@email.com" required autoComplete="email" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="login">Nome de Usuário</Label>
                <Input id="login" name="login" placeholder="exemplo" required autoComplete="username" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" name="password" type="password" placeholder="••••••••" required autoComplete="new-password" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirme sua senha</Label>
                <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" required autoComplete="new-password" />
            </div>
        </>
    );
}
