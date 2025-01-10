"use client";

import { useState } from "react";

import CustomTextarea from "@/components/shared/form/CustomTextarea";
import CustomInp from "@/components/shared/form/CustomInp";
import CustomBtn from "@/components/shared/CustomBtn";
import { Edit, Trash } from "@/components/icons/Icons";

export default function DeliveryDetails({ form, setForm }) {
  const [newDay, setNewDay] = useState("");
  const [timeSlots, setTimeSlots] = useState({});
  const [editDay, setEditDay] = useState(false);
  const [newTimeSlot, setNewTimeSlot] = useState({
    startTime: "",
    endTime: "",
  });

  const handleAddDay = () => {
    if (!newDay.trim()) return;

    if (editDay !== false) {
      setForm((prev) => {
        const updatedDeliveryTime = [
          ...(prev.deliveryOptions.estimatedDeliveryTime || []),
        ];
        updatedDeliveryTime[editDay] = {
          ...updatedDeliveryTime[editDay],
          day: newDay,
        };

        return {
          ...prev,
          deliveryOptions: {
            ...prev.deliveryOptions,
            estimatedDeliveryTime: updatedDeliveryTime,
          },
        };
      });
      setEditDay(false);
    } else {
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
    }

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

  const handleEditDay = (day, index) => {
    setNewDay(day);
    setEditDay(index);
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
            className="text-sm font-medium mr-3 text-[12px] md:text-[14px]"
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
            className="text-sm font-medium mr-3 text-[12px] md:text-[14px]"
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
            className="text-sm font-medium mr-3 text-[12px] md:text-[14px]"
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
            title={editDay !== false ? "ویرایش" : "افزودن"}
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
                  icon={<Edit size={16} />}
                  onClick={() => handleEditDay(day.day, index)}
                  classNames="text-[20px] text-red-500"
                />
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

              <div className="mt-2 flex gap-2 flex-col md:flex-row items-center">
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
