import ProtectedLayoutContent from "@/components/auth/ProtectedLayoutContent";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ProtectedLayoutContent>
            {children}
        </ProtectedLayoutContent>
    );
}
