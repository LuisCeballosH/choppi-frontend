import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BreadcrumbItemI } from "@/interfaces/breadcrumb-item";
import React from "react";

interface Props {
  breadcrumbItems: BreadcrumbItemI[];
}

export function BreadcrumbComponent({ breadcrumbItems }: Readonly<Props>) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            {item.link ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={item.link}>{item.label}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
