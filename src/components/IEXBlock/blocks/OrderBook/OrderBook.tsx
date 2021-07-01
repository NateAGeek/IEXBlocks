import React from 'react';
import {View, Text, FlatList} from 'react-native';
import useSWR from 'swr';
import { swrFetcher } from '../../../../App';

/**
 *
 */
export interface OrderBookProps {
  symbol: string
}

/**
 * @param {OrderBookProps} props Props required to display a orderbook and trades
 * @returns {JSX.Element} Returns a rendered orderbook and recent trades
 */
export default function OrderBook({
  symbol,
}: OrderBookProps): JSX.Element {
  const {data: {
    bids,
    asks,
    trades
  }} = useSWR(`/deep?symbols=${symbol}`, swrFetcher, {suspense: true});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sizes = [...bids.map((b: any) => b.size), ...asks.map((a: any) => a.size)];
  const maxVolume = Math.max(...sizes);
  const minVolume = Math.min(...sizes) - 12;

  return (
    <View style={{
      flex: 1
    }}>
      <Text style={{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
      }}>Book</Text>
      <View style={{
        flexDirection: 'row',
      }}>
        <View style={{
          flex: 1/2
        }}>
          {bids.map((bid: {size: number, price: number}, index: number) => (
            <View key={`bid_${index}`} style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <View style={{
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: 'red',
                opacity: .15,
                alignSelf: 'flex-end',
                height: '100%',
                width: `${Math.round(((bid.size - minVolume) / (maxVolume - minVolume)) * 100)  }%`
              }}></View>
              <Text style={{
                fontSize: 16,
                color: 'white'
              }}>{bid.size}</Text>
              <Text  style={{
                fontSize: 16,
                marginRight: 8,
                color: 'white'
              }}>{`$${bid.price}`}</Text>
            </View>
          ))}
        </View>
        <View style={{
          flex: 1/2
        }}>
          {asks.map((ask: {size: number, price: number}, index: number) => (
            <View key={`ask_${index}`} style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundColor: 'green',
                opacity: .25,
                alignSelf: 'flex-end',
                height: '100%',
                width: `${Math.round(((ask.size - minVolume) / (maxVolume - minVolume)) * 100)}%`
              }}></View>
              <Text style={{
                fontSize: 16,
                marginLeft: 8,
                color: 'white'
              }}>{`$${ask.price}`}</Text>
              <Text style={{
                fontSize: 16,
                color: 'white'
              }}>{ask.size}</Text>
            </View>
          ))}
        </View>
      </View>
      <Text style={{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 16
      }}>Recent Trades</Text>
      <View style={{
        flex: 1/2,
        overflow: 'hidden'
      }}>
        <FlatList 
          data={trades}
          renderItem={({item: trade}) => (
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 4
            }}>
              <Text style={{
                fontSize: 18,
                color: 'white'
              }}>{`$${trade.price.toFixed(2)}`}</Text>
              <Text style={{
                fontSize: 18,
                color: 'white'
              }}>{trade.size}</Text>
              <Text style={{
                fontSize: 18,
                color: 'white'
              }}>{(new Date(trade.timestamp)).toLocaleTimeString('en-US')}</Text>
            </View>
          )} />
      </View>
    </View>
  );
}