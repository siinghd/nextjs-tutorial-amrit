import Image from 'next/image';
import React from 'react';

export async function getStaticProps(context: any) {
  if (!['female', 'male'].includes(context.params.gender)) {
    return { notFound: true, revalidate: 60 };
  }
  const res = await fetch(
    `https://randomuser.me/api/?gender=${context.params.gender}`
  );
  const resJson = await res.json();

  return {
    props: {
      users: resJson.results,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          gender: 'male',
        },
      },
    ],
    fallback: true, // false or "blocking"
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
