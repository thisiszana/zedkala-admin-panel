"use client";

import { useState } from "react";

import CustomSelect from "@/components/shared/form/CustomSelect";
import CustomInp from "@/components/shared/form/CustomInp";
import { weightOption } from "@/constants";

export default function WeightForm({ form, setForm }) {
  const [useRange, setUseRange] = useState(
    form.weight?.range?.min !== undefined ||
      form.weight?.range?.max !== undefined
  );
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      weight: useRange
        ? {
            ...prev.weight,
            range: {
              ...prev.weight.range,
              [field]: value,
            },
          }
        : {
            ...prev.weight,
            [field]: value,
          },
    }));
  };

  const handleUnitChange = (value) => {
    setForm((prev) => ({
      ...prev,
      weight: {
        ...prev.weight,
        unit: value,
      },
    }));
  };

  const validate = () => {
    let errors = {};
    const { weight } = form;

    if (useRange) {
      if (weight.range?.min != null && weight.range?.max != null) {
        if (Number(weight.range.min) > Number(weight.range.max)) {
          errors.range = "حداقل وزن نمی‌تواند بیشتر از حداکثر وزن باشد.";
        }
      }
    } else {
      if (!weight.value || weight.value <= 0) {
        errors.value = "وزن باید مقدار مثبت باشد.";
      }
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      alert("وزن با موفقیت ثبت شد!");
      console.log("وزن:", form.weight);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <label className="font-semibold">استفاده از محدوده وزنی:</label>
        <input
          type="checkbox"
          checked={useRange}
          onChange={(e) => {
            setUseRange(e.target.checked);
            setForm((prev) => ({
              ...prev,
              weight: e.target.checked
                ? {
                    range: { min: 0, max: 0 },
                    unit: prev.weight?.unit || "kg",
                  }
                : { value: 0, unit: prev.weight?.unit || "kg" },
            }));
          }}
        />
      </div>

      {useRange ? (
        <div className="flex gap-4">
          <CustomInp
            type="number"
            name="weight-min"
            value={form.weight?.range?.min || 0}
            label="حداقل وزن"
            onChange={(e) => handleChange("min",  Number(e.target.value))}
            error={errors.range}
          />
          <CustomInp
            type="number"
            name="weight-max"
            value={form.weight?.range?.max || 0}
            label="حداکثر وزن"
            onChange={(e) => handleChange("max",  Number(e.target.value))}
            error={errors.range}
          />
        </div>
      ) : (
        <CustomInp
          type="number"
          name="weight-value"
          value={form.weight?.value || 0}
          label="وزن"
          onChange={(e) => handleChange("value", Number(e.target.value))}
          error={errors.value}
        />
      )}

      <CustomSelect
        label="واحد وزن"
        value={form.weight?.unit || "kg"}
        options={weightOption}
        onChange={handleUnitChange}
      />
      {errors.range && <p className="text-red-500">{errors.range}</p>}
      {errors.value && <p className="text-red-500">{errors.value}</p>}
    </div>
  );
}
