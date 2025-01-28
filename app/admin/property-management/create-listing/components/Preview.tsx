import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import NumberLabel from './label';
import { UseFormWatch } from 'react-hook-form';
import { useNumberWithCommas } from '@/hooks/useNumberWithComa';
import MediaPreview from './mediaPreview';
import MediaModal from './mediaModal';

interface PreviewProps {
  watch: UseFormWatch<PropertyFormData>;
  primaryFile: FileData;
  otherFiles: FileData[];
  onImageDelete: (type: 'primary' | 'other', index: number) => void;
}

export default function Preview({
  watch,
  otherFiles = [],
  primaryFile,
  onImageDelete
}: PreviewProps) {
  const [expandedOtherFile, setExpandedOtherFile] = useState<string | null>(
    null
  );

  const formValues = watch();

  return (
    <aside className="hidden lg:block w-full max-w-[520px]">
      <h2 className="text-[#000929] text-[1.25rem] font-medium capitalize">
        property listing preview
      </h2>
      {/* Address Display*/}
      <div className="mt-10 w-full relative">
        {/* images */}
        <h3 className="text-[#000929] text-xl font-medium capitalize mb-3">
          name
        </h3>
        <Input
          value={formValues.name}
          disabled
          className="border border-[#E6E6E6] focus-visible:ring-0 focus-visible:outline-0 w-full"
        />

        <NumberLabel
          minValue={formValues.name?.length || 0}
          maxValue={150}
          className="text-[0.75rem] w-fit mt-2"
        />
      </div>

      {/* images */}
      {/* primary image */}
      <div className="mt-10">
        <h3 className="text-[#000929] text-xl font-medium capitalize mb-3">
          Main Image
        </h3>

        <div className="relative w-full min-h-[200px] max-h-[300px] overflow-hidden rounded-[16px] bg-white shadow-md shadow-[#000000]/35 p-4">
          <div>
            {primaryFile?.data ? (
              <MediaPreview
                src={primaryFile.data}
                onClick={() => setExpandedOtherFile(primaryFile.data)}
                onDelete={() => onImageDelete('primary', 0)}
              />
            ) : (
              <div className="col-span-3 flex items-center justify-center h-full">
                <p className="text-gray-400">Add the main image</p>
              </div>
            )}
          </div>
        </div>
        <NumberLabel
          minValue={primaryFile?.data ? 1 : 0}
          maxValue={1}
          className="w-fit text-[0.75rem] ml-auto mt-2"
        />
      </div>

      {/* other images */}
      <div className="mt-10">
        <h3 className="text-[#000929] text-xl font-medium capitalize mb-3">
          Other files
        </h3>
        <div className="relative w-full min-h-[200px] max-h-[350px] overflow-y-auto rounded-[16px] bg-white shadow-md shadow-[#000000]/35 p-4">
          <div className="grid grid-cols-[repeat(3,_minmax(0,_150px))] gap-4">
            {otherFiles.length > 0 ? (
              otherFiles.map((img, index) => (
                <MediaPreview
                  key={index}
                  src={img.data}
                  onClick={() => setExpandedOtherFile(img.data)}
                  onDelete={() => onImageDelete('other', index)}
                />
              ))
            ) : (
              <div className="col-span-3 flex items-center justify-center h-full">
                <p className="text-gray-400">Add up to 7 images</p>
              </div>
            )}
          </div>
        </div>
        <NumberLabel
          minValue={otherFiles.length}
          maxValue={7}
          className="w-fit text-[0.75rem] ml-auto mt-2"
        />
      </div>

      {/* Address Display*/}
      <div className="mt-10 w-full relative">
        <h3 className="text-[#000929] text-xl font-medium capitalize">
          address
        </h3>
        <Input
          value={formValues.address}
          disabled
          className="border border-[#E6E6E6] focus-visible:ring-0 focus-visible:outline-0 w-full"
        />

        <NumberLabel
          minValue={formValues.address?.length || 0}
          maxValue={150}
          className="text-[0.75rem] w-fit mt-2"
        />
      </div>

      {/* Description Display */}
      <div className="mt-10 w-full relative">
        <h3 className="text-[#000929] text-xl font-medium capitalize">
          description
        </h3>
        <Textarea
          value={formValues.description}
          disabled
          className="border border-[#E6E6E6] focus-visible:ring-0 focus-visible:outline-0 w-full"
        />

        <NumberLabel
          minValue={formValues.description?.length || 0}
          maxValue={1500}
          className="text-[0.75rem] w-fit mt-2"
        />
      </div>

      {/* Price Display */}
      <div className="capitalize flex items-center text-xl space-x-3 mt-10">
        <h3 className="text-[#000929] text-xl font-medium">price</h3>
        <div className="flex items-center space-x-px">
          <span className="flex items-center line-through decoration-double">
            N
          </span>
          <span>
            {useNumberWithCommas(formValues.price?.toString() || '0')}
          </span>
        </div>
      </div>

      {/* duration, building type  */}
      <div className="flex flex-col md:flex-row md:items-center ">
        {/* Duration Display */}
        <div className="mt-10 w-full ">
          <h3 className="text-[#000929] text-xl font-medium">Duration</h3>
          <div className="mt-1 block w-fit rounded-md border border-gray-300 bg-[#F7F7F7] py-2 px-3 capitalize">
            {formValues.duration} {formValues.duration === 1 ? 'Year' : 'Years'}
          </div>
        </div>

        {/* Building Type Display */}
        <div className="mt-10 w-full">
          <h3 className="text-[#000929] text-xl font-medium capitalize">
            building Type
          </h3>
          <div className="capitalize mt-1 block w-fit rounded-md border border-gray-300 bg-[#F7F7F7] py-2 px-3">
            {formValues.buildingType}
          </div>
        </div>
      </div>
      {/* beds, baths */}
      <div className="flex flex-col md:flex-row md:items-center">
        {/* Beds Display */}
        <div className="mt-10 w-full">
          <h3 className="text-[#000929] text-xl font-medium">Beds</h3>
          <div className="mt-1 block w-fit rounded-md border border-gray-300 bg-[#F7F7F7] py-2 px-3 capitalize">
            {formValues.beds} {formValues.beds === '1' ? 'bed' : 'beds'}
          </div>
        </div>

        {/* Baths display */}
        <div className="mt-10 w-full">
          <h3 className="text-[#000929] text-xl font-medium">Baths</h3>
          <div className="mt-1 block w-fit rounded-md border border-gray-300 bg-[#F7F7F7] py-2 px-3 capitalize">
            {formValues.baths} {formValues.baths === '1' ? 'bath' : 'baths'}
          </div>
        </div>
      </div>
      {/* Amenities Display */}
      <div className="mt-10 w-full">
        <h3 className="text-[#000929] text-xl font-medium capitalize">
          amenities
        </h3>
        <div className="flex items-center flex-wrap gap-2 text-sm ">
          {formValues.amenities.map((amenity) => (
            <span
              key={amenity}
              className="mt-1 rounded-md border border-[#E6E6E6] bg-[#F7F7F7] py-2 px-3"
            >
              {amenity}
            </span>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {expandedOtherFile && (
        <MediaModal
          expandedOtherFile={expandedOtherFile}
          setExpandedOtherFile={setExpandedOtherFile}
          files={otherFiles.map((file) => file.data)}
        />
      )}
    </aside>
  );
}
