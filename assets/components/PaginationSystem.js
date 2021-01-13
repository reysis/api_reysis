import React, {useEffect, useState} from 'react';
import {Pagination} from "react-bootstrap";

const PaginationSystem = (props) => {
    const [paginations, setPaginations] = useState([])

    useEffect(() => {
        setPaginations(getPagination)
    }, [props.loading])

    const getPagination = () => {
        const items = []

        if (props.currentPage > 1)
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
                active={1 === props.currentPage}
                disabled={loading}
                onClick={() => goToPage(1)}
                className={1 !== props.currentPage ? "d-none d-sm-block" : ""}
            >
                {1}
            </Pagination.Item>
        )

        if (props.totalItems > 0) {
            if (props.currentPage >= 5)
                items.push(
                    <Pagination.Ellipsis
                        key={"pagination-d1"}
                        disabled
                        className="d-none d-sm-block"
                    />
                )

            for (let i = Math.max(2, props.currentPage - 2); i <= Math.min(lastPage - 1, currentPage + 2); i++)
                items.push(
                    <Pagination.Item
                        key={"pagination" + i}
                        active={i === props.currentPage}
                        disabled={loading}
                        onClick={() => goToPage(i)}
                        className={i !== props.currentPage ? "d-none d-sm-block" : ""}
                    >
                        {i}
                    </Pagination.Item>
                );

            if (props.currentPage <= props.lastPage - 4)
                items.push(
                    <Pagination.Ellipsis
                        key={"pagination-d2"}
                        disabled
                        className="d-none d-sm-block"
                    />
                )

            if (props.lastPage > 1)
                items.push(
                    <Pagination.Item
                        key={"pagination" + props.lastPage}
                        active={lastPage === props.currentPage}
                        disabled={loading}
                        onClick={() => goToPage(props.lastPage)}
                        className={props.lastPage !== props.currentPage ? "d-none d-sm-block" : ""}
                    >
                        {props.lastPage}
                    </Pagination.Item>)
        }

        if (props.currentPage < props.lastPage)
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
        <Pagination className={`${props.classname} mx-auto my-3`}>
            <Pagination.First disabled={loading} onClick={() => goToPage(1)} />
            <Pagination.Prev disabled={loading} onClick={() => goToPage(currentPage - 1)} />
            {paginations}
            <Pagination.Next disabled={loading} onClick={() => goToPage(currentPage + 1)} />
            <Pagination.Last disabled={loading} onClick={() => goToPage(lastPage)} />
        </Pagination>
    );
};

export default PaginationSystem;
