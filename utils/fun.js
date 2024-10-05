import { compare, hash } from "bcryptjs";

export const hashedPassword = async (Password) => await hash(Password, 12);

export const verifyPassword = async (Password, hashedPassword) =>
  await compare(Password, hashedPassword);

export const uploadImage = async (path) => {
  console.log("Uploading image:", path);
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

  console.log("Cloud Name:", cloudName);
  console.log("Upload Preset:", uploadPreset);

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const formData = new FormData();

  formData.append("file", path);
  formData.append("upload_preset", uploadPreset);

  try {
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Network response was not ok" + res.statusText);
    }

    const data = await res.json();
    return { imageUrl: data.secure_url };
  } catch (error) {
    console.error("Error uploading image:", error);
    return {
      imageUrl: null,
    };
  }
};
