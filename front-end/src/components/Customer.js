import React, { useState, useEffect, useCallback, useRef } from 'react';
import { read, update } from './Backend';
import CustomerDetails from './CustomerDetails';

const domain = 'Customer';

function Customer() {
  const isMounted = useRef(false);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    isMounted.current = true;

    getCustomers();

    return () => {
      isMounted.current = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCustomers = useCallback(async () => {
    const json = await read(domain);

    if (!isMounted.current) {
      return;
    }

    if (json.error) {
      setCustomers([]);
    }
    else {
      setCustomers(json);
      console.log('Refreshed customers data.')
    }
  }, []);

  // useEffect(() => {
  //   getCustomers();
  // }, [getCustomers]);
  // useEffect(() => {
  //   //
  // }, [customers]);

  const submittedUpdateCount = useRef(0);
  const [updateRequestTimestamp, setUpdateRequestTimestamp] = useState(null);

  const submitUpdate = async (id, updatedProps) => {
    if (Object.keys(updatedProps)?.length) {
      await update(domain, id, updatedProps);
      console.log(updatedProps);
    }

    const newCount = submittedUpdateCount.current + 1;
    submittedUpdateCount.current = newCount;
    console.log(submittedUpdateCount.current);

    if (customers.length === newCount) {
      // RE-FETCH ALL RECORDS!!!
      // const newCustomers = [...customers];
      // setCustomers(newCustomers);
      getCustomers();
    }
  };

  const handleUpdate = () => {
    submittedUpdateCount.current = 0;
    setUpdateRequestTimestamp(Date.now());
  };

  return (
    <>
    <div>
      {customers.map(c => (<CustomerDetails key={`customer${c.CustomerId}`} customer={c} updateRequestTimestamp={updateRequestTimestamp} submitUpdate={submitUpdate} />))}
    </div>
    <div>
      <button type='button' onClick={handleUpdate}>Update</button>
    </div>
    </>
  );
}

export default Customer;