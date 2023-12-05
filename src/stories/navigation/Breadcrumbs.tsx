import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbLinkProps,
  BreadcrumbProps,
} from "@chakra-ui/react";
import { MdHome } from "react-icons/md";

export interface BreadcrumbsProps extends BreadcrumbProps {
  path: string;
  as?: BreadcrumbLinkProps["as"];
}

const Breadcrumbs = ({ path, as }: BreadcrumbsProps) => {
  const pathCrumbs = path.split("/").filter((name) => name !== "");

  if (pathCrumbs.length === 0) {
    return null;
  }

  const currentPage = pathCrumbs.pop();

  return (
    <Breadcrumb
      bg='diamond.700'
      w='100%'
      color='diamond.50'
      fontSize='0.9em'
      py='0.2em'
      px='7.6vw'
      id='breadcrumbs'
      separator='>'
    >
      <BreadcrumbItem>
        <BreadcrumbLink _hover={{ opacity: "0.6" }} aria-label='Home' href='/'>
          <MdHome />
        </BreadcrumbLink>
      </BreadcrumbItem>
      {pathCrumbs.map((pathname, i) => {
        return (
          <BreadcrumbItem key={`${pathname}-${i}`}>
            <BreadcrumbLink href={"/" + pathCrumbs.slice(0, i + 1).join("/")} as={as}>
              {pathname}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
      <BreadcrumbItem color='diamond.500'>
        <BreadcrumbLink color='diamond.500' isCurrentPage key={currentPage}>
          {currentPage}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export { Breadcrumbs };
