import { useRef, useState } from "react";
import { testimonials } from "../../data/testimonials";
import { AnimatePresence, motion } from "framer-motion";

const TestimonyCarrousel = () => {
    const [primaryTestimony, setPrimaryTestimony] = useState(testimonials[0]);
    const [secondaryTestimony, setSecondaryTestimony] = useState(testimonials[0]);
    const [otherTestimonies, setOtherTestimonies] = useState(testimonials.slice(1));
    const [videoSrc, setVideoSrc] = useState("/videos/baile.mp4");
    const [onTop, setOnTop] = useState<"first" | "second">("first");

    const [fading, setFading] = useState(false);
    const firstRef = useRef<HTMLDivElement>(null);
    const secondRef = useRef<HTMLDivElement>(null);

    const handleTestimonyClick = (id: number) => {
        if (fading) return;

        const selected = testimonials.find(t => t.id === id);
        if (!selected) return;

        setFading(true);
        if (selected.videoUrl) 
            setVideoSrc(selected.videoUrl);

        const activeRef = onTop === "first" ? firstRef : secondRef;
        const nextRef = onTop === "first" ? secondRef : firstRef;

        // Actualizamos el testimonio del que va a entrar
        if (onTop === "first") {
            setSecondaryTestimony(selected);
        } else {
            setPrimaryTestimony(selected);
        }

        // Inicia la transición
        activeRef.current?.classList.add("opacity-0");
        nextRef.current?.classList.remove("-z-20", "pointer-events-none", "opacity-0");
        nextRef.current?.classList.add("z-20");

        setTimeout(() => {
            activeRef.current?.classList.remove("z-20");
            activeRef.current?.classList.add("-z-20", "pointer-events-none");
            setOnTop(onTop === "first" ? "second" : "first");
            const updatedOtherTestimonies = testimonials.filter(testimony => testimony.id !== id);
            setOtherTestimonies(updatedOtherTestimonies);
            setFading(false);
        }, 300)
    };


    // Estado para modal de video
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <div className="min-h-[384px] flex w-full gap-3 cursor-pointer" onClick={() => setModalOpen(true)}>
                <div className="w-7/10 bg-primary shadow-lg text-white items-center relative overflow-hidden">

                    <div
                        ref={firstRef}
                        className="absolute inset-0 z-20 transition-opacity duration-300 flex flex-col justify-end px-4 py-10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 32 32" className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 md:w-14 md:h-14"> <path fill="currentColor" d="M11 23a1 1 0 0 1-1-1V10a1 1 0 0 1 1.447-.894l12 6a1 1 0 0 1 0 1.788l-12 6A1 1 0 0 1 11 23m1-11.382v8.764L20.764 16Z" /> <path fill="currentColor" d="M16 4A12 12 0 1 1 4 16A12 12 0 0 1 16 4m0-2a14 14 0 1 0 14 14A14 14 0 0 0 16 2" /> </svg>
                        <img
                            className="absolute inset-0 w-full h-full object-cover brightness-80"
                            src={primaryTestimony?.thumbnail}
                            alt={primaryTestimony?.name}
                        />
                        <div className="flex flex-col z-10 relative text-white">
                            <span className="font-medium text-xl uppercase">{primaryTestimony.name}</span>
                            <span className="text-sm">{primaryTestimony.level}</span>
                        </div>
                    </div>


                    <div
                        ref={secondRef}
                        className="absolute inset-0 transition-opacity duration-300 flex flex-col justify-end px-4 py-10 opacity-0 -z-20 pointer-events-none ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 32 32" className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "> <path fill="currentColor" d="M11 23a1 1 0 0 1-1-1V10a1 1 0 0 1 1.447-.894l12 6a1 1 0 0 1 0 1.788l-12 6A1 1 0 0 1 11 23m1-11.382v8.764L20.764 16Z" /> <path fill="currentColor" d="M16 4A12 12 0 1 1 4 16A12 12 0 0 1 16 4m0-2a14 14 0 1 0 14 14A14 14 0 0 0 16 2" /> </svg>
                        <img
                            className="absolute inset-0 w-full h-full object-cover z-0 brightness-80"
                            src={secondaryTestimony.thumbnail}
                            alt={secondaryTestimony.name}
                        />
                        <div className="flex flex-col z-10 relative text-white">
                            <span className="font-medium text-xl uppercase">{secondaryTestimony.name}</span>
                            <span className="text-sm">{secondaryTestimony.level}</span>
                        </div>
                    </div>
                </div>

                {/* Thumbnails */}
                <div className="w-3/10 grid grid-cols-2 gap-3 justify-between">
                    <AnimatePresence mode="popLayout">
                        {otherTestimonies.map((testimony) => (
                            <motion.div
                                key={testimony.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="w-full bg-primary relative cursor-pointer shadow-md"
                                onClick={(e) => { e.stopPropagation(); handleTestimonyClick(testimony.id); }}
                            >
                                <img
                                    className="absolute inset-0 w-full h-full object-cover z-0 brightness-50 transition-transform duration-300 hover:scale-110"
                                    src={testimony.thumbnail}
                                    alt={testimony.name}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

            </div>
            {/* Modal con fondo negro y video */}
            <AnimatePresence>
                {modalOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setModalOpen(false)}
                    >
                        <motion.div
                            className="w-[90vw] max-w-4xl h-[50vw] max-h-[70vh] bg-black flex items-center justify-center rounded-lg overflow-hidden shadow-lg relative"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <video autoPlay controls className="w-full h-full object-contain bg-black">
                                <source src={videoSrc} type="video/mp4" />
                                Tu navegador no soporta la reproducción de video.
                            </video>
                            <button 
                                onClick={() => setModalOpen(false)} 
                                className="p-3 absolute top-0 sm:top-0 sm:right-1 md:top-2 right-2 text-white text-2xl md:text-3xl hover:bg-white/20 rounded-full transition-colors duration-200"
                                aria-label="Cerrar modal"
                            >
                                ×
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default TestimonyCarrousel;
