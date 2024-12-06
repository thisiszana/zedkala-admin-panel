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

export const uploadCompressedFile = async (file) => {
  console.log("Uploading compressed file:", file);
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

  console.log("Cloud Name:", cloudName);
  console.log("Upload Preset:", uploadPreset);

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`;
  const formData = new FormData();

  formData.append("file", file); 
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
    return { fileUrl: data.secure_url };
  } catch (error) {
    console.error("Error uploading compressed file:", error);
    return { fileUrl: null };
  }
};

export const uploadImages = async (images) => {
  const uploadedImages = await Promise.all(
    images?.map(async (image) => {
      const uploadRes = await uploadImage(image);
      return uploadRes.imageUrl;
    })
  );
  return uploadedImages;
};

export const shorterText = (text, maxCharacter) => {
  const t = String(text);
  if (t.length > maxCharacter) {
    return `${t.substring(0, maxCharacter)}...`;
  } else {
    return text;
  }
};

export const e2p = (s) => s?.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

export const p2e = (s) =>
  s.toString().replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

export const sp = (number) => {
  const seperatedNumber = number
    .toString()
    .match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
  const joinedNumber = seperatedNumber.join(",");
  return e2p(joinedNumber);
};

export const sanitizeData = (data) => {
  if (Array.isArray(data)) {
    return data.map(sanitizeData);
  } else if (data && typeof data === "object" && data.constructor === Object) {
    const sanitizedObject = {};
    for (const key in data) {
      if (key === "_id" && data[key] && data[key].toString) {
        sanitizedObject[key] = data[key].toString();
      } else {
        sanitizedObject[key] = sanitizeData(data[key]);
      }
    }
    return sanitizedObject;
  }
  return data;
};

export const reducePrice = (discount, price) => {
  const discountValue = (price * discount) / 100;
  const finalValue = price - discountValue;
  return finalValue;
};
