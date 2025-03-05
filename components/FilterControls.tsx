import { PROPERTY_TYPES, SORT_OPTIONS } from '@/app/admin/constants';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface FilterControlProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
}

export const FilterControl = ({
  label,
  value,
  onValueChange,
  options
}: FilterControlProps) => (
  <div className="min-w-[150px]">
    <Label>{label}</Label>
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
      </SelectTrigger>
      <SelectContent>
        {options.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

interface FilterControlsProps {
  filterParams: FilterParams;
  handleFilterChange: (updates: Partial<FilterParams>) => void;
}

export const FilterControls = ({
  filterParams,
  handleFilterChange
}: FilterControlsProps) => (
  <div className="hidden md:flex items-center gap-6">
    <FilterControl
      label="Property Type"
      value={filterParams.propertyType}
      onValueChange={(value) => handleFilterChange({ propertyType: value })}
      options={PROPERTY_TYPES}
    />
    <FilterControl
      label="Sort By"
      value={filterParams.sortBy}
      onValueChange={(value) => handleFilterChange({ sortBy: value })}
      options={SORT_OPTIONS}
    />
    <FilterControl
      label="Sort Order"
      value={filterParams.sortOrder}
      onValueChange={(value) =>
        handleFilterChange({ sortOrder: value as 'asc' | 'desc' })
      }
      options={[
        { value: 'desc', label: 'Descending' },
        { value: 'asc', label: 'Ascending' }
      ]}
    />
  </div>
);
