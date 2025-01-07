import {
  Home,
  AddFolder,
  AddUser,
  Bell,
  BlogText,
  BorderHeart,
  Category,
  CircleCheck,
  CircleClose,
  Clock,
  Close,
  Comment,
  CreditCard,
  Dark,
  Date,
  Document,
  Dollar,
  DollarBag,
  DownAngle,
  Edit,
  ExchangeCrypto,
  EyeClosed,
  EyeOpen,
  Filter,
  Gallery,
  Headphone,
  LayerPlus,
  LeftAngle,
  Light,
  Location,
  LockClosed,
  LockOpen,
  MenuBars,
  MenuDots,
  Paragraph,
  Paypal,
  Power,
  Radar,
  RightAngle,
  Search,
  Settings,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  Task,
  Trash,
  TrendDown,
  TrendUp,
  Truck,
  UpAngle,
  User,
  Users,
  Camera,
  Mail,
  Television,
  Printer,
  Mobile,
  Speaker,
  Laptop,
  Gaming,
  Tablet,
  Watch,
  UploadIcon,
  Discount,
  Stock,
  Brand,
} from "@/components/icons/Icons";

import { BsCloudDownload } from "react-icons/bs";
import { VscPreview } from "react-icons/vsc";
import { IoIosColorPalette, IoIosTimer } from "react-icons/io";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FiArrowDown } from "react-icons/fi";
import { BsLuggage } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";
import { RxSize } from "react-icons/rx";
import {
  MdOutlinePublic,
  MdSaveAs,
  MdOutlineReplay,
  MdAttachFile,
} from "react-icons/md";

import { e2p, reducePrice, sp } from "@/utils/fun";
import Image from "next/image";

export const sizesDefault = ["XS", "S", "M", "L", "XL"];

export const icons = {
  home: <Home />,
  timer: <IoIosTimer />,
  deliveryTruck: <Truck />,
  layerPlus: <LayerPlus />,
  addUser: <AddUser />,
  dollar: <Dollar />,
  basket: <ShoppingBasket />,
  shoppingBag: <ShoppingBag />,
  status: <Radar />,
  cart: <ShoppingCart />,
  plus: <AddFolder />,
  paper: <Comment />,
  users: <Users />,
  public: <MdOutlinePublic />,
  user: <User />,
  textB: <BlogText />,
  tasks: <Task />,
  notification: <Bell />,
  settings: <Settings />,
  power: <Power />,
  search: <Search />,
  close: <Close />,
  moon: <Dark />,
  sun: <Light />,
  trash: <Trash />,
  pen: <Edit />,
  document: <Document />,
  upload: <UploadIcon />,
  heart: <BorderHeart />,
  leftAngle: <LeftAngle />,
  rightAngle: <RightAngle />,
  upAngle: <UpAngle />,
  downAngle: <DownAngle />,
  menu: <MenuBars />,
  dots: <MenuDots />,
  paragraph: <Paragraph />,
  gallery: <Gallery />,
  clock: <Clock />,
  closedLock: <LockClosed />,
  openedLock: <LockOpen />,
  trandUp: <TrendUp />,
  trandDown: <TrendDown />,
  category: <Category />,
  roundCheck: <CircleCheck />,
  roundClose: <CircleClose />,
  filter: <Filter />,
  location: <Location />,
  creditCard: <CreditCard />,
  paypal: <Paypal />,
  dollarBag: <DollarBag />,
  eyeOpen: <EyeOpen />,
  eyeClosed: <EyeClosed />,
  exchangeCrypto: <ExchangeCrypto />,
  headphone: <Headphone />,
  camera: <Camera />,
  watch: <Watch />,
  tablet: <Tablet />,
  mobile: <Mobile />,
  speaker: <Speaker />,
  lapotp: <Laptop />,
  gaming: <Gaming />,
  printer: <Printer />,
  television: <Television />,
  color: <IoIosColorPalette />,
  size: <RxSize />,
  downArrow: <FiArrowDown />,
  imageNotFound: <CiImageOn />,
  chat: <IoChatbubblesOutline />,
  save: <MdSaveAs />,
  replay: <MdOutlineReplay />,
  attachFile: <MdAttachFile />,
  download: <BsCloudDownload />,
  preview: <VscPreview />,
};

