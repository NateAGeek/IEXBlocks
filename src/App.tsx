import React from 'react';
// import {JSX} from '@types/react';
import IEXBlockGrid from './components/IEXBlockGrid/IEXBlockGrid';
import axios, {AxiosRequestConfig} from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from './states/redux';

export const color = {
  'background': '#173F5F',
  'background2': '#194569',
  'primary': '#20639B',
  'secondary': '#3CAEA3',
  'red': '#ED553B',
  'yellow': '#F6D55C'
};

export const PUBLIC_TOKEN = 'pk_5c31fbd1b349498f81a2bbaf446c5b6f';
export const IEX_ENDPOINT = 'https://cloud.iexapis.com/v1';

export const swrFetcher = 
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  (url: string, params: AxiosRequestConfig['params']) => axios.get(IEX_ENDPOINT + url, {
    params: {
      ...params,
      token: PUBLIC_TOKEN
    }
  }).then(res => res.data);

/**
 * Renders the App
 *
 * @returns {JSX.Element} App
 */
export default function App(): JSX.Element {
  const blockItems = useSelector((state: RootState) => state.blocks);

  return (
    <IEXBlockGrid blocks={blockItems} />
  );
}
