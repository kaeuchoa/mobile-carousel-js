import './Paging.scss';

function Paging() {
    return (
        <div className='paging'>
            <span className='paging__step paging__step--active'></span>
            <span className='paging__step'></span>
            <span className='paging__step'></span>
            <span className='paging__step'></span>
            <span className='paging__step'></span>
        </div>
    );
}

export default Paging;
