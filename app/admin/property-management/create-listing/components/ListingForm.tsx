import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save, CloudUpload } from 'lucide-react';
import {
  Control,
  UseFormWatch,
  FieldErrors,
  Controller,
  UseFormSetValue
} from 'react-hook-form';
import {
  amenityOptions,
  bathOptions,
  bedOptions,
  buildingTypes,
  durations,
  MAX_ADDRESS_LENGTH,
  MAX_DESCRIPTION_LENGTH
} from '@/app/admin/constants/property-form';
import { Checkbox } from '@/components/ui/checkbox';
import MediaUploadField from './mediaUploadField';
import { Label } from '@/components/ui/label';
import SelectionButton from './selectionButton';
import FormError from './FormError';
import NumberLabel from './label';
import ErrorSummary from './ErrorSummary';
import RenderSelectionSection from './renderSelection';
import React from 'react';

interface ListingFormProps {
  control: Control<PropertyFormData>;
  errors: FieldErrors<PropertyFormData>;
  watch: UseFormWatch<PropertyFormData>;
  setValue: UseFormSetValue<PropertyFormData>;
  handlePrimaryFileUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'primary' | 'other'
  ) => void;
  handleOtherFileUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'primary' | 'other'
  ) => void;
  handleSaveDraft: () => void;
  onInputChange: (field: keyof PropertyFormData, value: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (
    e: React.DragEvent<HTMLDivElement>,
    type: 'primary' | 'other'
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  isDragging: boolean;
}

export default function ListingForm({
  control,
  errors,
  watch,
  setValue,
  handlePrimaryFileUpload,
  handleOtherFileUpload,
  handleSaveDraft,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onInputChange,
  onSubmit,
  isDragging
}: ListingFormProps) {
  // Remove a primary file
  const removePrimaryFile = () => {
    setValue('primaryFile', { name: '', data: '' });
  };

  // Remove an other file
  const removeOtherFile = (index: number) => {
    const currentOtherFiles = watch('otherFiles') || [];
    const updatedFiles = currentOtherFiles.filter((_, i) => i !== index);
    setValue('otherFiles', updatedFiles);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <aside className="mx-auto flex flex-col space-y-8 bg-gradient-to-b from-neutral-50 to-white/70 rounded-lg">
      <h2 className="text-[#000929] text-[1.25rem] font-medium mb-3 capitalize">
        Property Listing Form
      </h2>

      <ErrorSummary errors={errors} />
      <form onSubmit={handleSubmit} className="w-full space-y-8">
        <section aria-label="Image Upload">
          <h2 className="text-[#000929] text-xl font-medium mb-3">
            Add Images
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {/* primary image */}
            <MediaUploadField
              label="Primary file"
              type="primary"
              handleFileUpload={(e) => handlePrimaryFileUpload(e, 'primary')}
              isDragging={isDragging}
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, 'primary')}
              files={watch('primaryFile') ? [watch('primaryFile')] : []}
              removeFile={removePrimaryFile}
            />

            {/* other files */}
            <MediaUploadField
              label="Other files"
              type="other"
              handleFileUpload={(e) => handleOtherFileUpload(e, 'other')}
              isDragging={isDragging}
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, 'other')}
              files={watch('otherFiles') || []}
              removeFile={removeOtherFile}
            />
          </div>
        </section>

        {/* Price */}
        <div className="mt-10 w-full md:w-[200px] h-auto">
          <h2 className="text-[#000929] text-xl font-medium mb-3">Price</h2>
          <Controller
            name="price"
            control={control}
            rules={{
              required: 'Price is required',
              validate: (value) =>
                !isNaN(Number(value)) || 'Price must be a valid number'
            }}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                min={0}
                step={0.01}
                className="pl-8 focus-visible:ring-1 focus-visible:ring-[#7065F0] bg-[#F7F7F7] border border-[#E6E6E6]"
                placeholder="Enter property price"
              />
            )}
          />
          <FormError message={errors.price?.message} />
        </div>

        {/* Duration */}
        <div className="w-full mt-10 md:w-[200px] h-auto">
          <h2 className="text-[#000929] text-xl font-medium mb-3">Duration</h2>
          <Controller
            name="duration"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full rounded-md border border-gray-300 bg-[#F7F7F7] py-2 px-3 shadow-sm focus:border-[#7065F0] focus:outline-none focus:ring-1 focus:ring-[#7065F0]"
              >
                {durations.map((duration) => (
                  <option key={duration} value={duration}>
                    {duration}
                  </option>
                ))}
              </select>
            )}
          />
          <FormError message={errors.duration?.message} />
        </div>

        {/* building type */}
        <div className=" mt-10">
          <h2 className="text-[#000929] text-xl font-medium mb-3">
            Building Type
          </h2>
          <Controller
            name="buildingType"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-2">
                {buildingTypes.map((type) => (
                  <SelectionButton
                    {...field}
                    key={type}
                    label={type}
                    selected={field.value === type}
                    onClick={() => {
                      field.onChange(type);
                    }}
                  />
                ))}
              </div>
            )}
          />
          <FormError message={errors.buildingType?.message} />
        </div>

        {/* beds and baths */}
        {[
          {
            label: 'No. of Beds',
            options: bedOptions,
            fieldName: 'beds' as keyof PropertyFormData
          },
          {
            label: 'No. of Baths',
            options: bathOptions,
            fieldName: 'baths' as keyof PropertyFormData
          }
        ].map(({ label, options, fieldName }, index) => (
          <React.Fragment key={`${fieldName}-${index}`}>
            {RenderSelectionSection({
              errors,
              control,
              label,
              options,
              fieldName
            })}
          </React.Fragment>
        ))}

        {/* amenities */}

        <div className="mt-10">
          <h2 className="text-[#000929] text-xl font-medium mb-3">Amenities</h2>
          <Controller
            name="amenities"
            control={control}
            render={({ field }) => (
              <div className="mt-2 grid grid-cols-2 lg:grid-cols-3 gap-5">
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
          <FormError message={errors.amenities?.message} />
        </div>

        {/* address */}
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

              <FormError message={errors.address?.message} />
            </div>
          </div>
        </section>

        {/* description */}
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

              <FormError message={errors.description?.message} />
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center gap-6 pt-4">
          <Button
            type="button"
            onClick={handleSaveDraft}
            className="flex items-center gap-2 h-12 lg:text-[1.1rem] bg-white text-[#037F4A] shadow-sm hover:bg-[#F5FFF9] border border-[#037F4A] transition-colors"
            aria-label="Save draft"
          >
            <span>Save</span>
            <Save size={18} />
          </Button>

          {/* save */}
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
