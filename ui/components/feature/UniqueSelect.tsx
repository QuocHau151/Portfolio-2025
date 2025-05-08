import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

interface UniqueSelectProps {
  selected: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  placeholder?: string;
}

export function UniqueSelect({
  selected,
  options,
  onChange,
  placeholder,
}: UniqueSelectProps) {
  return (
    <div className="relative">
      <Select
        value={selected}
        onValueChange={(value: string) => {
          onChange(value);
        }}
      >
        <SelectTrigger className="text-whtie w-40">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-black">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
