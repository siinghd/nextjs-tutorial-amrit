import Image from 'next/image';
import React from 'react';

export async function getStaticProps() {
  const res = await fetch('https://randomuser.me/api/');
  const resJson = await res.json();

  return {
    props: {
      users: resJson.results,
    },
    revalidate: 60000,
  };
}
const server = ({ users }: any) => {
  return users?.map((user: any) => (
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
            alt="hello"
          />
        </li>
      </ul>
    </div>
  ));
};

export default server;
