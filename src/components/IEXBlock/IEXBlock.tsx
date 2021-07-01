import React, { Suspense, useMemo } from 'react';
import {View, Text} from 'react-native';
import { color } from '../../App';
import TickerOverview from './blocks/TickerOverview/TickerOverview';
import OrderBook from './blocks/OrderBook/OrderBook';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { removeBlock } from '../../states/redux';

class ErrorBoundary extends React.Component<{fallback: JSX.Element}> {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error: unknown) {
    return {
      hasError: true,
      error
    };
  }
  render() {
    if (this.state.hasError) {
      // eslint-disable-next-line react/prop-types
      return this.props.fallback;
    }
    // eslint-disable-next-line react/prop-types
    return this.props.children;
  }
}


/**
 * @property {string} title Block title
 * @property {JSX.Element} blockContent Block content to be seen
 */
export interface IEXBlockProps {
  symbol: string,
  title: string,
  blockTypes: string,
  location: number
}

/**
 * Creates a IEXBlock to render content
 * 
 * @param {IEXBlockProps} props IEXBlockProps required
 * @returns {JSX.Element} Rendered IEXBlock
 */
export default function IEXBlock({
  symbol,
  title,
  blockTypes,
  location
}: IEXBlockProps): JSX.Element {

  const dispatch = useDispatch();
  const block = useMemo(() => {
    switch(blockTypes){
    case 'ticker':
      return <TickerOverview symbol={symbol}/>;
    case 'book':
      return <OrderBook symbol={symbol} />;
    }
  }, [blockTypes, symbol]);

  return (
    <View style={{
      flex: 1,
      borderRadius: 2,
      borderColor: color['secondary'],
      backgroundColor: color['background2'],
      borderWidth: 4,
      aspectRatio: 1,
      padding: 12,
      shadowOffset: {
        height: 0,
        width: 0
      },
      shadowRadius: 18,
      shadowOpacity: .5,
      elevation: 14
    }}>
      <View style={{
        flexShrink: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8
      }}>
        <Text style={{
          fontSize: 18,
          color: 'white'
        }}>{title}</Text>
        <div style={{
          width: 26,
          height: 26,
          color: color['secondary'],
          textAlign: 'center',
          fontSize: 16,
          fontWeight: 'bold',
          cursor: 'pointer'
        }}><AiOutlineCloseCircle size={24} onClick={() => {
            dispatch(removeBlock({
              location: location
            }));
          }} /></div>
      </View>
      <ErrorBoundary fallback={<Text>ERROR loading or process ticker {symbol}</Text>}>
        <Suspense fallback={<Text>Loading...</Text>} >
          {block}
        </Suspense>
      </ErrorBoundary>
    </View>
  );
} 