import React from 'react';
import { View, Text } from 'react-native';

/**
 *
 */
export interface PriceSizeInsightProps {
  title: string,
  price: number,
  size: number,
  color: 'red' | 'green' | 'yellow'
}

const themes = {
  red: {
    primary: 'white',
    background: '#BD2000',
    border: '#FA1E0E'
  },
  yellow: {
    primary: 'white',
    background: '#FFD56B',
    border: '#FF7B54'
  },
  green: {
    primary: 'white',
    background: '#52734D',
    border: '#91C788'
  }
};

/**
 * Displays the current price data and the related
 * size of volume on the price
 * 
 * @param {PriceSizeInsightProps} props Props that render the price and size
 * @returns {JSX.Element} Returns a price/size insight
 */
export default function PriceSizeInsight({
  title,
  price,
  size,
  color
}: PriceSizeInsightProps): JSX.Element {
  return (
    <View style={{
      borderWidth: 3,
      alignItems: 'center',
      flexShrink: 1,
      borderRadius: 4,
      borderColor: themes[color].border,
      //backgroundColor: themes[color].background,
    }}>
      <Text style={{
        color: themes[color].primary,
        width: '100%',
        textAlign: 'center',
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        fontSize: 16,
        borderColor: themes[color].border,
        fontWeight: 'bold'
      }}>{title}</Text>
      <Text style={{
        color: themes[color].primary,
        fontSize: 18
      }}>{`$${price.toFixed(2)}`}</Text>
      <Text style={{
        color: themes[color].primary,
      }}>{`${formatQuoteSize(size)}`}</Text>
    </View>
  );
}

/**
 * Taking in a size of a bid or ask formats into the following output
 * - if the size is less than 1,000 print it out as normal
 * - else if the size is greater than 1,000 but less than 1,000,000
 * returns a format that shifts the thousands into the base 10 ones place
 * - else size is greater than a million then returns
 * a format that shifts the millions into the base 10 ones place
 * 
 * @param {number} size Size of quote bid or ask
 * @returns {string} Returns a formated quote, (1.12k, 1.2M)
 */
function formatQuoteSize(size: number): string {
  if(size < 1000) {
    return size.toString();
  } else if (size > 1000 && size < 1000000) {
    return `${(size / 1000).toFixed(2)}k`;
  } else {
    return `${(size / 1000000).toFixed(1)}M`;
  }
}