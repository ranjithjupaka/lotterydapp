import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import win from "../assets/images/win.png"
import cong from "../assets/images/cong.png"




function WonModal({ wonopen, wonclose }) {
  return (
    <>
      <Transition appear show={wonopen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={wonclose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-rhino p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg pt-5 font-medium leading-6 "
                  >
                    <img src={cong} alt="" />
                  </Dialog.Title>
                  <div className="mt-10 flex justify-center">
                    <img src={win} alt="" className="w-[300px]" />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
export default WonModal;
