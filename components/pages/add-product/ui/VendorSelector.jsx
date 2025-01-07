"use client";

import { useState, useEffect } from "react";

import CustomSelect from "@/components/shared/form/CustomSelect";
import { getVendors } from "@/actions/vendor.action";
import Loader from "@/components/shared/Loader";

export default function VendorSelector({ form, setForm }) {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true);
      try {
        const data = await getVendors();
        setVendors(JSON.parse(JSON.stringify(data.vendors)));
      } catch (error) {
        console.error("خطا در گرفتن فروشنده‌ها:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  const handleChange = (value) => {
    setForm((prev) => ({
      ...prev,
      vendor: { storeName: value },
    }));
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader h={20} w={20} />
        </div>
      ) : (
        <CustomSelect
          label="انتخاب فروشنده"
          value={form.vendor?.storeName || ""}
          options={vendors?.map((vendor) => ({
            value: vendor.storeInfo.storeName,
            label: `${vendor.storeInfo.storeName} - ${vendor.username}`,
          }))}
          onChange={handleChange}
        />
      )}
    </div>
  );
}
