import Image from "next/image";

import moment from "moment-jalaali";

import { getServerSession } from "@/utils/session";
import { images } from "@/constants";

export default function AvatarSection({ admin }) {
  const session = getServerSession();

  return (
    <div className="box flex flex-col items-center gap-5 w-full xl:w-[40%] h-fit">
      <div>
        <Image
          src={admin.currentAdmin?.images || images.admin}
          width={300}
          height={300}
          alt={admin.currentAdmin?.username}
          className="w-[150px] h-[150px] object-cover rounded-full"
          radius="full"
          isBlurred
        />
      </div>
      <p className="text-p2 text-darkGray">
        عضویت در :{" "}
        {moment(admin.currentAdmin.createdAt).format("jYYYY/jMM/jDD")}
      </p>
      <span className="bg-lightBlue text-darkBlue rounded-btn py-1 px-3 text-p2">
        {session.roll}
      </span>
    </div>
  );
}
