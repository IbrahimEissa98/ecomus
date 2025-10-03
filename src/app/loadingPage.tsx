// import { useRef } from "react";
import logo from "../assets/images/icon.svg";
import { Spinner } from "@heroui/react";

export default function LoadingPage() {
  // const loader = useRef();
  return (
    <>
      <div
        className="loader fixed inset-0 bg-white dark:bg-slate-950 z-50 flex justify-center items-center flex-col "
        // ref={loader}
      >
        <img
          className="block w-24 h-24 rounded-full border-3 border-blue-500"
          src={logo}
          alt="BeSocial logo"
        />
        <h2 className="text-center font-bold tracking-wide text-3xl p-4">
          BeSocial
        </h2>
        <Spinner variant="wave" size="lg" />

        <div className="absolute w-full text-center bottom-3 left-1/2 -translate-x-1/2 text-blue-500 font-semibold">
          <p>Copyrights © Ibrahim Eissa</p>
        </div>
      </div>
    </>
  );
}
