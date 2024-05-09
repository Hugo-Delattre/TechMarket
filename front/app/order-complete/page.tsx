const OrderComplete = () => {
  return (
    <div className="relative h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 m-4 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold ">Thank you for your order!</h1>
        <p className="mt-2 text-md text-center text-gray-600">
          Your order has been placed successfully and will be delivered soon.
        </p>
        {/* <Confetti active={confetti} config={config} /> */}
      </div>
    </div>
  );
};

export default OrderComplete;
