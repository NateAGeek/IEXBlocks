import React, { useMemo } from 'react';
import {View, FlatList, useWindowDimensions} from 'react-native';
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

  const windowWidth = useWindowDimensions().width;
  const numCols = useMemo(() => {
    if(windowWidth >= 1000) {
      return 3;
    } else if(windowWidth <= 1000 && windowWidth >= 700) {
      return 2;
    } else if (windowWidth <= 700){
      return 1;
    }
  }, [windowWidth]);

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
      data={blocks} numColumns={numCols} key={numCols} renderItem={(block) => (
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