import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import english from "../assets/images/english.png";
import secound from "../assets/images/2.png";
import third from "../assets/images/3.png";
import fro from "../assets/images/4.png";
import five from "../assets/images/5.png";

const language = [
  {
    Title: "English",
    imgurl: english,
  },
  {
    Title: "한국어",
    imgurl: secound,
  },
  {
    Title: "日本語",
    imgurl: third,
  },
  {
    Title: "Tiếng Việt",
    imgurl: fro,
  },
  {
    Title: "Español",
    imgurl: five,
  },
];

function LanguageDropDown() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="border border-charade rounded-[5px] w-fit h-fit ">
        <Menu
          as="div"
          className="relative inline-block text-left w-40  bg-shark"
        >
          <div>
            <Menu.Button className="inline-flex w-full  rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none">
              <div className="flex items-center" onClick={() => setOpen(!open)}>
                <div className="flex items-center gap-2">
                  <img src={english} alt="english" className="w-6" />
                  <span className="text-sm"> English</span>
                </div>
                {open ? (
                  <ChevronUpIcon
                    className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                    aria-hidden="true"
                  />
                ) : (
                  <ChevronDownIcon
                    className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                    aria-hidden="true"
                  />
                )}
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 border  border-charade rounded-[5px] w-40 origin-top-right divide-y bg-shark divide-gray-100  text-white  focus:outline-none">
              <div className="">
                {language.map((val, id) => {
                  return (
                    <>
                      <Menu.Item key={id}>
                        {({ active }) => (
                          <div
                            className={`${
                              active ? " bg-[#41415B] text-white" : "text-white"
                            } flex items-center gap-2 px-4`}
                          >
                            <img src={val.imgurl} alt="" className="w-6" />
                            <button
                              className={`${
                                active ? " text-white" : "text-white"
                              } group flex w-full  rounded-md px-2 py-2 text-sm`}
                            >
                              {val.Title}
                            </button>
                          </div>
                        )}
                      </Menu.Item>
                    </>
                  );
                })}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
}

export default LanguageDropDown;
