export default function DetailedBox({ title, subtitle, icon, content }) {
  return (
    <div className="box lg:flex w-full ">
      <div className="w-full lg:w-[500px] max-lg:mb-5 flex gap-2 items-center h-fit">
        {icon && icon}
        <div>
          <h1 className="text-h2 font-black">{title}</h1>
          {subtitle && <p className="text-p2 text-darkGray dark:text-white">{subtitle}</p>}
        </div>
      </div>
      {content}
    </div>
  );
}
