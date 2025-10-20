import { useState } from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../../data/testimonials'

const TestimonyCarrousel = () => {

    const [carrouselItems, setCarrouselItems] = useState(testimonials);
    const [isAnimating, setIsAnimating] = useState(false);

    const changeCenterItem = (index: number, id: number) => {
        if (isAnimating) return; // Evitar nuevas animaciones si ya hay una en curso
        setIsAnimating(true);
        const centerIndex = Math.floor(carrouselItems.length / 2);
        if (index > centerIndex) {
            const rotateRight = () => {
                setCarrouselItems(prev => [...prev.slice(1), prev[0]]);
                setIsAnimating(false);
            };
            const rotations = index - centerIndex;
            for (let i = 0; i < rotations; i++) {
                setTimeout(() => rotateRight(), i * 150); // 300ms entre cada rotación
            }
        } else if (index < centerIndex) {
            const rotateLeft = () => {
                setCarrouselItems(prev => [...prev.slice(-1), ...prev.slice(0, -1)]);
                setIsAnimating(false);
            };
            const rotations = centerIndex - index;
            for (let i = 0; i < rotations; i++) {
                setTimeout(() => rotateLeft(), i * 150); // 300ms entre cada rotación
            }
        }
    }

    return (
        <>
            <motion.div
                className='w-full flex gap-6 justify-center items-center'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {

                    carrouselItems.map((t, i) => {
                        const center = Math.floor(carrouselItems.length / 2);
                        const distance = Math.abs(i - center);
                        // Altura máxima para el central, decremento para los laterales
                        const baseHeight = 450; // px
                        const minHeight = 260; // px
                        const step = 60; // px por distancia
                        const height = Math.max(baseHeight - distance * step, minHeight);
                        const isCenter = i === center;
                        if (isCenter) {
                            return (
                                <motion.div
                                    className='w-100 bg-primary text-white px-8 py-10 flex items-end relative overflow-hidden'
                                    style={{
                                        height: `${height}px`,
                                        backgroundImage: `url(${t.thumbnail})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                    key={t.id}
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="40"
                                        height="40"
                                        viewBox="0 0 32 32"
                                        className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16"
                                    >
                                        <path fill="currentColor" d="M11 23a1 1 0 0 1-1-1V10a1 1 0 0 1 1.447-.894l12 6a1 1 0 0 1 0 1.788l-12 6A1 1 0 0 1 11 23m1-11.382v8.764L20.764 16Z" />
                                        <path fill="currentColor" d="M16 4A12 12 0 1 1 4 16A12 12 0 0 1 16 4m0-2a14 14 0 1 0 14 14A14 14 0 0 0 16 2" />
                                    </svg>

                                    <div className='flex flex-col z-10'>
                                        <span className='uppercase font-bold text-lg'>{t.name}</span>
                                        <span className=''>{t.level}</span>
                                    </div>
                                </motion.div>
                            );
                        }
                        return (
                            <motion.div
                                className='bg-primary text-white p-4 uppercase font-bold text-xl flex items-center cursor-pointer overflow-hidden'
                                style={{
                                    height: `${height}px`,
                                    backgroundImage: `url(${t.thumbnail})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                                key={t.id}
                                onClick={() => changeCenterItem(i, t.id)}
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className='[writing-mode:sideways-lr] z-10'>{t.name}</span>
                            </motion.div>
                        );
                    })
                }
            </motion.div>
        </>

    )
}

export default TestimonyCarrousel
