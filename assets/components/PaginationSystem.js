import React, {useEffect, useState} from 'react';
import {Pagination} from "react-bootstrap";

const PaginationSystem = (
    {
        goToPage,
        currentPage,
        lastPage,
        className,
        loading,
        totalItems
    }) => {
    const [paginations, setPaginations] = useState([])

    useEffect(() => {
        setPaginations(getPagination)
    }, [loading])

    const getPagination = () => {
        const items = []

        if (currentPage > 1)
            items.push(
                <Pagination.Ellipsis
                    key={"pagination-n1"}
                    disabled
                    className="d-sm-none"
                />
            )

        items.push(
            <Pagination.Item
                key={"pagination" + 1}
                active={1 === currentPage}
                disabled={loading}
                onClick={()=>{goToPage(1)}}
                className={1 !== currentPage ? "d-none d-sm-block" : ""}
            >
                {1}
            </Pagination.Item>
        )

        if (totalItems > 0) {
            if(currentPage >= 5)
                items.push(
                    <Pagination.Ellipsis
                        key={"pagination-d1"}
                        disabled
                        className="d-none d-sm-block"
                    />
                )

            for (let i = Math.max(2, currentPage - 2); i <= Math.min(lastPage - 1, currentPage + 2); i++)
                items.push(
                    <Pagination.Item
                        key={"pagination" + i}
                        active={i === currentPage}
                        disabled={loading}
                        onClick={() => goToPage(i)}
                        className={i !== currentPage ? "d-none d-sm-block" : ""}
                    >
                        {i}
                    </Pagination.Item>
                );

            if (currentPage <= lastPage - 4)
                items.push(
                    <Pagination.Ellipsis
                        key={"pagination-d2"}
                        disabled
                        className="d-none d-sm-block"
                    />
                )

            if (lastPage > 1)
                items.push(
                    <Pagination.Item
                        key={"pagination" + lastPage}
                        active={lastPage === currentPage}
                        disabled={loading}
                        onClick={() => goToPage(lastPage)}
                        className={lastPage !== currentPage ? "d-none d-sm-block" : ""}
                    >
                        {lastPage}
                    </Pagination.Item>)
        }

        if (currentPage < lastPage)
            items.push(
                <Pagination.Ellipsis
                    key={"pagination-n2"}
                    disabled
                    className="d-sm-none"
                />
            )

        return items
    }

    return (
        <Pagination className={`${className} mx-auto my-3`}>
            <Pagination.First disabled={loading} onClick={()=>{goToPage(1)}} />
            <Pagination.Prev disabled={loading} onClick={()=>{goToPage(Math.max(currentPage-1, 1))}} />
            {paginations}
            <Pagination.Next disabled={loading} onClick={()=>{goToPage(Math.min(lastPage, currentPage + 1))}} />
            <Pagination.Last disabled={loading} onClick={()=>{goToPage(lastPage)}} />
        </Pagination>
    );
};

export default PaginationSystem;
