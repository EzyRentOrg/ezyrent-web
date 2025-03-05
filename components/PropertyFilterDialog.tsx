import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { SlidersHorizontal } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface FilterParams {
  propertyType: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  minPrice?: number;
  maxPrice?: number;
}

interface PropertyFilterDialogProps {
  onFilterChange: (filters: Partial<FilterParams>) => void;
  currentFilters?: FilterParams;
  minPrice?: number;
  maxPrice?: number;
}

export default function PropertyFilterDialog({
  onFilterChange,
  currentFilters
  // minPrice = 0,
  // maxPrice = 1000000
}: PropertyFilterDialogProps) {
  const [type, setType] = useState<string>(
    currentFilters?.propertyType || 'all'
  );
  const [sort, setSort] = useState<string>(
    currentFilters?.sortBy || 'createdAt'
  );
  const [order, setOrder] = useState<'asc' | 'desc'>(
    currentFilters?.sortOrder || 'desc'
  );
  // const [priceRange, setPriceRange] = useState<number[]>([minPrice, maxPrice]);

  const handleApplyFilters = () => {
    onFilterChange({
      propertyType: type,
      sortBy: sort,
      sortOrder: order
      // minPrice: priceRange[0],
      // maxPrice: priceRange[1]
    });
  };

  const handleSortOrderChange = (value: string) => {
    if (value === 'asc' || value === 'desc') {
      setOrder(value);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10">
          <SlidersHorizontal className="size-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Properties</DialogTitle>
        </DialogHeader>
        {/* price */}
        {/* <div className="space-y-2">
            <Label>Price Range</Label>
            <Slider
              defaultValue={priceRange}
              max={maxPrice}
              min={minPrice}
              step={1000}
              onValueChange={setPriceRange}
              className="mt-2 bg-black"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <p><Naira/>{priceRange[0].toLocaleString()}</p>
              <p><Naira/>{priceRange[1].toLocaleString()}</p>
            </div>
          </div> */}
        {/* proerty type */}
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Property Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="hotel">Hotel</SelectItem>
                <SelectItem value="flat">Flat</SelectItem>
                <SelectItem value="shortlet">Shortlet</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* sort */}
          <div className="space-y-2">
            <Label>Sort By</Label>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt">Date Added</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Sort Order</Label>
            <Select value={order} onValueChange={handleSortOrderChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sort order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Descending</SelectItem>
                <SelectItem value="asc">Ascending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={handleApplyFilters}>Apply Filters</Button>
      </DialogContent>
    </Dialog>
  );
}
