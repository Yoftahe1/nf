import * as React from 'react';
import { Link } from 'react-router-dom';
import { LifeBuoy, BookOpenText, Send, BarChart,SquarePen } from 'lucide-react';

import icon from '@/assets/icon.svg';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { NavSecondary } from '@/components/nav-secondary';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

const data = {
  navMain: [
    {
      title: 'Learning',
      url: '/app/learn',
      icon: BookOpenText,
      isActive: true,
    },
    // {
    //   title: 'Questions',
    //   url: '/app/questions',
    //   icon: SquarePen,
    //   isActive: false,
    // },
    {
      title: 'Leaderboard',
      url: '/app/leaderboard',
      icon: BarChart,
      isActive: true,
    },
  ],
  navSecondary: [
    {
      title: 'Support',
      url: '#',
      icon: LifeBuoy,
    },
    {
      title: 'Feedback',
      url: '#',
      icon: Send,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                  <img src={icon} className="aspect-square size-12 " />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">ኒቆዲሞስ</span>
                  <span className="truncate text-xs">የማታ ተማሪ</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
