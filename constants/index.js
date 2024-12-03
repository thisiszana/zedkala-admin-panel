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
import { FiArrowDown } from "react-icons/fi";
import { BsLuggage } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";
import { RxSize } from "react-icons/rx";

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
