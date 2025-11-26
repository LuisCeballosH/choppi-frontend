import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

interface Option {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Permite cualquier propiedad en el objeto
}

interface Props {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder: string;
  optionLabel: string; // Ej: 'name', 'title'
  optionValue: string; // Ej: 'id', 'code'
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder,
  optionLabel,
  optionValue,
}: Readonly<Props>) {
  const handleSelect = (option: Option) => {
    const val = option[optionValue];
    const isSelected = value.includes(val);

    if (isSelected) {
      onChange(value.filter((currentVal) => currentVal !== val));
    } else {
      onChange([...value, val]);
    }
  };
  const handleRemove = (valToRemove: string) => {
    onChange(value.filter((currentVal) => currentVal !== valToRemove));
  };

  const selectedOptions = value
    .map((val) => {
      const option = options.find((opt) => opt[optionValue] === val);
      return option ? option[optionLabel] : null;
    })
    .filter((label) => label !== null);

  const selectedValues = value.filter((val) =>
    options.some((opt) => opt[optionValue] === val)
  );
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="bg-white! w-full flex justify-start"
        >
          {selectedValues.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {/* Mapear los Badges para las opciones seleccionadas */}
              {selectedOptions.map((label, index) => (
                <Badge
                  key={selectedValues[index]}
                  className="flex items-center gap-1"
                >
                  {label}
                  <span
                    tabIndex={0}
                    role="button"
                    className="ml-1 p-0 bg-transparent border-0 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(selectedValues[index]);
                    }}
                  >
                    <X className="h-3 w-3 hover:text-primary-foreground/80" />
                  </span>
                </Badge>
              ))}
            </div>
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 rounded-lg">
        <Command className="rounded-lg border shadow-md md:min-w-[450px]">
          <CommandInput placeholder="search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option[optionValue]}
                  onSelect={() => handleSelect(option)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValues.includes(option[optionValue])
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {option[optionLabel]}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
