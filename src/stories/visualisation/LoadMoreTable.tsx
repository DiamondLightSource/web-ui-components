import { BoxProps, Button, HStack } from "@chakra-ui/react";
import {Table} from "./Table"
import React from "react";

export interface TableProps extends Omit<BoxProps, "onClick"> {
  /** Table data */
  data: Record<string, any>[] | null;
  /** Table headers and mapping to record keys */
  headers: { key: string; label: string }[];
  /** Callback when row is clicked */
  onRowClick?: (item: Record<string, any>, index: number) => void;
  /** Label to be used when displaying "no data available" message */
  label?: string;
  /** Styling variant to use for the rows */
  rowVariant?: string;
  /** feed click behaviour into Load More button */
  onButtonClick?: React.MouseEventHandler<HTMLButtonElement>
}

const LoadMoreTable = ({
  data,
  headers,
  onRowClick,
  label = "data",
  rowVariant = "diamondStriped",
  onButtonClick,
  ...props
}: TableProps) => {

  return (
    <>
    <Table data={data} headers={headers} onClick={onRowClick} label={label} rowVariant={rowVariant} />
    <HStack justify='center' width='100%'>
      <Button colorScheme='teal' variant='outline' onClick={onButtonClick}>
        Load More
      </Button>
    </HStack>
    </>
  );
};

export { LoadMoreTable };
