import { Button, HStack } from "@chakra-ui/react";
import {Table, TableProps} from "./Table"
import React from "react";

export interface LoadMoreTableProps extends TableProps {
  /** feed click behaviour into Load More button */
  onButtonClick?: React.MouseEventHandler<HTMLButtonElement>
  // number of rows to be added while the table is loading
  loadingRows?: number
  //disable button once all data is loaded
  isDisabled: boolean
}

const LoadMoreTable = ({
  onButtonClick,
  loadingRows = 0,
  isDisabled = false,
  ...props
}: LoadMoreTableProps) => {

  return (
    <>
    <Table {...props} loadingRows={loadingRows}/>
    <HStack justify='center' width='100%'>
      <Button colorScheme='teal' variant='outline' onClick={onButtonClick} isLoading={loadingRows !== 0} loadingText='Loading' isDisabled={isDisabled}>
        Load More
      </Button>
    </HStack>
    </>
  );
};

export { LoadMoreTable };
