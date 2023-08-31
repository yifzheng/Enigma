
const Pagination = ( { postsPerPage, totalPosts, paginate, currentPage } ) => {
    const pageNumbers = []; // array to store page numbers
    const maxDisplayedPages = 3; // maximum number of pages displayed by pagination

    // push the page numbers to the array
    for ( let i = 1; i <= Math.ceil( totalPosts / postsPerPage ); i++ ) {
        pageNumbers.push( i );
    }

    const startPage = Math.max( 1, currentPage - Math.floor( maxDisplayedPages / 2 ) ); // start page either 1 or the currentpage minus the half of total page numbers that can be displayed
    const endPage = Math.min( pageNumbers.length, startPage + maxDisplayedPages - 1 ); // end page is length of pageNumbers or startpage plus max displayedPages - 1

    const canGoBack = startPage > 1; // check if the start page is greater than 1 determines if the left button can be clicked
    const canGoForward = endPage < pageNumbers.length; // checks if the end page is less than the total pageNumbers

    return (
        <nav className="mt-4 flex justify-center items-center mb-10">
            <button
                onClick={ () => paginate( currentPage - 1 ) }
                disabled={ !canGoBack }
                className={ `px-3 py-2 mr-2 ${canGoBack ? 'text-blue-500' : 'text-gray-300 cursor-not-allowed'}` }
            >
                &lt;
            </button>
            <ul className="flex list-none">
                { pageNumbers.slice( startPage - 1, endPage ).map( ( number ) => (
                    <li
                        key={ number }
                        className={ `mx-1 ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} rounded-md cursor-pointer` }
                    >
                        <button
                            className="px-4 py-2"
                            onClick={ () => paginate( number ) }
                        >
                            { number }
                        </button>
                    </li>
                ) ) }
            </ul>
            <button
                onClick={ () => paginate( currentPage + 1 ) }
                disabled={ !canGoForward }
                className={ `px-3 py-2 ml-2 ${canGoForward ? 'text-blue-500' : 'text-gray-300 cursor-not-allowed'}` }
            >
                &gt;
            </button>
        </nav>
    );
};

export default Pagination;
