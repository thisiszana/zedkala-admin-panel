import { Switch } from "antd";

export default function CustomSwitch({ id, label, checked, onChange, name }) {
  return (
    <div className="flex items-center gap-2">
      <Switch id={id} checked={checked} name={name} onChange={onChange} />
      <label htmlFor={id} className="text-p1">
        {label}
      </label>
    </div>
  );
}
