'use client'
import { navItems } from '@/config/nav'
import React from 'react'
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function NavItems() {
    const pathName = usePathname(); // usePathname()は next/navigation が持つ Hooks であり、 'use client' の指定が必要
    return (
        <>
            { 
                navItems.map((item) => (
                    <Button 
                        key={item.href} 
                        variant={pathName === item.href ? "secondary" : "ghost"}
                        className={cn('justify-start', pathName === item.href && "bg-red-100")} asChild> 
                        <Link href={item.href}>
                            {item.icon && <item.icon className="h-4 w-4 mr-2"/>}
                            {item.title}
                        </Link>
                    </Button>
                ))
            }
        </>
    )
}
