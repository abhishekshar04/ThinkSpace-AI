'use client'

import { usePathname } from "next/navigation"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { Fragment } from "react";
  

function Breadcrumbs() {
    const pathname = usePathname();
    const pathSegments = pathname.split('/');
    
  return (
        <Breadcrumb>
    <BreadcrumbList>
        <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {pathSegments.map((segment, index) => {
            if(!segment) return null;
            const href = `/${pathSegments.slice(1, index + 1).join('/')}`;
            const isLast = index === pathSegments.length - 1;
            return (
                <Fragment key={index}>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem >
                    {isLast ? (
                        <BreadcrumbPage>{segment}</BreadcrumbPage>
                    ): (
                        <BreadcrumbLink href={href}>
                            {segment.charAt(0).toUpperCase() + segment.slice(1)}
                        </BreadcrumbLink>
                    )}
                    </BreadcrumbItem>
                </Fragment>
            );
        })}
    </BreadcrumbList>
    </Breadcrumb>

  )
}
export default Breadcrumbs