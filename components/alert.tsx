import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  MinusCircleIcon,
  XIcon,
} from "@heroicons/react/outline";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { Fragment } from "react";
type AlertProps = {
  show: boolean;
  message: string;
  alertMessage: string;
  action: () => void;
  state?: "success" | "warning" | "error";
  onClose?: () => void;
};
const Alert = ({ show, message, alertMessage, action, state }: AlertProps) => {
  return (
    <div
      aria-live="assertive"
      className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-50"
    >
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
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
          <div className="max-w-sm w-full bg-white dark:bg-neutral-800 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {state === "success" && (
                    <CheckCircleIcon
                      className="h-6 w-6 text-green-400"
                      aria-hidden="true"
                    />
                  )}
                  {state === "warning" && (
                    <ExclamationCircleIcon
                      className="h-6 w-6 text-orange-400"
                      aria-hidden="true"
                    />
                  )}
                  {state === "error" && (
                    <MinusCircleIcon
                      className="h-6 w-6 text-red-400"
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
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    className="bg-white dark:bg-neutral-800 rounded-md inline-flex dark:text-gray-50 dark:hover:text-gray-100 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={action}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
};
export default Alert;
