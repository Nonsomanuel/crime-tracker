import { LoginForm } from "./loginform";
// import Footer from "@/components/footer/footer";

export default function LoginPage() {
  return (
    <div
      className="flex min-h-screen"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),url('/images/bgimage.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col gap-4 p-6 md:p-10 justify-center items-center m-auto">
        <div className="w-full max-w-xs shadow-lg p-6 rounded-[12px] bg-black/30">
          <LoginForm />
        </div>
        <div></div>
      </div>
      {/* <div className="text-white mt-auto">
        <Footer />
      </div> */}
    </div>
  );
}
