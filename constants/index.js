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

import { IoIosColorPalette, IoIosTimer } from "react-icons/io";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FiArrowDown } from "react-icons/fi";
import { BsLuggage } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";
import { RxSize } from "react-icons/rx";
import { MdOutlinePublic, MdSaveAs, MdOutlineReplay } from "react-icons/md";

import { e2p, reducePrice, sp } from "@/utils/fun";

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

export const sortOptions = [
  { value: "createdAt_desc", label: "تاریخ: جدید به قدیم" },
  { value: "createdAt_asc", label: "تاریخ: قدیم به جدید" },
  { value: "likes_desc", label: "لایک: بالا به پایین" },
  { value: "likes_asc", label: "لایک: پایین به بالا" },
];
// Tasks
export const backgroundColorsTasksPage = [
  { bg: "rgb(255, 228, 196)", id: 1 }, // مناسب متن مشکی
  { bg: "rgb(173, 216, 230)", id: 2 }, // مناسب متن مشکی
  { bg: "rgb(144, 238, 144)", id: 3 }, // مناسب متن مشکی
  { bg: "rgb(255, 182, 193)", id: 4 }, // مناسب متن مشکی
  { bg: "rgb(240, 248, 255)", id: 5 }, // مناسب متن مشکی
  { bg: "rgb(245, 245, 220)", id: 6 }, // مناسب متن مشکی
  { bg: "rgb(224, 255, 255)", id: 7 }, // مناسب متن مشکی
  { bg: "rgb(250, 235, 215)", id: 8 }, // مناسب متن مشکی
  { bg: "rgb(211, 211, 211)", id: 9 }, // مناسب متن مشکی
  { bg: "rgb(255, 239, 213)", id: 10 }, // مناسب متن مشکی
];

export const boardMoodOptions = [
  { label: "عمومی", value: "PUBLIC", icon: icons.public, id: 1 },
  { label: "شخصی", value: "PRIVATE", icon: icons.users, id: 2 },
];

export const tagsComment = [
  { label: "اطلاعیه", value: "announcement", color: "#007bff" }, // آبی برای پیام‌های رسمی
  { label: "مهم", value: "important", color: "#dc3545" }, // قرمز برای اهمیت بالا
  { label: "پشتیبانی", value: "support", color: "#28a745" }, // سبز برای کمک و پشتیبانی
  { label: "فوری", value: "urgent", color: "#ffc107" }, // زرد برای هشدارهای فوری
  { label: "پیگیری", value: "follow-up", color: "#17a2b8" }, // آبی کم‌رنگ برای پیگیری‌ها
  { label: "نظر", value: "feedback", color: "#6610f2" }, // بنفش برای بازخورد
  { label: "پیشنهاد", value: "suggestion", color: "#20c997" }, // سبز روشن برای پیشنهادات
  { label: "هشدار", value: "warning", color: "#e83e8c" }, // صورتی پررنگ برای هشدارها
  { label: "عمومی", value: "general", color: "#6c757d" }, // خاکستری برای عمومی
  { label: "شخصی", value: "personal", color: "#fd7e14" }, // نارنجی برای پیام‌های شخصی
];
