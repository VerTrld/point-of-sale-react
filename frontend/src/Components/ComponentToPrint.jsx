import React from "react";
export const ComponentToPrint = React.forwardRef((props, ref) => {
  const { cart, totalAmount } = props;
  return (
    <div ref={ref} className=" m-5 p-5">
      <div className="receipt-info">
        <h1>Coffix T</h1>
        <p>
          Coffix T <br />
          Mobile No. 099xxxxxxxx <br />
          coffixt@yahoo.com
          <br />
          http://www.coffixt.com.ph
          <br />
        </p>
      </div>
      <table className="table table-borderless table-responsive text-center">
        <thead>
          <tr>
            <td>Qty</td>
            <td>Name</td>
            <td>Price</td>
            <td>Total</td>
          </tr>
        </thead>
        <tbody>
          {cart
            ? cart.map((cartProduct, key) => (
                <tr>
                  <td>{cartProduct.quantity}</td>
                  <td>{cartProduct.name}</td>
                  <td>{cartProduct.price}</td>
                  <td>{cartProduct.totalAmount}</td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>
      <h3 className="mt-5">
        Total Amount:{" "}
        {totalAmount ? (totalAmount === 0 ? " " : `₱${totalAmount}`) : " "}
      </h3>
    </div>
  );
});
