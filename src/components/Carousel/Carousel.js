import Paging from '../Paging/Paging';
import './Carousel.scss';

function Carousel() {
    return (
        <section className='carousel'>
            <div className='carousel__img'>
                <span className='loader'></span>
                <img
                    src='https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_04390001-03110502.png'
                    alt=''
                />
            </div>

            <div className='carousel__content'>
                <Paging />

                <div className='carousel__slider'>
                    <div className='carousel__item'>
                        <h1 className='carousel__title'>Sprocket</h1>
                        <p className='carousel__text'>Animal Crossing</p>
                    </div>
                </div>

                <div className='carousel__action-bar'>
                    <button className='carousel__btn carousel__btn--primary'>
                        <i className='fas fa-arrow-left' />
                        <span className='ripple'></span>
                    </button>

                    <button className='carousel__btn carousel__btn--primary'>
                        <i className='fas fa-arrow-right' />
                        <span className='ripple'></span>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Carousel;
