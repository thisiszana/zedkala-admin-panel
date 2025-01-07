"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import toast from "react-hot-toast";

import ExpertReview from "@/components/pages/add-product/ui/ExpertReview";
import { createProduct, editProduct } from "@/actions/product.action";
import CategoryTreeSelection from "./CategoryTreeSelection";
import KeywordsSelection from "./KeywordsSelection";
import CustomDataPicker from "./CustomDataPicker";
import CustomTextarea from "./CustomTextarea";
import Specifications from "./Specifications";
import UploadedImage from "./UploadedImage";
import { MESSAGES } from "@/utils/message";
import CustomSwitch from "./CustomSwitch";
import { uploadImages } from "@/utils/fun";
import DetailedBox from "../DetailedBox";
import CustomBtn from "../CustomBtn";
import CustomInp from "./CustomInp";
import { Trash } from "@/components/icons/Icons";
import { tabsAddProduct } from "@/constants";

export default function ProductForm({
  type,
  form,
  setForm,
  onChange,
  editImage,
  id,
}) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    if (selectedTab < tabsAddProduct.length - 1) setSelectedTab(selectedTab + 1);
  };

  const handleBack = () => {
    if (selectedTab > 0) setSelectedTab(selectedTab - 1);
  };

  const handleSubmit = async () => {
    if (
      !form.title ||
      !form.price ||
      !form.stock ||
      !form.categoryName ||
      !form.subCategories ||
      !form.brand ||
      form.keywords.length === 0
    ) {
      return toast.error(MESSAGES.fields);
    }

    setLoading(true);

    const uploadedImages = await uploadImages(form.images);

    const payload = {
      ...form,
      images: uploadedImages,
    };

    let res;
    if (type === "CREATE") {
      res = await createProduct(JSON.parse(JSON.stringify(payload)));
    } else {
      res = await editProduct({ ...payload, id });
    }

    setLoading(false);

    if (res.code === 200 || res.code === 201 || res.code === 202) {
      toast.success(res.message);
      router.push("/products");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="w-full p-4 space-y-4">
      <div className="flex flex-wrap gap-3 pb-3 items-center overflow-x-auto border-b w-fit">
        {tabsAddProduct.map((tab, index) => (
          <CustomBtn
            key={tab.key}
            title={tab.title}
            classNames={`px-2 py-1 rounded-btn text-[12px] ${
              selectedTab === index
                ? "bg-dark1 text-white dark:bg-dark2 "
                : "bg-gray-200 dark:text-dark1"
            }`}
            onClick={() => setSelectedTab(index)}
          />
        ))}
      </div>

      {selectedTab === 0 && (
        <div className="space-y-8">
          <DetailedBox
            title="جزئیات اولیه"
            subtitle="عنوان، توضیحات، تصویر"
            content={
              <BasicDetails
                form={form}
                setForm={setForm}
                onChange={onChange}
                editImage={editImage}
              />
            }
          />
          <DetailedBox
            title="معرفی"
            subtitle="معرفی محصول"
            content={<IntroductionDetails form={form} onChange={onChange} />}
          />
        </div>
      )}
      {selectedTab === 1 && (
        <DetailedBox
          title="دسته‌بندی"
          subtitle="دسته‌بندی"
          content={<CategoryTreeSelection form={form} setForm={setForm} />}
        />
      )}
      {selectedTab === 2 && (
        <DetailedBox
          title="ویژگی‌ها"
          subtitle="قیمت، موجودی، تخفیف، ..."
          content={
            <Properties form={form} setForm={setForm} onChange={onChange} />
          }
        />
      )}
      {selectedTab === 3 && (
        <div className="space-y-8">
          <DetailedBox
            title="مشخصات"
            subtitle="مشخصات را اضافه یا حذف کنید"
            content={<Specifications form={form} setForm={setForm} />}
          />
          <DetailedBox
            title="بررسی"
            subtitle="بررسی تخصصی محصول"
            content={<ExpertReview form={form} setForm={setForm} />}
          />
        </div>
      )}
      {selectedTab === 4 && (
        <DetailedBox
          title="بیمه"
          subtitle="جزئیات بیمه محصول"
          content={
            <InsuranceDetails
              form={form}
              setForm={setForm}
              onChange={onChange}
            />
          }
        />
      )}
      {selectedTab === 5 && (
        <DetailedBox
          title="تنضیمات تحویل"
          subtitle="تنضیمات تحویل سریع و رایگان"
          content={<DeliveryDetails form={form} setForm={setForm} />}
        />
      )}
      {selectedTab === 6 && (
        <DetailedBox
          title="گارانتی"
          subtitle="گارانتی، کلمات کلیدی و سیاست بازگشت کالا"
          content={
            <Warranty
              form={form}
              type={type}
              setForm={setForm}
              loading={loading}
              onChange={onChange}
              handleSubmit={handleSubmit}
            />
          }
        />
      )}

      <div className="flex justify-between mt-4">
        <CustomBtn
          title="برگشت"
          classNames="px-4 py-2 bg-dark1 dark:bg-lightGray text-white dark:text-dark1 rounded-btn text-[12px] h-fit"
          onClick={handleBack}
          disabled={selectedTab === 0}
        />
        {selectedTab < tabsAddProduct.length - 1 ? (
          <CustomBtn
            title="ادامه"
            classNames="px-4 py-2 bg-dark1 dark:bg-lightGray text-white dark:text-dark1 rounded-btn text-[12px] h-fit"
            onClick={handleNext}
          />
        ) : (
          <div className="flex flex-col-reverse md:flex-row items-end md:items-center justify-end gap-10 w-full rounded-[8px]">
            <div className="flex items-center gap-2">
              <CustomSwitch
                id="publish"
                label="منتشر شود؟"
                checked={form.published}
                onChange={(checked) => {
                  setForm((prevForm) => ({
                    ...prevForm,
                    published: checked,
                  }));
                }}
                name="published"
              />
            </div>
            <CustomBtn
              classNames={`${
                loading ? "bg-lightGray" : "bg-dark1 text-white"
              } flex items-center justify-center w-[100px] py-2 text-[12px] md:w-[150px] dark:bg-lightGray dark:text-dark1 h-fit rounded-btn text-[12px] md:text-[14px] font-bold`}
              type="button"
              disabled={loading}
              isLoading={loading}
              onClick={handleSubmit}
              title={type === "CREATE" ? "ایجاد محصول" : "ویرایش محصول"}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function BasicDetails({ form, setForm, onChange, editImage }) {
  return (
    <div className="flex flex-col gap-box w-full h-full">
      <div className="flex flex-wrap gap-box w-full h-full">
        <CustomInp
          type="text"
          name="title"
          label="عنوان *"
          value={form.title}
          onChange={onChange}
          wrapperClassName="flex flex-1 flex-wrap xl:min-w-[400px] min-w-[150px]"
        />
        <CustomInp
          type="text"
          name="brand"
          label="نام تجاری *"
          value={form.brand}
          onChange={onChange}
          wrapperClassName="flex flex-1 flex-wrap xl:min-w-[400px] min-w-[150px]"
        />
      </div>
      <CustomTextarea
        type="text"
        name="description"
        label="توضیحات"
        value={form.description}
        onChange={onChange}
      />
      <UploadedImage form={form} setForm={setForm} editImage={editImage} />
    </div>
  );
}

function IntroductionDetails({ form, onChange }) {
  return (
    <div className="flex flex-col gap-box w-full h-full">
      <CustomInp
        type="text"
        name="title"
        label="عنوان"
        value={form.introduction?.title}
        onChange={onChange}
      />
      <CustomTextarea
        type="text"
        name="description"
        label="توضیحات"
        value={form.introduction?.description}
        onChange={onChange}
      />
    </div>
  );
}

function Properties({ form, setForm, onChange }) {
  return (
    <div className="flex flex-wrap gap-box w-full h-full">
      <CustomInp
        type="number"
        name="price"
        label="قیمت *"
        min={0}
        value={form.price}
        onChange={onChange}
        wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[150px]"
      />
      <CustomInp
        type="number"
        name="stock"
        label="موجودی *"
        min={0}
        value={form.stock}
        onChange={onChange}
        wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[150px]"
      />
      <div className="flex flex-col gap-box w-full h-full">
        <div className="flex flex-wrap gap-box w-full h-full">
          <CustomInp
            type="number"
            name="discountValue"
            label="مقدار‌تخفیف"
            min={0}
            value={form.discount?.value}
            onChange={(e) =>
              setForm({
                ...form,
                discount: { ...form.discount, value: e.target.value },
              })
            }
            wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[150px]"
          />

          <CustomInp
            type="text"
            name="discountTitle"
            label="عنوان‌تخفیف"
            value={form.discount?.title || ""}
            onChange={(e) =>
              setForm({
                ...form,
                discount: { ...form.discount, title: e.target.value },
              })
            }
            wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[150px]"
          />
        </div>
        <CustomDataPicker form={form} setForm={setForm} />
      </div>

      <div className="flex items-center gap-2">
        <CustomSwitch
          id="isGrocery"
          label="کالای سوپرمارکتی است؟"
          checked={form.isGrocery?.value || false}
          onChange={(checked) => {
            setForm({
              ...form,
              isGrocery: {
                ...form.isGrocery,
                value: checked,
              },
            });
          }}
          name="isGrocery"
        />
      </div>
    </div>
  );
}

function Warranty({ form, setForm, onChange }) {
  return (
    <div className="flex flex-col gap-box w-full h-full">
      <CustomInp
        type="text"
        name="warranty"
        label="گارانتی"
        value={form.warranty}
        onChange={onChange}
      />
      <CustomTextarea
        name="returnPolicy"
        label="سیاست بازگشت"
        value={form.returnPolicy || ""}
        onChange={onChange}
      />
      <KeywordsSelection form={form} setForm={setForm} />
    </div>
  );
}

function InsuranceDetails({ form, setForm, onChange }) {
  return (
    <div className="flex flex-wrap gap-box w-full h-full">
      <div className="flex flex-wrap gap-box">
        <CustomInp
          type="text"
          wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[150px]"
          name="insuranceType"
          label="نوع بیمه"
          value={form.insurance?.insuranceType || ""}
          onChange={(e) =>
            setForm({
              ...form,
              insurance: { ...form.insurance, insuranceType: e.target.value },
            })
          }
        />
        <CustomInp
          type="number"
          wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[150px]"
          name="insuranceDuration"
          label="مدت بیمه (ماه)"
          value={form.insurance?.insuranceDuration}
          onChange={(e) =>
            setForm({
              ...form,
              insurance: {
                ...form.insurance,
                insuranceDuration: e.target.value,
              },
            })
          }
        />
        <CustomInp
          type="number"
          wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[150px]"
          name="insuranceCost"
          label="هزینه بیمه"
          value={form.insurance?.insuranceCost}
          onChange={(e) =>
            setForm({
              ...form,
              insurance: { ...form.insurance, insuranceCost: e.target.value },
            })
          }
        />
      </div>
      <CustomTextarea
        name="insuranceTerms"
        wrapperClassName="w-full h-full"
        label="شرایط بیمه"
        value={form.insurance?.insuranceTerms || ""}
        onChange={(e) =>
          setForm({
            ...form,
            insurance: { ...form.insurance, insuranceTerms: e.target.value },
          })
        }
      />
      <div className="flex flex-col gap-box w-full">
        <label className="font-semibold">نوع بیمه:</label>
        <div className="flex gap-4 flex-col-reverse md:flex-row md:items-center">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="insuranceOption"
              checked={form.insurance?.mandatoryInsurance || false}
              onChange={() =>
                setForm({
                  ...form,
                  insurance: {
                    ...form.insurance,
                    mandatoryInsurance: true,
                    optionalInsurance: false,
                  },
                })
              }
            />
            بیمه اجباری
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="insuranceOption"
              checked={form.insurance?.optionalInsurance || false}
              onChange={() =>
                setForm({
                  ...form,
                  insurance: {
                    ...form.insurance,
                    optionalInsurance: true,
                    mandatoryInsurance: false,
                  },
                })
              }
            />
            بیمه اختیاری
          </label>
        </div>
      </div>
    </div>
  );
}

function DeliveryDetails({ form, setForm }) {
  const [newDay, setNewDay] = useState("");
  const [timeSlots, setTimeSlots] = useState({});
  const [newTimeSlot, setNewTimeSlot] = useState({
    startTime: "",
    endTime: "",
  });

  const handleAddDay = () => {
    if (!newDay.trim()) return;
    setForm((prev) => ({
      ...prev,
      deliveryOptions: {
        ...prev.deliveryOptions,
        estimatedDeliveryTime: [
          ...(prev.deliveryOptions?.estimatedDeliveryTime || []),
          { day: newDay, timeSlots: [] },
        ],
      },
    }));
    setNewDay("");
  };

  const handleAddTimeSlot = (day) => {
    if (!newTimeSlot.startTime || !newTimeSlot.endTime) return;
    setForm((prev) => ({
      ...prev,
      deliveryOptions: {
        ...prev.deliveryOptions,
        estimatedDeliveryTime: prev.deliveryOptions?.estimatedDeliveryTime.map(
          (item) =>
            item.day === day
              ? {
                  ...item,
                  timeSlots: [...item.timeSlots, newTimeSlot],
                }
              : item
        ),
      },
    }));
    setNewTimeSlot({ startTime: "", endTime: "" });
  };

  const handleRemoveDay = (day) => {
    setForm((prev) => ({
      ...prev,
      deliveryOptions: {
        ...prev.deliveryOptions,
        estimatedDeliveryTime:
          prev.deliveryOptions?.estimatedDeliveryTime.filter(
            (item) => item.day !== day
          ),
      },
    }));
  };

  const handleRemoveTimeSlot = (day, idx) => {
    setForm((prev) => ({
      ...prev,
      deliveryOptions: {
        ...prev.deliveryOptions,
        estimatedDeliveryTime: prev.deliveryOptions?.estimatedDeliveryTime.map(
          (item) =>
            item.day === day
              ? {
                  ...item,
                  timeSlots: item.timeSlots.filter((_, i) => i !== idx),
                }
              : item
        ),
      },
    }));
  };

  return (
    <div className="flex flex-col gap-8 w-full h-auto p-6">
      <div className="flex flex-col sm:flex-row sm:gap-8 gap-4 w-full">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="fastDelivery"
            name="fastDelivery"
            checked={form.deliveryOptions?.fastDelivery || false}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                deliveryOptions: {
                  ...prev.deliveryOptions,
                  fastDelivery: e.target.checked,
                },
              }))
            }
            className="h-5 w-5 mr-2 accent-blue-500"
          />
          <label
            htmlFor="fastDelivery"
            className="text-sm font-medium text-gray-700 mr-3 text-[12px] md:text-[14px]"
          >
            تحویل سریع
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="fastDelivery"
            name="fastDelivery"
            checked={form.deliveryOptions?.shippingToday || false}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                deliveryOptions: {
                  ...prev.deliveryOptions,
                  shippingToday: e.target.checked,
                },
              }))
            }
            className="h-5 w-5 mr-2 accent-red-500"
          />
          <label
            htmlFor="fastDelivery"
            className="text-sm font-medium text-gray-700 mr-3 text-[12px] md:text-[14px]"
          >
            تحویل امروز
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="freeDelivery"
            name="freeDelivery"
            checked={form.deliveryOptions?.freeDelivery || false}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                deliveryOptions: {
                  ...prev.deliveryOptions,
                  freeDelivery: e.target.checked,
                },
              }))
            }
            className="h-5 w-5 mr-2 accent-green-500"
          />
          <label
            htmlFor="freeDelivery"
            className="text-sm font-medium text-gray-700 mr-3 text-[12px] md:text-[14px]"
          >
            تحویل رایگان
          </label>
        </div>
      </div>

      <CustomInp
        type="number"
        id="deliveryFee"
        name="deliveryFee"
        label="هزینه ارسال"
        disabled={form.deliveryOptions?.freeDelivery}
        value={form.deliveryOptions?.deliveryFee || ""}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            deliveryOptions: {
              ...prev.deliveryOptions,
              deliveryFee: e.target.value,
            },
          }))
        }
      />

      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <CustomInp
            type="text"
            label="روز"
            value={newDay}
            disabled={form.deliveryOptions?.shippingToday}
            onChange={(e) => setNewDay(e.target.value)}
          />
          <CustomBtn
            title="افزودن"
            onClick={handleAddDay}
            disabled={!newDay.trim() || form.deliveryOptions?.shippingToday}
            classNames="flex items-center justify-center px-4 h-fit py-2 md:w-[50px] w-fit bg-dark1 text-white dark:bg-lightGray dark:text-dark1  rounded-btn text-[12px] "
          />
        </div>
        <div>
          {form.deliveryOptions?.estimatedDeliveryTime?.map((day, index) => (
            <div key={index} className="mb-6 border-b pb-4">
              <div className="flex items-center gap-5">
                <h4 className="text-md font-semibold">{day.day}</h4>
                <CustomBtn
                  icon={<Trash size={16} />}
                  onClick={() => handleRemoveDay(day.day)}
                  classNames="text-[20px] text-red-500"
                />
              </div>

              <div className="ml-4 mt-2">
                {day.timeSlots.map((slot, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 text-sm text-gray-600 mb-3"
                  >
                    <span>
                      {slot.startTime} - {slot.endTime}
                    </span>
                    <CustomBtn
                      icon={<Trash size={16} />}
                      onClick={() => handleRemoveTimeSlot(day.day, idx)}
                      classNames="text-[16px] text-red-400"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-2 flex gap-2 flex-col md:flex-row">
                <CustomInp
                  type="time"
                  value={newTimeSlot.startTime}
                  onChange={(e) =>
                    setNewTimeSlot((prev) => ({
                      ...prev,
                      startTime: e.target.value,
                    }))
                  }
                />
                <CustomInp
                  type="time"
                  value={newTimeSlot.endTime}
                  onChange={(e) =>
                    setNewTimeSlot((prev) => ({
                      ...prev,
                      endTime: e.target.value,
                    }))
                  }
                />
                <CustomBtn
                  title="افزودن"
                  onClick={() => handleAddTimeSlot(day.day)}
                  classNames="flex items-center justify-center px-4 h-fit py-2 w-fit bg-dark1 text-white dark:bg-lightGray dark:text-dark1  rounded-btn text-[12px] "
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <CustomInp
        type="text"
        id="courierService"
        name="courierService"
        label="سرویس پستی"
        value={form.deliveryOptions?.courierService || ""}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            deliveryOptions: {
              ...prev.deliveryOptions,
              courierService: e.target.value,
            },
          }))
        }
      />
      <CustomTextarea
        id="deliveryNotes"
        name="deliveryNotes"
        label=" توضیحات ارسال"
        value={form.deliveryOptions?.deliveryNotes || ""}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            deliveryOptions: {
              ...prev.deliveryOptions,
              deliveryNotes: e.target.value,
            },
          }))
        }
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
