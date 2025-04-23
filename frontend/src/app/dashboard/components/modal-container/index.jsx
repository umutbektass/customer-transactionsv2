'use client'
import React, { useState } from 'react'
import IncomeModal from './income-modal'
import { Button } from '../../../../components/ui/button'
const Index = () => {
    const [activeModal,setActiveModal] = useState(null)

    const handleActiveModal = (modal)=>{
        setActiveModal(modal)
    }
  return (
    <>
        <Button onClick={()=>handleActiveModal('income')}>Gelen - Giden Para Ekle</Button>
        <IncomeModal open={activeModal=='income'} onOpenChange={()=>handleActiveModal(null)}/>
    </>
  )
}

export default Index