"use client";

import Loading from "@/components/Loading";
import { useUser } from "@clerk/nextjs";
import React from "react";
import WizardStepper from "@/components/WizardStepper";
import { useCheckoutNavigation } from "@/hooks/useCheckoutNavigation";
import CheckoutDetailsPage from "./details";
import PaymentPage from "./payment";

const CheckoutWizard = () => {
  const { isLoaded } = useUser();
  const { checkoutStep } = useCheckoutNavigation();

  if (!isLoaded) return <Loading />;

  const renderStep = () => {
    switch (checkoutStep) {
      case 1:
        return <CheckoutDetailsPage/>;
      case 2:
        return <PaymentPage />;
      case 3:
        return "completion page";
      default:
        return <CheckoutDetailsPage/>;
    }
  };

  return (
    <div className="checkout">
      <WizardStepper currentStep={checkoutStep} />
      <div className="checkout__content">{renderStep()}</div>
    </div>
  );
};

export default CheckoutWizard;