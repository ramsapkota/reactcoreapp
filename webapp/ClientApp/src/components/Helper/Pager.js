import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import _ from 'lodash';

const Pager = props => {
    const { pageNo, pagePerDisplay, totalNextPages } = props.pager
    let _pageNo = parseInt(pageNo,10);
    let _pagePerDisplay = parseInt(pagePerDisplay,10);
    let _totalNextPages = parseInt(totalNextPages, 10);

    var start = Math.floor((_pageNo - 1) / _pagePerDisplay) * _pagePerDisplay + 1;
    var end = start + (_pagePerDisplay - 1);

    if ((end - _pageNo) > _totalNextPages) end = _pageNo + _totalNextPages;

    let prev = _pageNo - 1;
    let next = _pageNo + 1;

    const pages = _.range(start, end + 1);

    const previousElemet = (
        <PaginationItem>
            <PaginationLink  onClick={() => props.onPageChange(prev)}>Prev</PaginationLink>
        </PaginationItem >
    )
    const nextElemet = (
        <PaginationItem>
            <PaginationLink onClick={() => props.onPageChange(next)} >Next</PaginationLink>
        </PaginationItem>
    )


    return (
        <Pagination aria-label="Page navigation example">
            {prev > 0 ? previousElemet : null}
            {pages.map(page => (
                <PaginationItem key={page}   >
                    <PaginationLink  onClick={() => props.onPageChange(page)}>
                        {page}
                    </PaginationLink>
                </PaginationItem>
            ))}
            {_totalNextPages > 0 ? nextElemet : null}
        </Pagination>
    );
}
export default Pager