"use client"

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "../../components/Layouts";
import AdminHeader from "../../components/AdminHeader";
import Preview from "./components/Preview";
import ListingForm from "./components/ListingForm";
import { propertyFormSchema } from "@/lib/validations";

const STORAGE_KEY = "property_listing_draft";
const MAX_ADDRESS_LENGTH = 150;
const MAX_DESCRIPTION_LENGTH = 1500;
const MAX_IMAGES = 7;

const initialFormData: PropertyFormData = {
  address: "",
  description: "",
  price: "",
  duration: "1 year",
  images: [],
  buildingType: "flat",
  beds: "2 beds",
  baths: "3 baths",
  amenities: [],
  error: null,
  errorMessage: null,
};

export default function CreateListing() {
  const router = useRouter();
  const [formError, setFormError] = useState<{ field: string; message: string } | null>(null);

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: initialFormData,
  });

  const {
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors },
  } = form;

  // Watch form values for auto-saving
  const formValues = watch();

  // Auto-save form data to localStorage whenever values change
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formValues));
      } catch (error) {
        console.error("Error saving form:", error);
        setFormError({
          field: "save",
          message: "Failed to save draft. The images might be too large."
        });
      }
    }, 1000); // Debounce save for 1 second

    return () => clearTimeout(saveTimeout);
  }, [formValues]);

  // Load saved form data once on mount
  useEffect(() => {
    try {
      const savedForm = localStorage.getItem(STORAGE_KEY);
      if (savedForm) {
        const parsedForm = JSON.parse(savedForm);
        reset(parsedForm);
      }
    } catch (error) {
      console.error("Error loading saved form:", error);
      setFormError({
        field: "load",
        message: "Failed to load draft. Please try again."
      });
    }
  }, [reset]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const currentImages = watch("images");
    if (currentImages.length + e.target.files.length > MAX_IMAGES) {
      setFormError({
        field: "images",
        message: `You cannot upload more than ${MAX_IMAGES} images`
      });
      return;
    }

    try {
      const newImages = await Promise.all(
        Array.from(e.target.files).map((file) =>
          new Promise<string>((resolve, reject) => {
            // Add file size check
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
              reject(new Error("File size too large"));
              return;
            }

            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
        )
      );

      setValue("images", [...currentImages, ...newImages]);
      setFormError(null);
    } catch (error) {
      console.error("Error processing images:", error);
      setFormError({
        field: "images",
        message: "Error uploading images. Please ensure each image is under 5MB."
      });
    }
  };

  const handleImageDelete = (index: number) => {
    const currentImages = watch("images");
    setValue("images", currentImages.filter((_, i) => i !== index));
    setFormError(null);
  };

  const handleInputChange = (field: keyof PropertyFormData, value: string) => {
    if (field === "address" && value.length > MAX_ADDRESS_LENGTH) return;
    if (field === "description" && value.length > MAX_DESCRIPTION_LENGTH) return;
    setValue(field, value);
    setFormError(null);
  };

  const handleSaveDraft = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formValues));
      alert("Draft saved successfully!");
    } catch (error) {
      console.error("Error saving draft:", error);
      setFormError({
        field: "save",
        message: "Failed to save draft. The images might be too large."
      });
    }
  };

  const onSubmit = async (data: PropertyFormData) => {
    try {
      console.log("Submitting property listing:", data);
      localStorage.removeItem(STORAGE_KEY);
      alert("Property listing created successfully!");
      router.push("/admin/property-management");
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormError({
        field: "submit",
        message: "Error submitting form. Please try again."
      });
    }
  };

  return (
    <DashboardLayout>
      <AdminHeader title="Create Listing" />
      <main className="p-5">
        <Button
          variant="default"
          onClick={() => router.push("/admin/property-management")}
          className="capitalize flex items-center space-x-1 bg-[#7065F0] mb-5"
        >
          <MoveLeft />
          <span>Go Back</span>
        </Button>

        {formError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {formError.message}
          </div>
        )}

        <section className="grid grid-cols-2 gap-10">
          <Preview
            control={control}
            watch={watch}
            images={watch("images")}
            onImageDelete={handleImageDelete}
          />
          <ListingForm
            control={control}
            errors={errors}
            watch={watch}
            onImageUpload={handleImageUpload}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit(onSubmit)}
            onSaveDraft={handleSaveDraft}
          />
        </section>
      </main>
    </DashboardLayout>
  );
}