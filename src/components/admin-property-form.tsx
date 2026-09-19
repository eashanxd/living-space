"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { allLocations } from "@/data/location-data";
import {
  defaultFacilities,
  defaultFurnishingDetails,
  facilityFieldOptions,
  furnishingFieldOptions,
  type Facilities,
  type FurnishingDetails,
} from "@/data/properties";

const propertyTypes = ["Apartment", "Villa", "Builder Floor"] as const;
const furnishingOptions = ["Fully Furnished", "Semi Furnished", "Unfurnished"] as const;
const availableForOptions = ["Rent", "Sale", "Rent-Sale"] as const;
const statusOptions = [
  ["available", "Available"],
  ["sold", "Sold"],
  ["rented", "Rented"],
  ["unavailable", "Unavailable"],
] as const;

const inputClassName = "w-full rounded-xl border border-[#dfe3df] bg-white px-3.5 py-3 text-sm text-[#25373d] outline-none transition focus:border-[#1a2b2f] focus:ring-2 focus:ring-[#dfe9e8] disabled:cursor-not-allowed disabled:bg-[#f4f1ed]";
const labelClassName = "mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[#6b6258]";

type SelectedFile = {
  file: File;
  previewUrl?: string;
};

type FormValues = {
  title: string;
  location: string;
  propertyType: string;
  configuration: string;
  rent: string;
  price: string;
  plotArea: string;
  furnishing: string;
  availableFor: string;
  availableFrom: string;
  postedBy: string;
  status: string;
  about: string;
  furnishing_details: FurnishingDetails;
  facilities: Facilities;
};

type UploadedFile = { bucket: "property-images" | "property-videos"; path: string };

function createInitialValues(): FormValues {
  return {
    title: "",
    location: "",
    propertyType: "",
    configuration: "",
    rent: "",
    price: "",
    plotArea: "",
    furnishing: "",
    availableFor: "",
    availableFrom: "",
    postedBy: "",
    status: "available",
    about: "",
    furnishing_details: { ...defaultFurnishingDetails },
    facilities: { ...defaultFacilities },
  };
}

function validateFiles(files: File[], kind: "image" | "video") {
  const accepted = kind === "image" ? ["image/jpeg", "image/png", "image/webp"] : ["video/mp4", "video/webm", "video/quicktime"];
  const label = kind === "image" ? "JPG, PNG, or WEBP" : "MP4, WebM, or MOV";
  const invalid = files.find((file) => !accepted.includes(file.type));
  return invalid ? `Unsupported ${kind} file: ${invalid.name}. Use ${label}.` : "";
}

