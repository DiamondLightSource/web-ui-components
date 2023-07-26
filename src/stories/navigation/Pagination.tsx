import {
  Box,
  HStack,
  Select,
  Button,
  Text,
  Spacer,
  Divider,
  Stack,
  BoxProps,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";

type PageChangeCallback = (page: number) => void;
type ItemChangeCallback = (items: number) => void;

export interface PaginationProps extends BoxProps {
  /** Total number of items to paginate */
  total: number;
  /** Array with all available "items per page" amounts */
  possibleItemsPerPage?: Array<number>;
  /** External bind for current page */
  page?: number;
  /** Number of items to display per page */
  limit?: number;
  /** Callback for page change events */
  onPageChange?: PageChangeCallback;
  /** Callback for item count change event */
  onItemCountChange?: ItemChangeCallback;
}

const Pagination = ({
  total,
  possibleItemsPerPage = [5, 10, 15, 20, 30, 50, 100],
  limit = 20,
  page,
  onPageChange,
  onItemCountChange,
  ...props
}: PaginationProps) => {
  const [internalPage, setInternalPage] = useState(page || 1);
  // Use limit set in instance, unless it does not exist in the list of possible items per page.
  // Default to middle.
  const [itemsPerPage, setItemsPerPage] = useState(
    possibleItemsPerPage.includes(limit)
      ? limit
      : possibleItemsPerPage[Math.floor(possibleItemsPerPage.length / 2)]
  );
  const [pageAmount, setPageAmount] = useState(1);

  useEffect(() => {
    if (page) {
      setInternalPage(page);
    }
  }, [page]);

  useEffect(() => {
    if (onPageChange !== undefined) {
      onPageChange(internalPage);
    }
  }, [internalPage, onPageChange]);

  useEffect(() => {
    if (onItemCountChange !== undefined) {
      onItemCountChange(itemsPerPage);
    }
  }, [itemsPerPage, onItemCountChange]);

  const updateItemsPerPage = (event: ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = parseInt(event.target.value);
    const newPage = Math.ceil((internalPage * itemsPerPage) / newItemsPerPage);
    setInternalPage(newPage > pageAmount ? 1 : newPage);
    setItemsPerPage(newItemsPerPage);
  };

  useEffect(() => {
    const newPageAmount = Math.ceil(total / itemsPerPage);
    setInternalPage((prevPage) => (prevPage > newPageAmount ? 1 : prevPage));
    setPageAmount(newPageAmount);
  }, [total, itemsPerPage, setInternalPage]);

  return (
    <Box py={2} {...props}>
      <Stack w='100%' direction={{ base: "column", md: "row" }}>
        <HStack>
          <Button
            aria-label='First Page'
            size='sm'
            variant='pgNotSelected'
            onClick={() => setInternalPage(1)}
            isDisabled={internalPage <= 1}
          >
            &lt;&lt;
          </Button>
          <Button
            aria-label='Previous Page'
            size='sm'
            variant='pgNotSelected'
            isDisabled={internalPage <= 1}
            onClick={() => setInternalPage(internalPage - 1)}
          >
            &lt;
          </Button>
          <div>
            {Array.from({ length: pageAmount >= 5 ? 5 : pageAmount }, (_, idx) => {
              let pageDisplay = idx + 1;
              if (pageAmount > 4) {
                pageDisplay = internalPage + idx - (internalPage < 3 ? internalPage - 1 : 2);
                if (pageAmount - internalPage < 2) {
                  pageDisplay -= 2 - (pageAmount - internalPage);
                }
              }
              return (
                <Button
                  size='sm'
                  key={pageDisplay}
                  mx={0.5}
                  variant={pageDisplay === internalPage ? "pgSelected" : "pgNotSelected"}
                  onClick={() => setInternalPage(pageDisplay)}
                >
                  {pageDisplay}
                </Button>
              );
            })}
          </div>
          <Button
            aria-label='Next Page'
            size='sm'
            variant='pgNotSelected'
            isDisabled={internalPage >= pageAmount}
            onClick={() => setInternalPage(internalPage + 1)}
          >
            &gt;
          </Button>
          <Button
            aria-label='Last Page'
            size='sm'
            variant='pgNotSelected'
            isDisabled={internalPage >= pageAmount}
            onClick={() => setInternalPage(pageAmount)}
          >
            &gt;&gt;
          </Button>
        </HStack>
        <Divider display={{ base: "none", md: "initial" }} orientation='vertical' h='30px' />
        <HStack flexGrow='1'>
          <Text id='item-count-label'>
            <b>Items per Page:</b>
          </Text>
          <Select
            aria-labelledby='item-count-label'
            w='max-content'
            size='sm'
            defaultValue={itemsPerPage}
            onChange={updateItemsPerPage}
            flexShrink='1'
          >
            {possibleItemsPerPage.map((perPage) => (
              <option key={`option-${perPage}`}>{perPage}</option>
            ))}
          </Select>
          <Spacer />
          {total > 0 ? (
            <Text color='gray.600'>
              Page {internalPage} out of {pageAmount}
            </Text>
          ) : null}
        </HStack>
      </Stack>
    </Box>
  );
};

export { Pagination };
