import { auth } from "@/auth";
import { redirect } from "next/navigation";
import RegisterClient from "./RegisterClient";

export default async function RegisterPage() {
    const session = await auth();

    if (session) {
        redirect('/')
    }

    return (
        <RegisterClient />
    );
}
