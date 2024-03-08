/* eslint-disable react-hooks/rules-of-hooks */
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const client = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://randomuser.me/api/');
      const resJson = await res.json();
      console.log(resJson);
      setUserData(resJson.results);
    };

    fetchData();
  }, []);

  return userData.map((user: any) => (
    <div key={user.email}>
      <ul>
        <li>gender: {user.gender}</li>
        <li>name: {JSON.stringify(user.name)}</li>
        <li>email: {user.email}</li>
        <li>
          <Image
            src={user.picture.medium}
            width={100}
            height={100}
            alt="image"
          />
        </li>
      </ul>
    </div>
  ));
};

export default client;
