import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { videos } from "../data/videos";
import type { VideoCard } from "../types/videos";

const VideoGallery = () => {

    const [startIndex, setStartIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(6);

    // Detectar el tamaño de pantalla y ajustar visibleCount
    const [selectedVideo, setSelectedVideo] = useState<VideoCard | null>(null);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setVisibleCount(4);
            } else {
                setVisibleCount(6);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Calcular los videos visibles basados en el startIndex y visibleCount
    const visibleVideos = videos.slice(startIndex, startIndex + visibleCount);

    // Calcular el índice máximo permitido
    const maxStartIndex = Math.max(0, videos.length - visibleCount);

    const handleNext = () => {
        if (startIndex < maxStartIndex) {
            setStartIndex(startIndex + 1);
        }
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    return (
        <div className="flex w-full md:justify-center gap-6 items-end">
            {/* Primera columna */}
            <div className="w-full md:w-1/4 flex flex-col gap-6">
                {visibleVideos.slice(0, 2).map((v) => (
                    <motion.div
                        key={v.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full bg-primary h-[220px] md:h-[380px] hover:scale-105 duration-150 cursor-pointer"
                        onClick={() => setSelectedVideo(v)}
                    >
                        <video autoPlay muted loop className="w-full h-full object-cover">
                            <source src={v.videoSrc} />
                        </video>
                    </motion.div>
                ))}
            </div>
            {/* Segunda columna */}
            <div className="w-full md:w-1/4 flex flex-col gap-6">
                {visibleVideos.slice(2, 4).map((v) => (
                    <motion.div
                        key={v.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full bg-primary h-[220px] md:h-[380px] hover:scale-105 duration-150 cursor-pointer"
                        onClick={() => setSelectedVideo(v)}
                    >
                        <video autoPlay muted loop className="w-full h-full object-cover">
                            <source src={v.videoSrc} />
                        </video>
                    </motion.div>
                ))}
                <div className="flex justify-center gap-2 z-10 relative">
                    <button aria-label="previous video" className="p-2" onClick={handlePrev}>
                        <svg
                            className="h-8 w-8 md:h-12 md:w-12 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                        >
                            <path
                                fill="currentColor"
                                d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-.72 4.594L9.595 15.28l-.72.72l.72.72l5.687 5.686L16.72 21l-4-4H23v-2H12.72l4-4z"
                            />
                        </svg>
                    </button>
                    <button aria-label="next video" onClick={handleNext}>
                        <svg
                            className="h-8 w-8 md:h-12 md:w-12 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                        >
                            <path
                                fill="currentColor"
                                d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m.72 4.594L15.28 11l4 4H9v2h10.28l-4 4l1.44 1.406l5.686-5.687l.72-.72l-.72-.72l-5.687-5.686z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            {/* Tercera columna solo en md+ */}
            <div className="w-full md:w-1/4 hidden md:flex flex-col gap-6">
                {visibleVideos.slice(4, 6).map((v) => (
                    <motion.div
                        key={v.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full bg-primary h-[220px] md:h-[380px] hover:scale-105 duration-150 cursor-pointer"
                        onClick={() => setSelectedVideo(v)}
                    >
                        <video autoPlay muted loop className="w-full h-full object-cover">
                            <source src={v.videoSrc} />
                        </video>
                    </motion.div>
                ))}
            </div>
            {/* Modal animado con fondo negro */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedVideo(null)}
                    >
                        <motion.div
                            layoutId={`video-${selectedVideo.id}`}
                            className="w-[90vw] max-w-2xl h-[50vw] max-h-[70vh] bg-black flex items-center justify-center rounded-lg overflow-hidden shadow-lg relative"
                            onClick={e => e.stopPropagation()}
                        >
                            <video autoPlay controls className="w-full h-full object-contain bg-black">
                                <source src={selectedVideo.videoSrc} />
                            </video>
                            <button onClick={() => setSelectedVideo(null)} className="absolute top-0 md:top-2 md:right-0 sm:right-12 text-white text-4xl">×</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default VideoGallery;
