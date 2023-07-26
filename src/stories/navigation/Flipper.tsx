import { Button, HStack, InputRightAddon, InputGroup, Input, Skeleton } from "@chakra-ui/react";
import { useEffect, useState, FocusEvent as ReactFocusEvent, useCallback, useMemo } from "react";
import { debounce } from "utils/generic";

export interface FlipperProps {
  /** Total number of pages */
  total: number;
  /** Component size */
  size?: "xs" | "md";
  /** External bind for current page */
  page?: number;
  /** Callback for page change events */
  onChange?: (page: number) => void;
  /** Debounced callback for page change events */
  onChangeEnd?: (page: number) => void;
  /** Which page to start from if page is not set */
  startFrom?: "start" | "middle" | "end";
  /** Disable component */
  disabled?: boolean;
  /** Default page */
  defaultPage?: number;
}

export const Flipper = ({
  total,
  onChange,
  onChangeEnd,
  size = "xs",
  page,
  defaultPage,
  startFrom = "end",
  disabled = false,
}: FlipperProps) => {
  const [value, setValue] = useState<string | undefined>();

  const handleDebouncedPageChange = useMemo(
    () => debounce((page: number) => onChangeEnd!(page)),
    [onChangeEnd]
  );

  const setPage = useCallback(
    (newPage: number) => {
      if (!isNaN(newPage) && newPage !== page) {
        if (onChange !== undefined) {
          onChange(newPage);
        }

        if (onChangeEnd !== undefined) {
          handleDebouncedPageChange(newPage);
        }
      }

      if (page === undefined) {
        setValue(newPage.toString());
      }
    },
    [onChange, page, handleDebouncedPageChange, onChangeEnd]
  );

  const boundaryCheck = useCallback(
    (value?: number) => value !== undefined && value > 0 && value <= total,
    [total]
  );

  useEffect(() => {
    if (boundaryCheck(page)) {
      setValue(page!.toString());
    }
  }, [page, boundaryCheck]);

  useEffect(() => {
    if (value !== undefined || total === 0) {
      return;
    }

    if (total !== undefined && page === undefined) {
      switch (startFrom) {
        case "end":
          setValue(total.toString());
          break;
        case "middle":
          if (total !== 0) {
            setValue(Math.round(total / 2).toString());
          }
          break;
        case "start":
          setValue("1");
          break;
      }
    }
  }, [total, startFrom, page, value]);

  useEffect(() => {
    if (boundaryCheck(defaultPage) && page === undefined) {
      setValue(defaultPage!.toString());
      return;
    }
  }, [defaultPage, boundaryCheck, page]);

  const editPage = useCallback(
    (event: ReactFocusEvent<HTMLInputElement>) => {
      let newPage = parseInt(event.target.value);

      if (newPage > total) {
        newPage = total;
      }
      if (newPage < 1) {
        newPage = 1;
      }

      if (!isNaN(newPage)) {
        setPage(newPage);
      }
    },
    [setPage, total]
  );

  if (value === undefined) {
    return <Skeleton h='20px' w={size === "xs" ? "210px" : "295px"} />;
  }

  return (
    <HStack py={size === "xs" ? 1 : 0} maxW={size === "xs" ? "230px" : "295px"}>
      <Button aria-label='First Page' isDisabled={disabled} size={size} onClick={() => setPage(1)}>
        &lt;&lt;
      </Button>
      <Button
        aria-label='Previous Page'
        size={size}
        isDisabled={parseInt(value) === 1 || disabled}
        onClick={() => setPage(parseInt(value) - 1)}
      >
        &lt;
      </Button>
      <InputGroup size={size}>
        <Input
          isDisabled={disabled}
          bg='white'
          aria-label='Current Page'
          onChange={(event) => setValue(event.target.value)}
          value={value}
          onBlur={editPage}
        />
        <InputRightAddon aria-label='Total Pages' children={total} />
      </InputGroup>
      <Button
        size={size}
        isDisabled={parseInt(value) === total || disabled}
        onClick={() => setPage(parseInt(value) + 1)}
        aria-label='Next Page'
      >
        &gt;
      </Button>
      <Button
        aria-label='Last Page'
        size={size}
        isDisabled={disabled}
        onClick={() => setPage(total)}
      >
        &gt;&gt;
      </Button>
    </HStack>
  );
};
