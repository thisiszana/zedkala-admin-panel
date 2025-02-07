export default function RadioList({ form, setForm }) {
    const { gender } = form;
  
    const changeHandler = (e) => {
      const { name, value } = e.target;
  
      setForm({ ...form, [name]: value });
    };
    return (
      <div className="flex flex-col gap-1 bg-lightGray dark:bg-dark1 border-1 rounded-xl p-3">
        <p className="font-light text-[12px] mb-[5px] dark:text-lightGray">جنسیت</p>
        <div className="flex items-center">
          <div className="flex items-center justify-evenly bg-white dark:bg-lightGray  dark:border-red shadow text-black ml-[30px] w-[80px] px-[5px] py-[3px] rounded-[5px] pointer-events-auto cardShadow">
            <label htmlFor="female">خانم</label>
            <input
              type="radio"
              name="gender"
              value="خانم"
              id="female"
              checked={gender === "خانم"}
              onChange={changeHandler}
            />
          </div>
          <div className="flex items-center justify-evenly bg-white dark:bg-lightGray  dark:border-white shadow text-black ml-[30px] w-[80px] px-[5px] py-[3px] rounded-[5px] pointer-events-auto cardShadow">
            <label htmlFor="man">آقا</label>
            <input
              type="radio"
              name="gender"
              value="آقا"
              id="man"
              checked={gender === "آقا"}
              onChange={changeHandler}
            />
          </div>
          <div className="flex items-center justify-evenly bg-white dark:bg-lightGray  dark:border-white shadow text-black ml-[30px] w-[80px] px-[5px] py-[3px] rounded-[5px] pointer-events-auto cardShadow">
            <label htmlFor="etc">سایر</label>
            <input
              type="radio"
              name="gender"
              value="سایر"
              id="etc"
              checked={gender === "سایر"}
              onChange={changeHandler}
            />
          </div>
        </div>
      </div>
    );
  }
  