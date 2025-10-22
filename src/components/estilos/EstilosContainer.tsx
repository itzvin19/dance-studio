import { useState } from "react";

interface EstilosContainerProps {
  titulo: string;
  descripcion: string;
  imgSrc?: string;
}

export default function EstilosContainer({ titulo, descripcion, imgSrc }: EstilosContainerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full group">
      <div
        className="cursor-pointer bg-gradient-to-r from-primary to-[#702615] p-4 2xl:p-6 flex items-center justify-between relative overflow-hidden "
        onClick={toggleAccordion}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleAccordion();
          }
        }}
      >
        {imgSrc && (
          <img
        src={imgSrc}
        alt={titulo}
        className="w-full h-full absolute object-cover brightness-30 transition-all duration-300 group-hover:brightness-75 top-0 left-0 z-0 "
          />
        )}
        <h3 className="text-xl font-bold text-white relative z-10 uppercase text-center w-full 2xl:text-2xl">{titulo}</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 text-white transform transition-transform duration-300 absolute right-6 ${isOpen ? "rotate-180" : "rotate-0"
            }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[400px]" : "max-h-0"
          }`}
      >
        <div className="px-5 xl:px-8 py-7 xl:py-10 bg-black/50 text-white rounded-b-lg h-full flex items-end relative mt-6 card-with-peak">
          {imgSrc && (

            <img
              src={imgSrc}
              alt={titulo}
              className="w-full h-full absolute object-cover brightness-30 transition-all duration-300  top-0 left-0 z-0"
            />
          )}
          <div className="relative z-10  mt-14">
            <span className="text-lg font-bold uppercase leading-10 2xl:text-2xl">{titulo}</span>
            <p className="text-balance xl:text-[16px] max-w-prose 2xl:text-lg">{descripcion}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
