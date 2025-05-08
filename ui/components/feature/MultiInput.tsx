import { Plus, X } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface MultiInputProps {
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export function MultiInput({ values, onChange, placeholder }: MultiInputProps) {
  const handleAdd = () => {
    onChange([...values, ""]);
  };

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, value: string) => {
    const newValues = [...values];
    newValues[index] = value;
    onChange(newValues);
  };

  return (
    <div className="space-y-2">
      {values.map((value, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder={placeholder}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => handleRemove(index)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="default"
        onClick={handleAdd}
        className="w-full border bg-black text-white"
      >
        <Plus className="mr-2 h-4 w-4" />
        Thêm mới
      </Button>
    </div>
  );
}