function parseNullableNumber(value: string) {
  if (!value.trim()) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

export function AdminPropertyForm() {
  const router = useRouter();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState<FormValues>(createInitialValues);
  const [images, setImages] = useState<SelectedFile[]>([]);
  const [videos, setVideos] = useState<SelectedFile[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadState, setUploadState] = useState("");

  const updateValue = (key: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const handleFiles = (event: ChangeEvent<HTMLInputElement>, kind: "image" | "video") => {
    const selected = Array.from(event.target.files ?? []);
    const fileError = validateFiles(selected, kind);
    if (fileError) {
      setError(fileError);
      event.target.value = "";
      return;
    }

    setError("");
    const next = selected.map((file) => ({ file, previewUrl: kind === "image" ? URL.createObjectURL(file) : undefined }));
    if (kind === "image") setImages((current) => [...current, ...next]);
    else setVideos((current) => [...current, ...next]);
    event.target.value = "";
  };

  const removeFile = (kind: "image" | "video", index: number) => {
    const collection = kind === "image" ? images : videos;
    const removed = collection[index];
    if (removed.previewUrl) URL.revokeObjectURL(removed.previewUrl);
    if (kind === "image") setImages((current) => current.filter((_, itemIndex) => itemIndex !== index));
    else setVideos((current) => current.filter((_, itemIndex) => itemIndex !== index));
  };

  const resetForm = () => {
    images.forEach((item) => item.previewUrl && URL.revokeObjectURL(item.previewUrl));
    setValues(createInitialValues());
    setImages([]);
    setVideos([]);
    setError("");
  };

  const uploadFiles = async (propertyId: string, selectedFiles: SelectedFile[], bucket: "property-images" | "property-videos", setState: (message: string) => void) => {
    const supabase = createClient();
    const uploaded: UploadedFile[] = [];
    const urls: string[] = [];

    for (let index = 0; index < selectedFiles.length; index += 1) {
      const selected = selectedFiles[index];
      const extension = selected.file.name.split(".").pop()?.toLowerCase() || "bin";
      const path = `${propertyId}/${String(index + 1).padStart(2, "0")}-${crypto.randomUUID()}.${extension}`;
      setState(`Uploading ${bucket === "property-images" ? "images" : "videos"} (${index + 1}/${selectedFiles.length})`);
      const { error: uploadError } = await supabase.storage.from(bucket).upload(path, selected.file, {
        cacheControl: "3600",
        contentType: selected.file.type,
        upsert: false,
      });
      if (uploadError) throw new Error(uploadError.message);
      uploaded.push({ bucket, path });
      urls.push(supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl);
    }

    return { uploaded, urls };
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const requiredFields: [keyof FormValues, string][] = [
      ["title", "Title"],
      ["location", "Location"],
      ["propertyType", "Property type"],
      ["configuration", "Configuration"],
      ["plotArea", "Plot area"],
      ["furnishing", "Furnishing"],
      ["availableFor", "Available for"],
      ["availableFrom", "Available from"],
      ["postedBy", "Posted by"],
      ["status", "Status"],
    ];
    const missing = requiredFields.find(([key]) => !String(values[key]).trim());
    if (missing) {
      setError(`${missing[1]} is required.`);
      return;
    }

    const rent = parseNullableNumber(values.rent);
    const price = parseNullableNumber(values.price);
    if (rent === undefined || price === undefined) {
      setError("Rent and price must be valid non-negative numbers or left blank.");
      return;
    }

    setIsSubmitting(true);
    const propertyId = crypto.randomUUID();
    const uploadedFiles: UploadedFile[] = [];

    try {
      const supabase = createClient();
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData.user) throw new Error("Your admin session has expired. Please sign in again.");

      const imageUpload = await uploadFiles(propertyId, images, "property-images", setUploadState);
      uploadedFiles.push(...imageUpload.uploaded);
      const videoUpload = await uploadFiles(propertyId, videos, "property-videos", setUploadState);
      uploadedFiles.push(...videoUpload.uploaded);

      setUploadState("Saving property");
      const { error: insertError } = await supabase.from("properties").insert({
        id: propertyId,
        title: values.title.trim(),
        location: values.location,
        property_type: values.propertyType,
        configuration: values.configuration.trim(),
        rent,
        price,
        plot_area: values.plotArea.trim(),
        furnishing: values.furnishing,
        available_for: values.availableFor,
        available_from: values.availableFrom,
        posted_by: values.postedBy.trim(),
        images: imageUpload.urls,
        videos: videoUpload.urls,
        status: values.status,
        about: values.about.trim(),
        furnishing_details: values.furnishing_details,
        facilities: values.facilities,
      });
      if (insertError) throw new Error(insertError.message);

      resetForm();
      setSuccess("Property added successfully. It is now available on the public listings.");
      router.refresh();
    } catch (submissionError) {
      if (uploadedFiles.length) {
        const supabase = createClient();
        await Promise.all(
          ["property-images", "property-videos"].map(async (bucket) => {
            const paths = uploadedFiles.filter((file) => file.bucket === bucket).map((file) => file.path);
            if (paths.length) await supabase.storage.from(bucket).remove(paths);
          }),
        );
      }
      setError(submissionError instanceof Error ? submissionError.message : "Unable to add this property. Please try again.");
    } finally {
      setUploadState("");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {error ? <div role="alert" className="rounded-2xl border border-[#ead6d1] bg-[#fbf1ef] px-4 py-3 text-sm text-[#7a3931]">{error}</div> : null}
      {success ? <div role="status" className="rounded-2xl border border-[#cfe5d8] bg-[#f0faf3] px-4 py-3 text-sm text-[#285b3e]">{success}</div> : null}

      <section className="rounded-[1.5rem] border border-[#e7e0d7] bg-white p-5 shadow-[0_12px_28px_rgba(22,32,33,0.04)] sm:p-6">
        <h2 className="text-xl font-semibold text-[#1a2b2f]">Property information</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2"><label className={labelClassName} htmlFor="property-title">Title</label><input id="property-title" className={inputClassName} value={values.title} onChange={(event) => updateValue("title", event.target.value)} disabled={isSubmitting} /></div>
          <div><label className={labelClassName} htmlFor="property-location">Location</label><select id="property-location" className={inputClassName} value={values.location} onChange={(event) => updateValue("location", event.target.value)} disabled={isSubmitting}><option value="">Select location</option>{allLocations.map((location) => <option key={location}>{location}</option>)}</select></div>
          <div><label className={labelClassName} htmlFor="property-type">Property type</label><select id="property-type" className={inputClassName} value={values.propertyType} onChange={(event) => updateValue("propertyType", event.target.value)} disabled={isSubmitting}><option value="">Select type</option>{propertyTypes.map((option) => <option key={option}>{option}</option>)}</select></div>
          <div><label className={labelClassName} htmlFor="property-configuration">Configuration</label><input id="property-configuration" className={inputClassName} placeholder="3 BHK" value={values.configuration} onChange={(event) => updateValue("configuration", event.target.value)} disabled={isSubmitting} /></div>
          <div><label className={labelClassName} htmlFor="property-plot-area">Plot area</label><input id="property-plot-area" className={inputClassName} placeholder="250 sq yd" value={values.plotArea} onChange={(event) => updateValue("plotArea", event.target.value)} disabled={isSubmitting} /></div>
          <div><label className={labelClassName} htmlFor="property-rent">Rent <span className="font-normal normal-case tracking-normal">(optional)</span></label><input id="property-rent" type="number" min="0" step="1" className={inputClassName} value={values.rent} onChange={(event) => updateValue("rent", event.target.value)} disabled={isSubmitting} /></div>
          <div><label className={labelClassName} htmlFor="property-price">Price <span className="font-normal normal-case tracking-normal">(optional)</span></label><input id="property-price" type="number" min="0" step="1" className={inputClassName} value={values.price} onChange={(event) => updateValue("price", event.target.value)} disabled={isSubmitting} /></div>
          <div><label className={labelClassName} htmlFor="property-furnishing">Furnishing</label><select id="property-furnishing" className={inputClassName} value={values.furnishing} onChange={(event) => updateValue("furnishing", event.target.value)} disabled={isSubmitting}><option value="">Select furnishing</option>{furnishingOptions.map((option) => <option key={option}>{option}</option>)}</select></div>
          <div><label className={labelClassName} htmlFor="property-available-for">Available for</label><select id="property-available-for" className={inputClassName} value={values.availableFor} onChange={(event) => updateValue("availableFor", event.target.value)} disabled={isSubmitting}><option value="">Select availability</option>{availableForOptions.map((option) => <option key={option}>{option}</option>)}</select></div>
          <div><label className={labelClassName} htmlFor="property-available-from">Available from</label><input id="property-available-from" type="date" className={inputClassName} value={values.availableFrom} onChange={(event) => updateValue("availableFrom", event.target.value)} disabled={isSubmitting} /></div>
          <div><label className={labelClassName} htmlFor="property-posted-by">Posted by</label><input id="property-posted-by" className={inputClassName} placeholder="Living Space" value={values.postedBy} onChange={(event) => updateValue("postedBy", event.target.value)} disabled={isSubmitting} /></div>
          <div><label className={labelClassName} htmlFor="property-status">Status</label><select id="property-status" className={inputClassName} value={values.status} onChange={(event) => updateValue("status", event.target.value)} disabled={isSubmitting}>{statusOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div>
          <div className="md:col-span-2"><label className={labelClassName} htmlFor="property-about">About</label><textarea id="property-about" rows={5} className={inputClassName} value={values.about} onChange={(event) => updateValue("about", event.target.value)} disabled={isSubmitting} /></div>
        </div>
      </section>

      <FeatureFieldset title="Furnishing details" options={furnishingFieldOptions} values={values.furnishing_details} onChange={(key, checked) => setValues((current) => ({ ...current, furnishing_details: { ...current.furnishing_details, [key]: checked } }))} disabled={isSubmitting} />
      <FeatureFieldset title="Facilities" options={facilityFieldOptions} values={values.facilities} onChange={(key, checked) => setValues((current) => ({ ...current, facilities: { ...current.facilities, [key]: checked } }))} disabled={isSubmitting} />

      <section className="rounded-[1.5rem] border border-[#e7e0d7] bg-white p-5 shadow-[0_12px_28px_rgba(22,32,33,0.04)] sm:p-6">
        <h2 className="text-xl font-semibold text-[#1a2b2f]">Property media</h2>
        <p className="mt-2 text-sm text-[#687779]">Upload optional images and videos. Files are stored in Supabase Storage and only their public URLs are saved with the property.</p>
        <MediaPicker kind="image" files={images} inputRef={imageInputRef} accept="image/jpeg,image/png,image/webp" onChange={(event) => handleFiles(event, "image")} onRemove={(index) => removeFile("image", index)} disabled={isSubmitting} />
        <MediaPicker kind="video" files={videos} inputRef={videoInputRef} accept="video/mp4,video/webm,video/quicktime" onChange={(event) => handleFiles(event, "video")} onRemove={(index) => removeFile("video", index)} disabled={isSubmitting} />
      </section>

      {uploadState ? <p className="text-sm font-medium text-[#54666b]" role="status">{uploadState}</p> : null}
      <button type="submit" disabled={isSubmitting} className="inline-flex w-full items-center justify-center rounded-full bg-[#1b2d32] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#14262b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b2d32] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#7d8e90] sm:w-auto sm:min-w-48">
        {isSubmitting ? "Adding property..." : "Add property"}
      </button>
    </form>
  );
}

function FeatureFieldset<T extends string>({ title, options, values, onChange, disabled }: { title: string; options: readonly (readonly [T, string])[]; values: Record<T, boolean>; onChange: (key: T, checked: boolean) => void; disabled: boolean }) {
  return (
    <section className="rounded-[1.5rem] border border-[#e7e0d7] bg-white p-5 shadow-[0_12px_28px_rgba(22,32,33,0.04)] sm:p-6">
      <h2 className="text-xl font-semibold text-[#1a2b2f]">{title}</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {options.map(([key, label]) => (
          <label key={key} className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#eee5dc] bg-[#fcfaf7] px-3 py-3 text-sm text-[#2d3e42] transition hover:border-[#d5c7b5] hover:bg-[#f7f2ec]">
            <input type="checkbox" checked={values[key]} onChange={(event) => onChange(key, event.target.checked)} disabled={disabled} className="h-4 w-4 rounded border-[#b8b0a4] accent-[#1b2d32]" />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </section>
  );
}

function MediaPicker({ kind, files, inputRef, accept, onChange, onRemove, disabled }: { kind: "image" | "video"; files: SelectedFile[]; inputRef: React.RefObject<HTMLInputElement | null>; accept: string; onChange: (event: ChangeEvent<HTMLInputElement>) => void; onRemove: (index: number) => void; disabled: boolean }) {
  return (
    <div className="mt-6 border-t border-[#eee5dc] pt-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h3 className="text-sm font-semibold text-[#2d3e42]">{kind === "image" ? "Images" : "Videos"}</h3><p className="mt-1 text-xs text-[#7a6d62]">{files.length} selected</p></div>
        <button type="button" onClick={() => inputRef.current?.click()} disabled={disabled} className="rounded-full border border-[#d7cab8] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#1a2b2f] transition hover:bg-[#f7f2ec] disabled:cursor-not-allowed disabled:opacity-50">Choose {kind}s</button>
      </div>
      <input ref={inputRef} type="file" accept={accept} multiple onChange={onChange} className="sr-only" />
      {files.length ? <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{files.map((item, index) => <li key={`${item.file.name}-${index}`} className="flex items-center gap-3 rounded-xl border border-[#eee5dc] bg-[#fcfaf7] p-2.5">{item.previewUrl ? <Image src={item.previewUrl} alt="" width={56} height={56} unoptimized className="h-14 w-14 rounded-lg object-cover" /> : <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#e9e1d8] text-xs font-semibold uppercase text-[#5e6b6e]">Video</span>}<span className="min-w-0 flex-1 truncate text-xs text-[#394b4f]">{item.file.name}</span><button type="button" onClick={() => onRemove(index)} disabled={disabled} aria-label={`Remove ${item.file.name}`} className="rounded-full px-2 py-1 text-lg leading-none text-[#7a3931] hover:bg-[#fbf1ef]">×</button></li>)}</ul> : null}
    </div>
  );
}
