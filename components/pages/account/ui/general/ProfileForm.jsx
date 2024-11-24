"use client"

import { useEffect, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import UploadedImage from "@/components/shared/form/UploadedImage";
import CustomInp from "@/components/shared/form/CustomInp";
import RadioList from "@/components/shared/form/RadioList";
import { LockClosed } from "@/components/icons/Icons";
import CustomBtn from "@/components/shared/CustomBtn";
import { MESSAGES } from "@/utils/message";
import { uploadImage } from "@/utils/fun";

export default function ProfileForm(props) {
  const {
    username,
    firstName,
    gender,
    lastName,
    image,
    email,
    phoneNumber,
    address,
    country,
  } = props.currentAdmin;

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: username || "",
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phoneNumber: "",
    address: "",
    country: "",
    image: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    setForm({
      username: username || "",
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      phoneNumber: phoneNumber || "",
      address: address || "",
      country: country || "",
      gender: gender || "",
    });
  }, []);

  const queryClient = useQueryClient();

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (form.username.length === 0)
      return toast.error(MESSAGES.userShouldNotEmpty);

    if (
      (form.currentPassword && form.currentPassword.length !== 0) ||
      (form.newPassword && form.newPassword.length !== 0) ||
      (form.confirmNewPassword && form.confirmNewPassword.length !== 0)
    ) {
      if (
        !form.currentPassword ||
        !form.newPassword ||
        !form.confirmNewPassword ||
        form.currentPassword.length === 0 ||
        form.newPassword.length === 0 ||
        form.confirmNewPassword.length === 0
      ) {
        toast.error(MESSAGES.fillInp);
        return;
      }
    }

    if (form.newPassword !== form.confirmNewPassword)
      toast.error(MESSAGES.confirmPassword);

    setLoading(true);

    let newForm = { ...form };

    if (form.image && form.image?.length !== 0) {
      const uploadResult = await uploadImage(form.image[0]);
      newForm = {
        ...form,
        image: uploadResult.imageUrl,
      };
    }

    const result = await updateProfile(newForm);

    setLoading(false);

    if (result.code === 200 || result.code === 201 || result.code === 202) {
      toast.success(result.message);
      queryClient.invalidateQueries("session");
    } else {
      toast.error(result.message);
    }
  };
  return (
    <form className="box w-full h-fit flex flex-col gap-5" onSubmit={onSubmit}>
      <div className="w-full h-fit flex flex-wrap gap-5">
        <CustomInp
          type="text"
          label="آیدی"
          name="username"
          value={form.username}
          onChange={onChange}
          wrapperClassName="w-full flex flex-1 min-w-[280px] h-fit"
        />
        <CustomInp
          type="text"
          label="نام"
          name="firstName"
          value={form.firstName}
          onChange={onChange}
          wrapperClassName="w-full flex flex-1 min-w-[280px] h-fit"
        />
        <CustomInp
          type="text"
          label="نام خانوادگی"
          name="lastName"
          value={form.lastName}
          onChange={onChange}
          wrapperClassName="w-full flex flex-1 min-w-[280px] h-fit"
        />
        <CustomInp
          type="email"
          label="ایمیل"
          name="email"
          value={form.email}
          onChange={onChange}
          wrapperClassName="w-full flex flex-1 min-w-[280px] h-fit"
        />
        <CustomInp
          type="text"
          label="شماره تماس"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={onChange}
          wrapperClassName="w-full flex flex-1 min-w-[280px] h-fit"
        />
        <CustomInp
          type="text"
          label="کشور"
          name="country"
          value={form.country}
          onChange={onChange}
          wrapperClassName="w-full flex flex-1 min-w-[280px] h-fit"
        />
        <CustomInp
          type="text"
          label="آدرس"
          name="address"
          value={form.address}
          onChange={onChange}
          wrapperClassName="w-full flex flex-1 min-w-[280px] h-fit"
        />
      </div>
      <RadioList form={form} setForm={setForm} />
      <UploadedImage form={form} setForm={setForm} editImage={image} />
      <div className="flex items-center gap-4">
        <LockClosed wrapperClassName="cardShadow rounded-lg p-3 dark:bg-lightGray" />
        <p className="text-p1 font-medium dark:text-white">تغییر رمز عبور</p>
      </div>
      <CustomInp
        type="password"
        label="رمز عبور فعلی"
        name="currentPassword"
        value={form.currentPassword}
        onChange={onChange}
        wrapperClassName="w-full flex flex-1 min-w-[280px] h-fit"
      />
      <CustomInp
        type="password"
        label="رمز عبور جدید"
        name="newPassword"
        value={form.newPassword}
        onChange={onChange}
        wrapperClassName="w-full flex flex-1 min-w-[280px] h-fit"
      />
      <CustomInp
        type="password"
        label="تایید رمز عبور"
        name="confirmNewPassword"
        value={form.confirmNewPassword}
        onChange={onChange}
        wrapperClassName="w-full flex flex-1 min-w-[280px] h-fit"
      />
      <div className="w-full flex justify-end">
        <CustomBtn
          title="تایید تغیرات"
          type="submit"
          classNames={`${
            loading ? "bg-lightGray" : "bg-dark1 text-white"
          } flex items-center justify-center w-[150px] dark:bg-lightGray dark:text-dark1 h-[50px] rounded-btn text-p1 font-bold`}
          isLoading={loading}
        />
      </div>
    </form>
  )
}
