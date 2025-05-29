import { notFound } from 'next/navigation';
import axios from '../../../utils/axiosInstance';

import { User, Params } from 'ptypes';;

export default async function userDetail({ params }: Params) {
  const { id } = params;

  return (
    <>
      <h1>user detail {id}</h1>
      <h2>現在鋭意作成中</h2>
    </>
  )
}