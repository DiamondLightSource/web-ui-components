import { Box, BoxProps, Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useCallback } from "react";

export interface TableProps extends Omit<BoxProps, "onClick"> {
  /** Table data */
  data: Record<string, any>[] | null;
  /** Table headers and mapping to record keys */
  headers: { key: string; label: string }[];
  /** Callback when row is clicked */
  onClick?: (item: Record<string, any>, index: number) => void;
  /** Label to be used when displaying "no data available" message */
  label?: string;
  /** Styling variant to use for the rows */
  rowVariant?: string;
}

const TableView = ({
  data,
  headers,
  onClick,
  label = "data",
  rowVariant = "diamondStriped",
  ...props
}: TableProps) => {
  const handleClick = useCallback(
    (row: React.MouseEvent<HTMLTableRowElement>) => {
      if (onClick && data) {
        const target = (row.target as HTMLTableCellElement).dataset.id;
        if (target) {
          const intTarget = parseInt(target);
          onClick(data[intTarget], intTarget);
        }
      }
    },
    [data, onClick],
  );

  return (
    <Box overflowY='scroll' {...props}>
      {data === null || data.length === 0 ? (
        <Heading py={10} w='100%' variant='notFound'>
          No {label.toLowerCase()} found
        </Heading>
      ) : (
        <Table size='sm' variant={rowVariant}>
          <Thead>
            <Tr>
              {headers.map((header) => (
                <Th key={header.label}>{header.label}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody cursor={onClick ? "pointer" : "initial"}>
            {data.map((item, i) => (
              <Tr h='2vh' key={i} onClick={handleClick}>
                {headers.map((header) => (
                  <Td data-id={i} key={header.key}>
                    {item[header.key]}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export { TableView as Table };
