import { Switch } from "antd";

export default function CustomSwitch({ id, label, checked, onChange, name }) {
  return (
    <div className="flex items-center gap-2">
      <Switch id={id} checked={checked} name={name} onChange={onChange} />
      <label htmlFor={id} className="text-[12px] md:text-[14px]">
        {label}
      </label>
    </div>
  );
}
