import React from "react";
import Nav from "./Nav.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight } from "react-icons/fa6";
import Footer from "../Footer.jsx";
import Connect from "../assets/connect.png";
import Mod from "../assets/mod.png";
export default function Home() {
  return (
    <div>
      <Nav />
      <div>
        <div className="text-center p-10">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl ">
            Uncover Your{" "}
            <span className="text-green-600 ">International Identity</span>
          </h1>
          <p className="text-lg font-normal lg:text-xl m-5 md:m-8 ">
            At UniSphere, we focus on creating a vibrant student community where
            academics, social experiences, and local culture come together to
            inspire growth, foster innovation, and build lifelong connections.
          </p>
          <form className="w-full max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 rtl:inset-x-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4  "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              </div>
              <input
                type="email"
                id="default-email"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500  "
                placeholder="Enter your email here..."
                required
              />
            <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
        <div className="grid grid-cols-3 text-yellow-500 place-items-center p-5 lg:p-10">
          <div>
            <span className="mb-2 text-3xl font-extrabold">200+</span>
            <br></br>
            <span>Countries</span>
          </div>
          <div>
            <span className="mb-2 text-3xl font-extrabold">200+</span>
            <br></br>
            <span>Countries</span>
          </div>
          <div>
            <span className="mb-2 text-3xl font-extrabold">200+</span>
            <br></br>
            <span>Countries</span>
          </div>
        </div>
        <div className="p-10 md:p-15 lg:p-20">
          <div className="grid md:grid-cols-2 place-items-center pb-12 gap-3">
            <div className="text-center md:order-first">
              <span className="text-4xl font-extrabold ">Uncover Features</span>
              <p className="mt-5 text-justify">
                Discover an immersive platform designed for students! Connect
                with classmates, dive into academic modules, attend exciting
                campus events, and explore the best local dining spots.
                UniSphere brings together everything you need for an
                unforgettable university experience—all in one place!
              </p>
            </div>
            <img
              src={Connect}
              className=" w-full md:w-2/3 object-cover order-first"
            />
          </div>

          <div className="grid md:grid-cols-2 place-items-center pb-12 gap-3">
            <img
              src={Mod}
              className="w-full md:w-2/3  object-cover order-first"
            />
            <div className="text-center">
              <span className="text-4xl font-extrabold ">Safe Moderation</span>
              <p className="mt-5 text-justify">
                At UniSphere, we ensure a safe and positive environment for all
                students. Our advanced moderation tools and community guidelines
                help prevent inappropriate content, ensuring that your
                experience is secure, inclusive, and enjoyable. Your safety is
                our top priority!
              </p>
            </div>
          </div>
        </div>
        <section className="bg-white ">
          <div className="max-w-screen-xl px-4 py-6 mx-auto text-center lg:py-16 lg:px-6">
            <figure className="max-w-screen-md mx-auto">
              <svg
                className="h-12 mx-auto mb-3 "
                viewBox="0 0 24 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                  fill="currentColor"
                />
              </svg>
              <blockquote>
                <p className="text-2xl font-medium ">
                  "UniSphere is incredible! It features a wide array of
                  pre-designed components and pages, from user-friendly event
                  listings to interactive social feeds. The perfect solution for
                  enhancing your campus experience and building connections
                  within your student community!"
                </p>
              </blockquote>
              <figcaption className="flex items-center justify-center mt-6 space-x-3">
                <img
                  className="w-6 h-6 rounded-full"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
                  alt="profile picture"
                />
                <div className="flex items-center divide-x-2 divide-gray-500 ">
                  <div className="pr-3 font-medium ">Micheal Gough</div>
                  <div className="pl-3 text-sm font-light text-gray-500 ">
                    Student @ UCLA
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
