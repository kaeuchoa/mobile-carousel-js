import cardStyles from './Card.module.scss';

function Card(props) {
    return (
        <div className={cardStyles['mock-frame']}>
            {props.children}
        </div>
    );
}

export default Card;
