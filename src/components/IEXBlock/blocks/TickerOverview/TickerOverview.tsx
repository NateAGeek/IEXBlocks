import React from 'react';
import {View, Image, Text} from 'react-native';
import useSWR from 'swr';
import { color, swrFetcher } from '../../../../App';
import PriceSizeInsight from './PriceSizeInsight/PriceSizeInsight';
import ReactECharts from 'echarts-for-react';
/**
 * 
 */
export interface TickerOverviewProps {
  symbol: string,
  // logoUrl: string,
  // ask: string,
  // bid: string,
  // lastPrice: string,
}

/**
 * 
 * @param {TickerOverviewProps} props Ticker
 * @returns {JSX.Element} Returns some basic Tick Data
 */
export default function TickerOverview({
  symbol,
}: TickerOverviewProps): JSX.Element {
  const { data: {
    url: logoUrl
  }, error: logoError } = useSWR(`/stock/${symbol}/logo`, swrFetcher, {suspense: true});
  
  const {data: {
    iexBidPrice,
    iexBidSize,
    iexAskPrice,
    iexAskSize,
    iexRealtimePrice,
    iexRealtimeSize
  }, error: quoteError } = useSWR(`/stock/${symbol}/quote`, swrFetcher, {suspense: true, refreshInterval: 1000});

  const {data: intraTicks, error: intraError} = useSWR(`/stock/${symbol}/intraday-prices?chartIEXOnly=true&chartLast=30`, swrFetcher, {suspense: true, refreshInterval: 5000});

  return (
    (quoteError || intraError)  ? <View>Failed to load or process symbol: {symbol}</View> : 
      <View style={{
        flex: 1
      }}>
        <View style={{
          flexDirection: 'row',
          alignContent: 'center',
          paddingVertical: 8
        }}>
          {logoError ? <Text>Failed to load logo</Text> : 
            <Image source={{
              uri: logoUrl
            }}
            resizeMode={'contain'} 
            style={{
              height: '100%',
              minWidth: 72,
              flexShrink: 1,
            }}/>
          }
          <View style={{
            marginLeft: 8,
          }}>
            <Text style={{
              lineHeight: 16,
              color: 'white'
            }}>Ticker:</Text>
            <Text style={{
              fontSize: 48,
              lineHeight: 34,
              flexShrink: 1,
              color: 'white'
            }}>{symbol.toUpperCase()}</Text>
          </View>
        </View>
        <View style={{
          flexGrow: 1
        }}>
          <ReactECharts
            style={{
              height: '100%'
            }}
            lazyUpdate={true} 
            option={{
              textStyle: {
                color: '#FFF'
              },
              grid: {
                containLabel: true,
                left: 0,
                bottom: 10,
                right: 10,
                top: 10
              },
              xAxis: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data: [...intraTicks.map((tick: any) => tick.label), (new Date()).toLocaleString('en-US', { hour: 'numeric', hour12: true })]
              },
              yAxis: {
                scale: true,
              },
              series: [{
                type: 'line',
                symbol: 'none',
                smooth: 0.2,
                lineStyle: {
                  color: color['secondary']
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data: [...intraTicks.map((tick: any, index: number) => 
                  (((tick.high ? 
                    tick.high : 
                    index - 1 >= 0 && intraTicks[index-1].high  ? 
                      intraTicks[index-1].high : 0) + 
                    (tick.low ? 
                      tick.low : 
                      index - 1 >= 0 && intraTicks[index-1].low ? 
                        intraTicks[index-1].low : 0)) / 2)), iexRealtimePrice]
              }]
            }}/>
        </View>
        <View style={{
          flexDirection: 'row'
        }}>
          <View style={{
            flex: 1/3,
            margin: 6
          }}>
            <PriceSizeInsight
              title={'Bid'}
              price={iexBidPrice} 
              size={iexBidSize}
              color={'red'}
            />
          </View>
          <View style={{
            flex: 1/3,
            margin: 6
          }}>
            <PriceSizeInsight
              title={'Price'}
              price={iexRealtimePrice} 
              size={iexRealtimeSize}
              color={'yellow'}
            />
          </View>
          <View style={{
            flex: 1/3,
            margin: 6
          }}>
            <PriceSizeInsight
              title={'Ask'}
              price={iexAskPrice} 
              size={iexAskSize}
              color={'green'}
            />
          </View>
        </View>
      </View>
  );
}