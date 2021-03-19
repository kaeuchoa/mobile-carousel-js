import pagingStyles from './Paging.module.scss';

function Paging() {
    return (
        <div className={pagingStyles['paging']}>
            <span className={pagingStyles['paging__step']}></span>
            <span className={pagingStyles['paging__step']}></span>
            <span className={pagingStyles['paging__step']}></span>
            <span className={pagingStyles['paging__step']}></span>
            <span className={pagingStyles['paging__step']}></span>
        </div>
    );
}

export default Paging;
