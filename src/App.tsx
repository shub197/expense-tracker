import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/system/AppSidebar";

export default function App() {
    return (
        <SidebarProvider defaultOpen={true}>
            <AppSidebar />
        </SidebarProvider>
    );
}

