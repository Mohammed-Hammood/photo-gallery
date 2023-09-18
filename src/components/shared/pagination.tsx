import React, { useEffect, useState } from 'react';
import { Modal, SVG } from 'components';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.div`
    .pagination, & {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        width: 100%;
        font-size: 12px;
        padding:5px;
        &__button:hover, &__currentPage:hover {
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            background:var(--specialColor1);
            color:white;
            svg path {
                fill:white;
            }
        }
        &__button, &__disabled, &__currentPage {
            background: white;
            border: 0.1px solid var(--borderColor);
            border-radius:5px;
            cursor: pointer;
            height: 35px;
            padding: 10px 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            svg {
                width: 13px;
                height: 13px;
            }
    }
    &__disabled {
        cursor: default;
        opacity: 0.5;
    }
}
`
interface Props {
    queryset: any[];
    page: number;
    limit: number;
    totalCount: number;
    setPage: (pageNumber: number) => void;
}

export function Pagination(props: Props) {
    const [paginationModal, setPaginationModal] = useState<boolean>(false);
    const { queryset, totalCount, page, limit, setPage } = props;
    const { t:t_, i18n } = useTranslation('translation');
    const t = (text:string):string => t_(text)

    const dispatch = useDispatch();
    const ltr = ['ar'].includes(i18n.language) ? false : true;
    useEffect(() => {
    }, [dispatch]);

    const handlePagesChanges = (direction: string): void => {
        if (direction === "next" && pageValues().isNextPage) {
            setPage(page + 1);
        } else if (direction === "previous" && pageValues().isPrevPage) {
            setPage(page - 1);
        } else if (direction === "last" && !pageValues().isLastPage) {
            setPage(pageValues().totalPages)
        } else if (direction === 'first' && !pageValues().isFirstPage) {
            setPage(1);
        }
    }
    const pageValues = () => {
        const totalPages = Math.ceil(totalCount / limit) || 1;
        const startQuery = (page === 1) ? 1 : limit * (page - 1) + 1;
        const endQuery = (page === 1) ? queryset.length : ((limit * (page - 1) + totalCount));
        const isLastPage = totalCount === 0 ? true : (page === Math.ceil(totalCount / limit));
        const isFirstPage = (page === 1);
        const isPrevPage = (page > 1);
        const isNextPage = (totalPages > page);
        return {
            startQuery,
            endQuery,
            totalCount,
            isLastPage,
            isPrevPage,
            isNextPage,
            isFirstPage,
            totalPages
        }
    }
    return (
        <>
            <Wrapper className='pagination'>
                <button className={pageValues().isFirstPage ? 'pagination__disabled' : 'pagination__button'} title={t("First page")} onClick={() => handlePagesChanges("first")}>
                    <SVG name={`angles-${ltr ? "left" : "right"}`} color='black' />
                </button>
                <button className={pageValues().isFirstPage ? 'pagination__disabled' : 'pagination__button'} onClick={() => handlePagesChanges("previous")} title={t("Previous page")}>
                    <SVG name={`angle-${ltr ? "left" : "right"}`} color='black' />
                </button>

                <button title={t("Move to a specific page by entering a page number")} type='button'
                    onClick={() => setPaginationModal(true)}
                    className={'pagination__currentPage'}>
                    {page} {t("of")} {pageValues().totalPages}
                </button>

                <button className={pageValues().isNextPage ? 'pagination__button' : 'pagination__disabled'} onClick={() => handlePagesChanges("next")} title={t("Next page")}>
                    <SVG name={`angle-${ltr ? "right" : "left"}`} color='black' />
                </button>

                <button className={pageValues().isLastPage ? 'pagination__disabled' : 'pagination__button'} title={t("Last page")} onClick={() => handlePagesChanges("last")}>
                    <SVG name={`angles-${!ltr ? "left" : "right"}`} color='black' />
                </button>
            </Wrapper>
            <Modal
                form="pagination"
                title="Move to page"
                close={()=> setPaginationModal(false)}
                isOpen={paginationModal}
                maxWidth={"maxWidth500"}
                {...{ page, setPage, totalPages: pageValues().totalPages }}
            />
        </>
    )
}