import { Datepicker } from "flowbite-react";
import React from "react";
import Footer from "../Footer";

const PaymentModal = ({ originalPrice }) => {
  const taxPrice = 0.1 * originalPrice;
  return (
    <div className="">
      <section className="bg-white py-8 antialiased  md:py-16 lg:pb-20">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-xl font-semibold sm:text-2xl">Payment</h2>

            <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
              <form
                action="#"
                className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm  sm:p-6 lg:max-w-xl lg:p-8"
              >
                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="mb-2 block text-sm font-medium text-gray-900 ">
                      {" "}
                      Full name (as displayed on card)*{" "}
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                      placeholder="Bonnie Green"
                      required
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="mb-2 block text-sm font-medium text-gray-900 ">
                      {" "}
                      Card number*{" "}
                    </label>
                    <input
                      type="text"
                      id="card-number-input"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500  "
                      placeholder="xxxx-xxxx-xxxx-xxxx"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900 ">
                      Card expiration*{" "}
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                        <svg
                          className="h-4 w-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
                        </svg>
                      </div>
                      <Datepicker />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 ">
                      CVV*
                    </label>
                    <input
                      type="number"
                      id="cvv-input"
                      aria-describedby="helper-text-explanation"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                      placeholder="•••"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 "
                >
                  Pay now
                </button>
              </form>

              <div className="mt-6 grow sm:mt-8 lg:mt-0">
                <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 ">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 ">
                        Original price
                      </dt>
                      <dd className="text-base font-medium text-gray-900 ">
                        {originalPrice}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 ">
                        Tax
                      </dt>
                      <dd className="text-base font-medium text-gray-900 ">
                        {taxPrice}
                      </dd>
                    </dl>
                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
                    <dt className="text-base font-bold text-gray-900 ">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 ">
                      {originalPrice + taxPrice}
                    </dd>
                  </dl>
                </div>

                <div className="mt-6 flex items-center justify-center gap-8">
                  <img
                    className="h-8 w-auto dark:hidden"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg"
                    alt=""
                  />
                  <img
                    className="hidden h-8 w-auto dark:flex"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg"
                    alt=""
                  />
                  <img
                    className="h-8 w-auto dark:hidden"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
                    alt=""
                  />
                  <img
                    className="hidden h-8 w-auto dark:flex"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
                    alt=""
                  />
                  <img
                    className="h-8 w-auto dark:hidden"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"
                    alt=""
                  />
                  <img
                    className="hidden h-8 w-auto dark:flex"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-gray-500  sm:mt-8 lg:text-left">
              Payment processed by{" "}
              <a
                href="#"
                title=""
                className="font-medium text-primary-700 underline hover:no-underline "
              >
                Paddle
              </a>{" "}
              for{" "}
              <a
                href="#"
                title=""
                className="font-medium text-primary-700 underline hover:no-underline "
              >
                Flowbite LLC
              </a>
              - United States Of America
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentModal;
