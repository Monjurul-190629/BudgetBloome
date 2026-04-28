// Capitalize function
export const Capitalize = (text: string) => {
  if (!text) {
    return "";
  }
  return text
    ?.toLowerCase()
    ?.split(/[_\s-]+/)
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    ?.join(" ");
};

// uploadToCloudinary function
export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_UPLOAD_PRESET_NAME || "buget_bloome_upload"
  );

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  return data.secure_url;
};