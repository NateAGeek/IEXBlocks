import React from 'react';
import {View, FlatList} from 'react-native';
import { IEXBlockSliceInitalState } from '../../states/redux';
import IEXBlock from '../IEXBlock/IEXBlock';
import IEXBlockSelector, { IEXBlockSelectorOption } from '../IEXBlockSelector/IEXBlockSelector';

/**
 * @property {IEXBlockSliceInitalState.blocks} blocks list of blocks for the grid  
 */
export interface IEXBlockGridProps {
  blocks: IEXBlockSliceInitalState['blocks']
}

/**
 * Builds a grid layout IEXBlocksSelectors allowing the
 * user to select what IEXBlock they want to display and
 * monitor 
 *
 * @param {IEXBlockGridProps} props Props to render 
 * @returns {JSX.Element} Returns a grid of blocks
 */
export default function IEXBlockGrid({
  blocks
}: IEXBlockGridProps): JSX.Element {

  const selectionOptions: {[key: string]: IEXBlockSelectorOption} = {
    ticker: {
      title: 'Ticker Overview',
      blockKey: 'ticker'
    },
    book: {
      title: 'Order Book',
      blockKey: 'book'
    }
  };

  return (
    <FlatList
      data={blocks} numColumns={3} renderItem={(block) => (
        <View style={{
          flex: 1,
          margin: 16
        }}>
          {block.item.blockType === 'empty' ? 
            <IEXBlockSelector 
              selectionOptions={selectionOptions}
              blockLocation={block.index}
            /> : 
            <IEXBlock
              location={block.index}
              title={selectionOptions[block.item.blockType].title}
              symbol={block.item.symbol}
              blockTypes={block.item.blockType}
            />}
        </View>)
      }/>
  );
}