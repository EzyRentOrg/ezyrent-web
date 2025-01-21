import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileUp, Save, CloudUpload } from 'lucide-react';
import NumberLabel from './label';
import {
  Control,
  UseFormWatch,
  FieldErrors,
  Controller
} from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import SelectionButton from './selectionButton';
import {
  amenityOptions,
  bathOptions,
  bedOptions,
  buildingTypes,
  durations
} from '@/app/admin/constants/property-form';
import { useState } from 'react';

interface ListingFormProps {
  control: Control<PropertyFormData>;
  errors: FieldErrors<PropertyFormData>;
  watch: UseFormWatch<PropertyFormData>;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputChange: (field: keyof PropertyFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSaveDraft: () => void;
}

const MAX_ADDRESS_LENGTH = 150;
const MAX_DESCRIPTION_LENGTH = 1500;

export default function ListingForm({
  control,
  errors,
  watch,
  onImageUpload,
  onInputChange,
  onSubmit,
  onSaveDraft
}: ListingFormProps) {
  const [selectedBuildingType, setSelectedBuildingType] = useState<string>('');

  console.log('errors: ', errors);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <aside className="w-full max-w-[740px] flex flex-col space-y-8 lg:pl-10 bg-gradient-to-b from-neutral-50 to-white/70 rounded-lg">
      <h2 className="text-[#000929] text-[1.25rem] font-medium mb-3 capitalize">
        property listing
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section aria-label="Image Upload">
          <h2 className="text-[#000929] text-xl font-medium mb-3">Add Image</h2>
          <div className="bg-white h-40 w-full max-w-[416px] rounded-lg flex items-center justify-center shadow-sm">
            <div className="w-[90%] h-[85%] border border-dashed border-[#CACACA] rounded-lg flex flex-col items-center justify-center">
              <label
                htmlFor="image"
                className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <input
                  id="image"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={onImageUpload}
                  aria-label="Upload images"
                />
                <span className="w-11 h-11 bg-[#F5F5F5] flex items-center justify-center rounded-full mb-2">
                  <FileUp className="text-[#7065F0]" size={24} />
                </span>
                <div className="flex flex-col items-center">
                  <p className="text-center text-sm">
                    <span className="text-[#7065F0] font-medium hover:underline">
                      Click to upload
                    </span>{' '}
                    or{' '}
                    <span className="text-[#7065F0] font-medium hover:underline">
                      Drag and drop
                    </span>
                  </p>
                  <small className="text-[#707070] mt-1">
                    (Max. file size: 25 MB)
                  </small>
                </div>
              </label>
            </div>
          </div>
          {errors.images && (
            <p className="mt-2 text-red-500 text-sm">{errors.images.message}</p>
          )}
        </section>

        <div className="flex-1">
          <h2 className="text-[#000929] text-xl font-medium mb-3">Price</h2>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="focus-visible:ring-1 focus-visible:ring-[#7065F0] bg-[#F7F7F7] border border-[#E6E6E6]"
                placeholder="Enter property price"
                aria-label="Property price"
              />
            )}
          />
          {errors.price && (
            <p className="mt-2 text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        <div className="w-full md:w-[200px] h-auto border-black">
          <h2 className="text-[#000929] text-xl font-medium mb-3">Duration</h2>
          <Controller
            name="duration"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full rounded-md border border-gray-300 bg-[#F7F7F7] py-2 px-3 shadow-sm focus:border-[#7065F0] focus:outline-none focus:ring-1 focus:ring-[#7065F0]"
                aria-label="Select duration"
              >
                {durations.map((duration) => (
                  <option key={duration} value={duration}>
                    {duration}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.duration && (
            <p className="mt-2 text-red-500 text-sm">
              {errors.duration.message}
            </p>
          )}
        </div>

        {/* building type */}
        <div className="w-fit mt-10">
          <h2 className="text-[#000929] text-xl font-medium mb-3">
            Building Type
          </h2>
          <Controller
            name="buildingType"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-5 gap-3 mt-2">
                {buildingTypes.map((type) => (
                  <SelectionButton
                    {...field}
                    key={type}
                    label={type}
                    selected={field.value === type}
                    onClick={() => {
                      setSelectedBuildingType(type);
                      field.onChange(type);
                    }}
                  />
                ))}
              </div>
            )}
          />
          {errors.buildingType && (
            <p className="mt-2 text-red-500 text-sm">
              {errors.buildingType.message}
            </p>
          )}
        </div>

        {/* Beds and Baths */}
        {[
          {
            label: 'No. of Beds',
            options: bedOptions,
            fieldName: 'beds' as const
          },
          {
            label: 'No. of Baths',
            options: bathOptions,
            fieldName: 'baths' as const
          }
        ].map(({ label, options, fieldName }) => (
          <div key={fieldName} className="w-fit mt-10">
            <h2 className="text-[#000929] text-xl font-medium mb-3">{label}</h2>
            <Controller
              name={fieldName}
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <div className="grid grid-cols-5 gap-3 mt-2">
                    {options.map((option) => (
                      <SelectionButton
                        {...field}
                        key={option}
                        label={option}
                        selected={field.value === option}
                        onClick={() => field.onChange(option)}
                      />
                    ))}
                  </div>
                  {fieldState.error && (
                    <p className="mt-2 text-red-500 text-sm">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
        ))}

        {/* Amenities */}
        <div className="mt-10 w-fit">
          <h2 className="text-[#000929] text-xl font-medium mb-3">Amenities</h2>
          <Controller
            name="amenities"
            control={control}
            render={({ field }) => (
              <div className="mt-2 grid grid-cols-3 gap-5">
                {amenityOptions.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      {...field}
                      id={`preview-${amenity}`}
                      checked={field.value?.includes(amenity)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...(field.value || []), amenity]
                          : (field.value || []).filter(
                              (item) => item !== amenity
                            );
                        field.onChange(newValue);
                      }}
                    />
                    <Label htmlFor={`preview-${amenity}`}>{amenity}</Label>
                  </div>
                ))}
              </div>
            )}
          />

          {errors.amenities && (
            <p className="mt-2 text-red-500 text-sm">
              {errors.amenities.message}
            </p>
          )}
        </div>

        {/* Address */}
        <section>
          <h2 className="text-[#000929] text-xl font-medium mb-3">Address</h2>
          <div className="relative">
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    onInputChange('address', e.target.value);
                  }}
                  className="bg-[#F7F7F7] border border-[#E6E6E6] pr-14 focus-visible:ring-1 focus-visible:ring-[#7065F0]"
                  placeholder="Enter property address"
                  aria-label="Property address"
                />
              )}
            />
            <div className="mt-2 flex items-center space-x-5">
              <NumberLabel
                minValue={watch('address')?.length || 0}
                maxValue={MAX_ADDRESS_LENGTH}
                className="bg-[#F7F7F7] text-xs w-fit"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>
          </div>
        </section>

        {/* Description */}
        <section>
          <h2 className="text-[#000929] text-xl font-medium mb-3">
            Description
          </h2>
          <div className="relative">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    onInputChange('description', e.target.value);
                  }}
                  className="bg-[#F7F7F7] border border-[#E6E6E6] pr-14 focus-visible:ring-1 focus-visible:ring-[#7065F0] min-h-[150px]"
                  placeholder="Describe the property"
                  aria-label="Property description"
                />
              )}
            />
            <div className="mt-2 flex items-center space-x-5">
              <NumberLabel
                minValue={watch('description')?.length || 0}
                maxValue={MAX_DESCRIPTION_LENGTH}
                className="bg-[#F7F7F7] text-xs w-fit"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center gap-6 pt-4">
          <Button
            type="button"
            onClick={onSaveDraft}
            className="flex items-center gap-2 h-12 lg:text-[1.1rem] bg-white text-[#037F4A] shadow-sm hover:bg-[#F5FFF9] border border-[#037F4A] transition-colors"
            aria-label="Save draft"
          >
            <span>Save</span>
            <Save size={18} />
          </Button>
          <Button
            type="submit"
            className="flex items-center gap-2 h-12 lg:text-[1.1rem] bg-[#7065F0] hover:bg-[#5B52C5] transition-colors"
            aria-label="Upload listing"
          >
            <span>Upload</span>
            <CloudUpload size={18} />
          </Button>
        </section>
      </form>
    </aside>
  );
}