export const images = {
  admin: "/images/admin-1.jpg",
  admin2: "/images/admin-2.jpg",
  admin3: "/images/admin-3.jpg",
  imageNotFound: "/images/imagenotfound.jfif",
  itemsNotFound: "/images/itemsNotFound.webp",

  notFound: "/images/404.svg",
  error: "/images/sad.png",
  person: "/images/man.png",
};

export const menuLinks = [
  {
    title: "داشبورد",
    image: icons.home,
    link: "/dashboard",
  },
  // {
  //   title: "سفارشات",
  //   image: icons.deliveryTruck,
  //   link: "/orders",
  // },
  {
    title: "محصولات",
    image: icons.basket,
    link: "/products",
  },
  {
    title: "دسته‌بندی",
    image: icons.basket,
    link: "/categories",
  },
  {
    title: "ایجاد محصول",
    image: icons.layerPlus,
    link: "/add-product",
  },
  {
    title: "ایجاد دسته‌بندی",
    image: icons.layerPlus,
    link: "/add-category",
  },
  {
    title: "ایجاد بنر",
    image: icons.layerPlus,
    link: "/add-banner",
  },
  // {
  //   title: "نظرات",
  //   image: icons.paper,
  //   link: "/comments",
  // },
  {
    title: "کاربران",
    image: icons.users,
    link: "/users",
  },
  // {
  //   title: "وبلاگ‌ها",
  //   image: icons.textB,
  //   link: "/blogs",
  // },
  // {
  //   title: "ایجاد وبلاگ",
  //   image: icons.paragraph,
  //   link: "/add-blog",
  // },
  {
    title: "وظایف",
    image: icons.tasks,
    link: "/tasks",
  },
  {
    title: "حساب",
    image: icons.settings,
    link: "/account",
  },
];

export const profileLinks = [
  {
    icon: <Home />,
    name: "صفحه اصلی",
    href: "/dashboard",
  },
  {
    icon: <User />,
    name: "پروفایل",
    href: "/account",
  },
  {
    icon: <Task />,
    name: "وضایف",
    href: "/tasks",
  },
  {
    icon: <ShoppingBasket />,
    name: "محصولات",
    href: "/products",
  },
  {
    icon: <LayerPlus />,
    name: "محصول جدید",
    href: "/add-product",
  },
];

export const tabsAddProduct = [
  { key: "details", title: "جزئیات اولیه" },
  { key: "categories", title: "دسته‌بندی" },
  { key: "properties", title: "ویژگی" },
  { key: "specifications", title: "مشخصات" },
  { key: "insurance", title: "بیمه" },
  { key: "delivery", title: "تحویل" },
  { key: "warranty", title: "گارانتی" },
];

export const weightOption = [
  { value: "g", label: "گرم (g)" },
  { value: "kg", label: "کیلوگرم (kg)" },
  { value: "mg", label: "میلی‌گرم (mg)" },
  { value: "lb", label: "پوند (lb)" },
  { value: "oz", label: "اونس (oz)" },
  { value: "ton", label: "تن (ton)" },
  { value: "ct", label: "قیراط (ct)" },
  { value: "stone", label: "استون (stone)" },
  { value: "gr", label: "گرین (gr)" },
];

export const notifications = [
  {
    key: "1",
    image: (
      <Image
        src={images.admin}
        width={100}
        height={100}
        alt="image"
        radius="full"
        className="w-[40px]"
      />
    ),
    text: "John Doe sent you a friend request",
    date: "3 hours",
    category: "Communication",
  },
  {
    key: "2",
    image: (
      <Image
        src={images.admin2}
        width={100}
        height={100}
        alt="image"
        radius="full"
        className="w-[40px]"
      />
    ),
    text: "Jayvon Hull has Mentioned you",
    date: "a day",
    category: "Project UI",
  },
  {
    key: "3",
    image: (
      <Image
        src={images.admin3}
        width={100}
        height={100}
        alt="image"
        radius="full"
        className="w-[40px]"
      />
    ),
    text: "Jason desson added new tags to file manager",
    date: "3 day",
    category: "File manager",
  },
  {
    key: "4",
    image: (
      <Truck wrapperClassName="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-lightGreen text-darkGreen" />
    ),
    text: "Your order is placed waiting for shipping",
    date: "5 day",
    category: "Order",
  },
  {
    key: "5",
    image: (
      <Comment wrapperClassName="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-lightOrange text-darkOrange" />
    ),
    text: "You have 5 new unread messages",
    date: "7 day",
    category: "Communication",
  },
  {
    key: "5",
    image: (
      <Mail wrapperClassName="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-lightRose text-darkRose" />
    ),
    text: "You have new mail",
    date: "8 day",
    category: "Communication",
  },
];

