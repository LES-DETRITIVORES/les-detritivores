import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  MinusCircleIcon,
  XIcon,
} from "@heroicons/react/outline";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import { Fragment } from "react";
type AlertProps = {
  show: boolean;
  message: string;
  alertMessage: string;
  action: () => void;
  state?: "success" | "warning" | "info" | "error";
};
const Alert = ({ show, message, alertMessage, action, state }: AlertProps) => {
  return (
    <div
      aria-live="assertive"
      className="fixed inset-0 z-50 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ ease: "easeOut", duration: 0.5 }} // default: 0.15
        suppressHydrationWarning={true}
        className="flex flex-col items-center w-full space-y-4 sm:items-end"
      >
        <Transition
          show={show}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg pointer-events-auto dark:bg-neutral-800 ring-1 ring-black ring-opacity-5">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {state === "success" && (
                    <CheckCircleIcon
                      className="w-6 h-6 text-green-400"
                      aria-hidden="true"
                    />
                  )}
                  {state === "warning" && (
                    <ExclamationCircleIcon
                      className="w-6 h-6 text-orange-400"
                      aria-hidden="true"
                    />
                  )}
                  {state === "info" && (
                    <ExclamationCircleIcon
                      className="w-6 h-6 text-sky-400"
                      aria-hidden="true"
                    />
                  )}
                  {state === "error" && (
                    <MinusCircleIcon
                      className="w-6 h-6 text-red-400"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {alertMessage}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-50">
                    {message}
                  </p>
                </div>
                <div className="flex flex-shrink-0 ml-4">
                  <button
                    className="inline-flex text-gray-400 bg-white rounded-md dark:bg-neutral-800 dark:text-gray-50 dark:hover:text-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={action}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </motion.div>
    </div>
  );
};
export default Alert;
