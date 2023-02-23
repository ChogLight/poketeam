// @ts-nocheck
export const DOTS = '...'
function usePagination(currentPage, numberOfPages) {

    /*
      If there are only 3 or less pages
    */
    currentPage = parseInt(currentPage)
      if(numberOfPages <=3){
        return numberOfPages === 1?
        [1]:
        numberOfPages === 2 ?
        [1,2]:
        [1,2,3]
      }
       /*
      Current page handler (if there are more than 3 pages)
      */
      else if(currentPage >=1 && currentPage < numberOfPages -1){
        return currentPage <= 2?
          [1, 2, 3, DOTS, numberOfPages]:
          [1, DOTS, currentPage -1, currentPage, currentPage+1, DOTS, numberOfPages]
      }
       /*
      Last page handler
      */
      else if(currentPage <= numberOfPages && currentPage >= numberOfPages -1){
        return [1, DOTS, numberOfPages-2, numberOfPages-1, numberOfPages]
      }
      else {
        return [1]
      }
  }
  
  export default usePagination;