import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = await auth();

    if (session) {
        redirect('/')
    }

    return (
        <>
            <div className="space-y-2">
                <Label htmlFor="login">Nome de Usuário</Label>
                <Input id="login" name="login" placeholder="exemplo" required autoComplete="username" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" name="password" type="password" placeholder="••••••••" required autoComplete="current-password" />
            </div>
        </>
    );
}
