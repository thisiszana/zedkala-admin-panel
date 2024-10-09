import { ThreeDots } from "react-loader-spinner";

export default function Loader({ h, w, color }) {
  return (
    <ThreeDots
      visible={true}
      height={h || 30}
      width={w || 30}
      color={color || "#000"}
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass="dark:text-white"
    />
  );
}
