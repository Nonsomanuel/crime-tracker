import Link from "next/link";

export default function Footer() {
  return (
    <div className=" p-6 sm:p-8 text-center w-full my-auto rounded-[12px] text-[14px]">
      <p className=" font-semibold ">
        <Link href="/" className="">
          About
        </Link>{" "}
        |{" "}
        <Link href="/" className="">
          Contact
        </Link>{" "}
        |{" "}
        <Link href="/" className="">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
