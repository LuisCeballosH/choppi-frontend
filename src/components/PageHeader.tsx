import Link from "next/link";
import { BreadcrumbItemI } from "@/interfaces/breadcrumb-item";
import { BreadcrumbComponent } from "./Breadcrumb";

interface Props {
  title: string;
  breadcrumbItems: BreadcrumbItemI[];
  link?: string;
  label?: string;
}

const PageHeader = ({ title, breadcrumbItems, link, label }: Props) => {
  return (
    <div className="flex flex-col @2xl/main:flex-row @2xl/main:items-center @2xl/main:justify-between gap-4 mb-6">
      <div>
        <BreadcrumbComponent breadcrumbItems={breadcrumbItems} />
        <h3 className="font-bold text-xl">{title}</h3>
      </div>

      {link && label && (
        <Link
          className="py-2 px-4 bg-[#171717] rounded-lg text-white font-semibold text-sm"
          href={link}
        >
          {label}
        </Link>
      )}
    </div>
  );
};

export default PageHeader;
