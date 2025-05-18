import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

interface MultiSelectProps {
  selected: string[];
  options: { id: number; name: string }[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export function MultiSelect({
  selected,
  options,
  onChange,
  placeholder,
}: MultiSelectProps) {
  return (
    <div className="relative">
      <Select
        value={selected[selected.length - 1] || ""}
        onValueChange={(value: string) => {
          const newSelected = selected.includes(value)
            ? selected.filter((v) => v !== value)
            : [...selected, value];
          onChange(newSelected);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder}>
            {selected.length > 0
              ? `${selected.length} tags đã chọn`
              : placeholder}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-black">
          {options?.map((option) => (
            <SelectItem key={option.id} value={option.name}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selected.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selected.map((value) => (
            <div
              key={value}
              className="bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
            >
              {options?.find((opt) => opt.name === value)?.name}
              <button
                onClick={() => {
                  onChange(selected.filter((v) => v !== value));
                }}
                className="ml-2 transition-colors hover:text-red-500"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
