import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import NumberLabel from "./label";
import { ImagePreview } from "./imagePreview";
import ImageModal from "./imageModal";
import { Control, Controller, UseFormWatch } from "react-hook-form";
import { useNumberWithCommas } from "@/hooks/useNumberWithComa";

interface PreviewProps {
  control: Control<PropertyFormData>;
  watch: UseFormWatch<PropertyFormData>;
  images: string[];
  onImageDelete: (index: number) => void;
}

export default function Preview({
  control,
  watch,
  images,
  onImageDelete
}: PreviewProps) {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const formValues = watch();

   return (
    <aside className="w-full max-w-[520px]">
      {/* Images Display */}
      <div>
        <div className="relative w-full h-[350px] overflow-y-auto rounded-[16px] bg-white shadow-md shadow-[#000000]/35 p-4">
          <div className="grid grid-cols-[repeat(3,_minmax(0,_150px))] gap-4">
            {images.length > 0 ? (
              images.map((img, index) => (
                <ImagePreview
                  key={index}
                  src={img}
                  onClick={() => setExpandedImage(img)}
                  onDelete={() => onImageDelete(index)}
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
          minValue={images.length}
          maxValue={7}
          className="w-fit text-[0.75rem] ml-auto mt-2"
        />
      </div>

      {/* Address Display*/}
      <div className="mt-10 w-full relative">
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              disabled
              className="border-none pr-14 focus-visible:ring-0 focus-visible:outline-0 w-full"
            />
          )}
        />
        <NumberLabel
          minValue={formValues.address?.length || 0}
          maxValue={150}
          className="text-[0.75rem] w-fit"
        />
      </div>

      {/* Description Display */}
      <div className="mt-10 w-full relative">
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              disabled
              className="focus-visible:ring-0 focus-visible:outline-0 w-full"
            />
          )}
        />
        <NumberLabel
          minValue={formValues.description?.length || 0}
          maxValue={1500}
          className="text-[0.75rem] w-fit"
        />
      </div>

      {/* Price Display */}
      <div className="capitalize flex items-center space-x-3 text-[1.125rem] mt-10">
        <h3 className="capitalize">price</h3>
        <span className="flex items-center">
          <Image
            src={"/icons/naira-currency.svg"}
            width={28}
            height={28}
            alt="Naira symbol"
            className="mr-1 text-black w-4"
          />
          <span>{useNumberWithCommas(formValues.price?.toString() || "0")}</span>
        </span>
      </div>

      {/* Duration Display */}
      <div className="mt-10 ">
        <h3 className="capitalize">Duration</h3>
        <div className="mt-1 block w-fit rounded-md border border-gray-300 bg-[#F7F7F7] py-2 px-3">
          {formValues.duration}
        </div>
      </div>

      {/* Building Type Display */}
      <div className="mt-10 ">
        <h3 className="capitalize">building Type</h3>
        <div className="mt-1 block w-fit rounded-md border border-gray-300 bg-[#F7F7F7] py-2 px-3">
          {formValues.buildingType}
        </div>
      </div>

      {/* Beds Display */}
      <div className="mt-10 ">
        <h3 className="capitalize">Beds</h3>
        <div className="mt-1 block w-fit rounded-md border border-gray-300 bg-[#F7F7F7] py-2 px-3">
          {formValues.beds}
        </div>
      </div>

      {/* Batjs display */}
      <div className="mt-10">
        <h3 className="capitalize">Baths</h3>
        <div className="mt-1 block w-fit rounded-md border border-gray-300 bg-[#F7F7F7] py-2 px-3">
          {formValues.baths}
        </div>
      </div>
      {/* Amenities Display */}
      <div className="mt-10">
        <h3 className="capitalize">amenities</h3>
        <div className="grid grid-cols-4 gap-5">
          {formValues.amenities.map((amenity) => (
            <span key={amenity} className="mt-1 block w-fit rounded-md border border-gray-300 bg-[#F7F7F7] py-2 px-3">{amenity}</span>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {expandedImage && (
        <ImageModal
          expandedImage={expandedImage}
          setExpandedImage={setExpandedImage}
          images={images}
        />
      )}
    </aside>
  );
}