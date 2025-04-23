import React, { Suspense } from 'react'
import ModalContainer from './components/modal-container'
import TransactionTable from './components/transaction-table'
import Filter from './components/table-filter'
const Page = () => {
    return (
      <Suspense>
          <div className='container mx-auto'>
           <ModalContainer/>
           <Filter/>
           <TransactionTable/>
        </div>
      </Suspense>
    );
 
}

export default Page