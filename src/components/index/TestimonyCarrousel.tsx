import { testimonials } from '../../data/testimonials'

const TestimonyCarrousel = () => {
    return (
        <>
            <div className='w-full flex gap-6 justify-center items-center'>
                {

                    testimonials.map((t, i) => {
                        const center = Math.floor(testimonials.length / 2);
                        const distance = Math.abs(i - center);
                        // Altura máxima para el central, decremento para los laterales
                        const baseHeight = 450; // px
                        const minHeight = 260; // px
                        const step = 60; // px por distancia
                        const height = Math.max(baseHeight - distance * step, minHeight);
                        const isCenter = i === center;
                        if (isCenter) {
                            return (
                                <div
                                    className='w-100 bg-primary text-white px-8 py-10 flex items-end transition-all duration-300 relative'
                                    style={{
                                        height: `${height}px`,
                                        backgroundImage: `url(${t.thumbnail})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                    key={t.id}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 32 32" className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  h-16 w-16"> <path fill="currentColor" d="M11 23a1 1 0 0 1-1-1V10a1 1 0 0 1 1.447-.894l12 6a1 1 0 0 1 0 1.788l-12 6A1 1 0 0 1 11 23m1-11.382v8.764L20.764 16Z" /> <path fill="currentColor" d="M16 4A12 12 0 1 1 4 16A12 12 0 0 1 16 4m0-2a14 14 0 1 0 14 14A14 14 0 0 0 16 2" /> </svg>

                                    <div className='flex flex-col'>
                                        <span className='uppercase font-bold text-lg'>{t.name}</span>
                                        <span className=''>{t.level}</span>
                                    </div>
                                </div>
                            );
                        }
                        return (
                            <div
                                className='bg-primary text-white p-4 uppercase font-bold text-xl flex items-center cursor-pointer transition-all duration-300'
                                style={{
                                    height: `${height}px`,
                                    backgroundImage: `url(${t.thumbnail})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                                key={t.id}
                            >
                                <span className='[writing-mode:sideways-lr]'>{t.name}</span>
                            </div>
                        );
                    })
                }
            </div>
        </>

    )
}

export default TestimonyCarrousel
