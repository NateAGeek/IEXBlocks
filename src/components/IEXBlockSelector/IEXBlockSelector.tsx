import React, {useState} from 'react'; 
import { useDispatch } from 'react-redux';
import './IEXBlockSelector.styles.scss';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import {BsArrowRightShort} from 'react-icons/bs';
import { color } from '../../App';
import { addBlock } from '../../states/redux';

/**
 * 
 */
export interface IEXBlockSelectorOption {
  title: string,
  blockKey: string
}

/**
 * 
 */
export interface IEXBlockSelectorProps {
  selectionOptions: {[blockKey: string]: IEXBlockSelectorOption},
  blockLocation: number
}

/**
 * Block selector
 * 
 * @param {IEXBlockSelectorProps} props IEXBlockSelector Properties
 * @returns {JSX.Element} Returns a selector for a IEX Block
 */
export default function IEXBlockSelector({
  selectionOptions,
  blockLocation
}: IEXBlockSelectorProps): JSX.Element {
  const [openSelections, setOpenSelections] = useState(false);
  const [selectedBlockType, setSelectedBlockType] = useState('');
  const [continueToSymbol, setContinueToSymbol] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const dispatch = useDispatch(); 

  return (
    <div className={'iex_block_selector'}>
      { !openSelections ? 
        <button className={'iex_block_selector__add_button'} 
          onClick={() => {
            setOpenSelections(true);
          }}>
        +
        </button> : 
        <div className={'iex_block_selector__selection_list'}>
          <div className={'iex_block_selector__selection_list__header'}>
            <AiOutlineCloseCircle 
              color={color['secondary']}
              onClick={() => {
                setOpenSelections(false);
                setContinueToSymbol(false);
              }} 
              className={'iex_block_selector__selection_list__close_button'}
            />
          </div>
          {!continueToSymbol ? <ul className={'iex_block_selector__selection_list__items'}>
            {Object.values(selectionOptions).map((option, index) => (
              <li
                key={'selection_option_' + index}
                className={'iex_block_selector__selection_list__items__item'}
              >
                <a onClick={() => {
                  setSelectedBlockType(option.blockKey);
                  setContinueToSymbol(true);
                }}>
                  {option.title}
                  <div className={'arrow_container'}>
                    <BsArrowRightShort size={24} className={'arrow'}/>
                  </div>
                </a>
              </li>
            ))}
          </ul> : 
            <div className={'iex_block_selector__selection_list__symbol'}>
              <input
                className={'iex_block_selector__selection_list__symbol_input'}
                placeholder={'Enter Symbol to Track'}
                onChange={(event) => {
                  setSelectedSymbol(event.target.value);
                }} 
                value={selectedSymbol}
                onKeyUp={(event) => {
                  if(event.code === 'Enter') {
                    dispatch(addBlock({
                      location: blockLocation,
                      blockType: selectedBlockType,
                      symbol: selectedSymbol
                    }));
                  } 
                }}/>
              <BsArrowRightShort size={24} onClick={() => {
                dispatch(addBlock({
                  location: blockLocation,
                  blockType: selectedBlockType,
                  symbol: selectedSymbol
                }));
              }}className={'arrow'}/>
            </div>}
        </div>}
    </div>
  );
}