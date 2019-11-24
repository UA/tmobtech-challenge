import React from 'react';

interface Props {
    pages: Number;
    currentPage: Number;
    nextPage(pageNumber:Number):void;
}

const Pagination: React.SFC<Props> = props => {
    const pageLinks= []

    for(let i = 1; i <= props.pages.valueOf() + 1 ; i++){
        let active = props.currentPage == i ? 'active' : '';
        pageLinks.push(<li className={`waves-efect ${active}`} key={i} onClick={() => props.nextPage(i)}><a href="#">{i}</a></li>);
    }
    return (
        <div className="container">
            <div className="row">
                <ul className="pagination">
                    {props.currentPage > 1 ? <li className={`waves-efect`}  onClick={() => props.nextPage(props.currentPage.valueOf()-1)}><a href="#">Prev</a></li> : ''}
                    {pageLinks}
                    {props.currentPage < props.pages.valueOf() + 1 ? <li className={`waves-efect`}  onClick={() => props.nextPage(props.currentPage.valueOf()+1)}><a href="#">Next</a></li> : ''}
                </ul>
            </div>
        </div>
    );
};

export default Pagination;