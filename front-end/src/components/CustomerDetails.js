import React, { useRef } from 'react';

function CustomerDetails(props) {
  const contactNameRef = useRef();
  const cityRef = useRef();
  const countryRef = useRef();
  const phoneRef = useRef();

  const customer = props.customer;
  return (
    <>
    <div>
      <div>
        <input ref={contactNameRef} defaultValue={customer.ContactName} type='text' />
      </div>
      <div>
        <input ref={cityRef} defaultValue={customer.City} type='text' />
      </div>
      <div>
        <span>
          <input ref={countryRef} defaultValue={customer.Country} type='text' />
        </span>
        <span>
          <input ref={phoneRef} defaultValue={customer.Phone} type='text' />
        </span>
      </div>
      <br />
    </div>
    <div></div>
    </>
  );
}

export default CustomerDetails;