export const productInformationDetails = (info) => {
  const hasDiscount = info?.discount && info?.discount?.value > 0;
  return [
    {
      name: !hasDiscount ? "قیمت" : "",
      value: !hasDiscount ? (
        <span style={{ textDecoration: "line-through", color: "gray" }}>
          {sp(info?.price.toLocaleString())} تومان
        </span>
      ) : null,
      icon: !hasDiscount ? (
        <Dollar
          className="text-darkGray"
          wrapperClassName="cardShadow rounded-lg p-3"
        />
      ) : (
        ""
      ),
    },
    {
      name: "موجودی:",
      value: e2p(info?.stock.toLocaleString()),
      icon: (
        <Stock
          className="text-darkGray"
          wrapperClassName="cardShadow rounded-lg p-3"
        />
      ),
    },
    {
      name: "برند:",
      value: info?.brand,
      icon: (
        <Brand
          className="text-darkGray"
          wrapperClassName="cardShadow rounded-lg p-3"
        />
      ),
    },

    ...(hasDiscount
      ? [
          {
            name: "تخفیف:",
            value: `${e2p(info.discount?.value)}% (${info.discount?.title})`,
            icon: (
              <Discount
                className="text-darkGray"
                wrapperClassName="cardShadow rounded-lg p-3"
              />
            ),
          },
        ]
      : []),
  ];
};

export const rollOptions = [
  { label: "کاربر عادی", value: "USER" },
  { label: "فروشنده", value: "VENDOR" },
  { label: "ادمین", value: "ADMIN" },
];

export const tasksStatus = [
  { value: "Todo", label: "انجام دادن" },
  { value: "Progress", label: "در حال انجام" },
  { value: "Preview", label: "بررسی" },
  { value: "Done", label: "انجام شده" },
];

export const sortOptions = [
  { value: "createdAt_desc", label: "تاریخ: جدید به قدیم" },
  { value: "createdAt_asc", label: "تاریخ: قدیم به جدید" },
  { value: "likes_desc", label: "لایک: بالا به پایین" },
  { value: "likes_asc", label: "لایک: پایین به بالا" },
];

// Tasks
export const backgroundColorsTasksPage = [
  { bg: "rgb(255, 223, 186)", id: 1 },
  { bg: "rgb(174, 216, 246)", id: 2 },
  { bg: "rgb(186, 255, 174)", id: 3 },
  { bg: "rgb(255, 204, 212)", id: 4 },
  { bg: "rgb(224, 243, 255)", id: 5 },
  { bg: "rgb(255, 249, 204)", id: 6 },
  { bg: "rgb(200, 255, 255)", id: 7 },
  { bg: "rgb(255, 245, 204)", id: 8 },
  { bg: "rgb(224, 224, 224)", id: 9 },
  { bg: "rgb(255, 223, 186)", id: 10 },
  { bg: "#fd7e14", id: 11 },
  { bg: "#17a2b8", id: 12 },
  { bg: "#ffc107", id: 13 },
];

export const boardMoodOptions = [
  { label: "عمومی", value: "PUBLIC", icon: icons.public, id: 1 },
  { label: "شخصی", value: "PRIVATE", icon: icons.users, id: 2 },
];

export const tagsComment = [
  { label: "اطلاعیه", value: "announcement", color: "#007bff" },
  { label: "مهم", value: "important", color: "#dc3545" },
  { label: "پشتیبانی", value: "support", color: "#28a745" },
  { label: "فوری", value: "urgent", color: "#ffc107" },
  { label: "پیگیری", value: "follow-up", color: "#17a2b8" },
  { label: "نظر", value: "feedback", color: "#6610f2" },
  { label: "پیشنهاد", value: "suggestion", color: "#20c997" },
  { label: "هشدار", value: "warning", color: "#e83e8c" },
  { label: "عمومی", value: "general", color: "#6c757d" },
  { label: "شخصی", value: "personal", color: "#fd7e14" },
];
