import { Input, InputProps } from "@chakra-ui/react";
import { FormEvent, useMemo } from "react";
import { debounce } from "utils/generic";

export interface DebounceProps extends InputProps {
  /* Function to be called when user finishes input */
  onChangeEnd: (text: string) => void;
}

export const DebouncedInput = ({ onChangeEnd, ...props }: DebounceProps) => {
  const handleUpdate = useMemo(
    () =>
      debounce((event: FormEvent<HTMLInputElement>) =>
        onChangeEnd((event.target as HTMLInputElement).value)
      ),
    [onChangeEnd]
  );

  return (
    <Input
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          onChangeEnd(e.currentTarget.value);
        }
      }}
      onBlur={(e) => onChangeEnd(e.currentTarget.value)}
      onChange={handleUpdate}
      {...props}
    />
  );
};
