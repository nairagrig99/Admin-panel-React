import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../Store/store.ts";
import PreviousIcon from "../../UI/PreviousIcon.tsx";
import NextIcon from "../../UI/NetxIcon.tsx";
import {memo, useEffect, useState} from "react";
import {sortTransaction} from "../../../Store/Transaction/ApiThunkTransaction.ts";
import {LIMIT, SLIDE_ITEM_COUNT, SLIDE_ITEM_WIDTH} from "../../../constants/constant.ts";
import {AmountStatus} from "../../../Enums/amount-status.ts";

const Pagination = memo(() => {
    const select = useSelector((state: RootState) => state.transaction);
    const selectUser = useSelector((state: RootState) => state.user.loggedUser);

    const [page, setPage] = useState<number[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const [style, setStyle] = useState<React.CSSProperties>({});
    const [selectedPage, setSelectedPage] = useState(1);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const totalPages = Math.ceil(select.totalCount / LIMIT);
        const pagesArray = Array.from({length: totalPages}, (_, i) => i + 1);
        setPage(pagesArray);
        setPageCount(totalPages);
    }, [select.totalCount, select]);


    useEffect(() => {
        if (selectedPage <= pageCount && selectUser) {

            dispatch(sortTransaction({
                start: selectedPage,
                end: LIMIT,
                id: selectUser.id,
                sortBy: select.sortBy
            }));
        }

        if (selectedPage > 1) {
            const shift = (selectedPage - 1) * SLIDE_ITEM_WIDTH;
            setStyle({transform: `translateX(-${shift}px)`});
        } else {
            setStyle({transform: `translateX(0px)`});
        }
    }, [selectedPage, pageCount]);

    const previousHandle = () => {
        if (selectedPage > 1) setSelectedPage(prev => prev - 1);
    };

    const nextHandle = () => {
        if (selectedPage < pageCount) setSelectedPage(prev => prev + 1);
    };

    const selectPage = (pageNumber: number) => {
        setSelectedPage(pageNumber);
    };


    return (
        <div className="flex items-center gap-2">
            {pageCount > 1 && (
                <PreviousIcon onClick={previousHandle} className='cursor-pointer'/>
            )}

            {pageCount > 0 && (
                <div className='flex items-center'>
                    <div className='w-[100px] overflow-hidden flex justify-center'>
                        <div
                            className='flex gap-2 transition-transform duration-500 ease-in-out'
                            style={style}
                        >
                            {page.map((p) => (
                                <p
                                    key={p}
                                    onClick={() => selectPage(p)}
                                    className='cursor-pointer text-center min-w-[20px]'
                                    style={{
                                        color: p === selectedPage ? 'green' : 'white',
                                        fontWeight: p === selectedPage ? 'bold' : 'normal'
                                    }}
                                >
                                    {p}
                                </p>
                            ))}
                        </div>
                    </div>

                    {pageCount > SLIDE_ITEM_COUNT && (
                        <div className="flex gap-2 ml-2">
                            <p>...</p>
                            <p className={selectedPage === pageCount ? 'text-green-500' : 'text-white'}>
                                {pageCount}
                            </p>
                        </div>
                    )}
                </div>
            )}

            {pageCount > 1 && (
                <NextIcon onClick={nextHandle} className='cursor-pointer'/>
            )}
        </div>
    );
});
export default Pagination