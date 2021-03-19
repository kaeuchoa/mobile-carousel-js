import Paging from '../Paging/Paging';
import carouselStyles from './Carousel.module.scss';

function Carousel() {
    return (
        <section className={carouselStyles['carousel']}>
            <div className={carouselStyles['carousel__img']}>
                <span className={carouselStyles['loader']}></span>
                <img src='https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_04390001-03110502.png' alt='Sprocket' />
            </div>

            <div className={carouselStyles['carousel__content']}>
                <Paging />

                <div className={carouselStyles['carousel__slider']}>
                    <div className={carouselStyles['carousel__item']}>
                        <h1 className={carouselStyles['carousel__title']}>Sprocket</h1>
                        <p className={carouselStyles['carousel__text']}>Animal Crossing</p>
                    </div>
                </div>

                <div className={carouselStyles['carousel__action-bar']}>
                    <button className={`${carouselStyles['carousel__btn']} ${carouselStyles['carousel__btn--primary']}`}>
                        <i className='fas fa-arrow-left' />
                        <span className='ripple'></span>
                    </button>

                    <button className={`${carouselStyles['carousel__btn']} ${carouselStyles['carousel__btn--primary']}`}>
                        <i className='fas fa-arrow-right' />
                        <span className='ripple'></span>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Carousel;
