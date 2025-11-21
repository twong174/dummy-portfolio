import { Link } from "react-router-dom";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { FlipWord } from "../animations/FlipWord";
import transition from "../transitions/Transition";
import Footer from "../components/Footer";
import Header from "../components/Header";

const ContactPage = () => {
  return (
    <>
      <div className="w-full h-screen p-8 flex flex-col gap-2">
        <Header textColor="black" />

        <main className="h-full grid grid-cols-2 gap-2">
          <div className="flex flex-col justify-between">
            <h1
              className="font-extrabold text-[180px] font-['Impact']
          leading-none "
            >
              DON'T BE SHY, REACH OUT
            </h1>

            <div className="flex flex-col gap-2">
              {" "}
              <p className="text-2xl font-medium tracking-tight">
                SEND AN EMAIL{" "}
              </p>
              <h2 className="text-6xl font-extrabold">email@email.com</h2>
              <p className="text-2xl font-medium tracking-tight">LET'S TALK</p>
              <h2 className="text-6xl font-extrabold">+1 234 5467</h2>
              <p className="text-2xl font-medium tracking-tight">DROP BY</p>
              <h2 className="text-6xl font-extrabold">
                174 Washington Street, 07342, Jersey City, NJ
              </h2>
            </div>
          </div>
          <div className="flex flex-col gap-4 ">
            <p className="text-2xl font-medium tracking-tight">
              [ CREATIVE IDENTITY ]{" "}
            </p>
            <input type="text" className="p-2 rounded-md w-full border focus:outline-none"/>
            <p className="text-2xl font-medium tracking-tight">
              [ DIGITAL CONNECTION ]{" "}
            </p>
            <input type="text" className="p-2 rounded-xl w-full border"/>
            <p className="text-2xl font-medium tracking-tight">
              [ YOUR VISION ]{" "}
            </p>
            <input type="text" className="p-2 rounded-xl h-full focus:outline-none w-full border"/>

            <div className="text-end text-2xl">
              SEND
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default transition(ContactPage);
