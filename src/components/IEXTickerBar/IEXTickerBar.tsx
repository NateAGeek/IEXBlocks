import React, { useState } from 'react';
import { TextInput, View, Text } from 'react-native';

/**
 * @property {string} placeholder Placeholder text for the input
 */
export interface IEXTickerBarProps {
  placeholder: string
}

/**
 * 
 * @param {IEXTickerBarProps} props Props required for the ticker bar
 * @returns {JSX.Element}
 */
export default function IEXTickerBar({
  placeholder
}: IEXTickerBarProps): JSX.Element {
  const [symbolInput, setSymbolInput] = useState('');

  return (
    <View style={{
      width: '100%',
      flexDirection: 'row'
    }}>
      <Text style={{marginRight: 16}}>Stock Symbol being used:</Text>
      <TextInput
        style={{
          flex: 1
        }}
        value={symbolInput}
        onChangeText={(text) => setSymbolInput(text)}
        placeholder={placeholder}
      />
    </View>
  );
}