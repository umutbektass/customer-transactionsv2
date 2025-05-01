"use client"; // Needed for using params and potentially state later

import React, { useState } from "react";
import { useParams } from "next/navigation";

import CustomerInfo from "./components/customer-info";
import CustomerTransactions from "./components/customer-transactions";

export default function CustomerDetailPage() {
  const params = useParams();
  const customerId = params.id;



  return (
    <React.Fragment>
      <div className="container mx-auto px-4 py-8 space-y-8">
        <CustomerInfo customerId={customerId} />
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <CustomerTransactions customerId={customerId} />
        </div>
      </div>
    </React.Fragment>
  );
}
