import React, { useRef, useEffect } from 'react';

function CustomerDetails({ customer, updateRequestTimestamp, submitUpdate }) {
  const contactNameRef = useRef();
  const cityRef = useRef();
  const countryRef = useRef();
  const phoneRef = useRef();
  const updateRef = useRef({});

  useEffect(() => {
    contactNameRef.current = customer.ContactName;
    cityRef.current = customer.City;
    countryRef.current = customer.Country;
    phoneRef.current.value = customer.Phone;
  }, [customer]);

  useEffect(() => {
    if (!updateRequestTimestamp) {
      return;
    }

    console.log(`Customer ID: ${customer.CustomerId}`);

    // const customerUpdate = { ...customer };
    submitUpdate(customer.CustomerId, updateRef.current);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateRequestTimestamp]);

  const handleChange = (event) => {
    updateRef.current[event.currentTarget.name] = event.currentTarget.value;
    console.log(updateRef.current);
  };

  return (
    <>
    <div>
      <div>
        <input name='ContactName' ref={contactNameRef} defaultValue={customer.ContactName} type='text' onChange={handleChange} />
      </div>
      <div>
        <input name='City' ref={cityRef} defaultValue={customer.City} type='text' onChange={handleChange} />
      </div>
      <div>
        <span>
          <input name='Country' ref={countryRef} defaultValue={customer.Country} type='text' onChange={handleChange} />
        </span>
        <span>
          <input name='Phone' ref={phoneRef} defaultValue={customer.Phone} type='text' onChange={handleChange} />
        </span>
      </div>
      <br />
    </div>
    <div></div>
    </>
  );
}

export default CustomerDetails;