import {
    Sidebar, SidebarTrigger, SidebarHeader, SidebarContent, SidebarGroup,
    SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';
import AppRouter from '@/routes/AppRoutes';
import { Plus, List } from 'lucide-react';
import '@/styles/et-sidebar.scss';
import React from 'react';

function AppSidebar() {
    interface Menu {
        name: string,
        url: string,
        icon: React.ElementType
    }

    const menuList: Menu[] = [
        { name: 'Add Expense', url: '/add-expense', icon: Plus },
        { name: 'Expense List', url: '/expense-list', icon: List }
    ]

    return (
        <div className="flex w-full">
            <Sidebar collapsible="offcanvas">
                <SidebarHeader>
                    <div className="font-bold">
                        <Link className="!text-[#333] !font-bold" to="/">
                            Expense Tracker
                        </Link>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Menus</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu className="sidebar-menu-list">
                                {
                                    menuList.map((menu: Menu, index) => {
                                        return (
                                            <SidebarMenuItem className="menu-item" key={index}>
                                                <SidebarMenuButton className="menu-button" asChild>
                                                    <Link to={menu.url}>
                                                        <menu.icon />
                                                        {menu.name}
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        )
                                    })
                                }
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>

            <main className="w-full h-[100vh]">
                <div className="sidebar-header">
                    <SidebarTrigger className="!p-[4px_18px]" />
                </div>

                <div className="sidebar-content">
                    <AppRouter />
                </div>
            </main>
        </div>
    )
}

export default AppSidebar;