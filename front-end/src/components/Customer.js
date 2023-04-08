import React, { useState, useEffect, useCallback, useRef } from 'react';
import { read } from './Backend';
import CustomerDetails from './CustomerDetails';

function Customer() {
  const isMounted = useRef(false);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  });

  const getCustomers = useCallback(async () => {
    const json = await read('Customer');

    if (!isMounted.current) {
      return;
    }

    if (json.error) {
      setCustomers([]);
    }
    else {
      setCustomers(json);
    }
  }, []);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  return (
    <>
    <div>
      {customers.map(c => (<CustomerDetails key={`customer${c.CustomerId}`} customer={c} />))}
    </div>
    </>
  );
}

export default Customer;