"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const useServerAction = (asyncAction, inpData, afterAction) => {
  const [loading, setLoading] = useState(false);

  const res = async () => {
    setLoading(() => true);

    const res = await asyncAction(inpData);
    setLoading(() => false);

    if (res.code === 200 || res.code === 201 || res.code === 202) {
      toast.success(res.message);
      afterAction && afterAction();
    } else {
      toast.error(res.message);
    }
  };

  return { loading, res };
};

export default useServerAction;
