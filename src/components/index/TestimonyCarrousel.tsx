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
                                    className='w-100 bg-primary text-white px-8 py-10 flex items-end transition-all duration-300'
                                    style={{
                                        height: `${height}px`,
                                        backgroundImage: `url(${t.thumbnail})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                    key={t.id}
                                >
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
