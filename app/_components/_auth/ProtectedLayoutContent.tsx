import { auth } from "@/auth";
import TopBar from "@/app/_components/_TopBar/TopBar";
import { Suspense } from "react";
import MenuListLoader from "@/app/_components/_SideBar/MenuListLoader";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import SideBar from "@/app/_components/_SideBar/SiderBar";
import { Session } from "next-auth";
import { SidebarProvider } from "@/hooks/useSidebar";
import { getMenu, MenuItem } from "@/app/_components/_SideBar/_data_acces/menu/api";
import MenuList from "../_SideBar/MenuIList";

export default async function ProtectedLayoutContent({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    const menuPromise: Promise<MenuItem[]> = getMenu();

    return (
        <SidebarProvider>
            <div className="flex h-screen overflow-hidden bg-gray-50">
                <SideBar session={session as Session}>
                    {/* Navigation */}
                    <Suspense fallback={<MenuListLoader />}>
                        <MenuList menuPromise={menuPromise} />
                    </Suspense>
                </SideBar>

                {/* Main content */}
                <div
                    className={`flex-1 transition-all duration-300 ease-in-out lg:ml-64`}
                >
                    {/* Top bar */}
                    <TopBar session={session} />

                    {/* Page content */}
                    <main className="p-4 sm:p-6 overflow-auto" style={{ height: 'calc(100vh - 4rem)' }}>
                        <div className="max-w-7xl mx-auto">
                            <Breadcrumb />
                            <div className="mt-4 sm:mt-6">
                                {children}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}