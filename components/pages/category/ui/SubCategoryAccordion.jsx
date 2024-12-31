"use client";

import { shorterText } from "@/utils/fun";
import { Disclosure } from "@headlessui/react";
import { Image } from "@nextui-org/react";
import { Tooltip } from "antd";
import NextImage from "next/image";
import { FiArrowDown } from "react-icons/fi";

export default function SubCategoryAccordion({ categories }) {
  return (
    <div className="w-full max-w-md p-2 mx-auto bg-white border rounded-2xl h-full">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75 transition-all duration-200">
              <span>{categories.name}</span>
              <FiArrowDown
                className={`transform transition-transform duration-300 ${
                  open ? "rotate-180" : ""
                } w-5 h-5 text-blue-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel
              className={`px-4 pt-4 pb-2 text-sm text-gray-500 overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                open ? "max-h-screen overflow-y-scroll opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="space-y-2">
                {categories.subcategories.map((subcat, subIndex) => (
                  <Disclosure key={subIndex} as="div">
                    {({ open: subOpen }) => (
                      <>
                        <Disclosure.Button className="flex justify-between w-full px-3 py-2 text-sm font-medium text-left text-blue-800 bg-blue-50 rounded-lg hover:bg-blue-100 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75 mb-1 transition-all duration-200">
                          <span>{subcat.name}</span>
                          <FiArrowDown
                            className={`transform transition-transform duration-300 ${
                              subOpen ? "rotate-180" : ""
                            } w-4 h-4 text-blue-400`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel
                          className={`pl-6 pt-4 pb-4 bg-blue-50 rounded-lg shadow-md overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                            subOpen
                              ? "max-h-screen opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="flex flex-wrap justify-center items-center gap-4">
                            {subcat.items.map((item, itemIndex) => (
                              <Tooltip title={item.name} placement="right">
                                <div
                                  key={itemIndex}
                                  className="flex items-center justify-between w-[150px] gap-2 bg-white p-2 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all"
                                >
                                  <span className="text-gray-800 text-sm font-medium">
                                    {shorterText(item.name, 10)}
                                  </span>

                                  {item.image && (
                                    <Image
                                      as={NextImage}
                                      src={item.image}
                                      width={40}
                                      height={40}
                                      alt={item.name}
                                      className="rounded-full border border-gray-300"
                                    />
                                  )}
                                </div>
                              </Tooltip>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
