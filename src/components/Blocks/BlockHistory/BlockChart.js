import React from 'react';
import styled from 'styled-components';
import { FlexRowWrap, FlexColumn } from '../../Common';
import { getMinutesInterval, wrappBlockDataToObj } from '../../../utils';
import { Link } from 'react-router-dom';
import { timeFormat } from 'd3-time-format';
import { format } from 'd3-format';

const BlocksChart = ({ blockHistory, currentBlock }) => {
  let lastBlock = blockHistory[blockHistory.length - 1];
  let lastTime = new Date(lastBlock[0]).setSeconds(0, 0);
  let timeRange = getMinutesInterval(lastTime, 60).reverse();
  let blocksMap = wrappBlockDataToObj(blockHistory);

  return (
    <BlocksWrapper>
      {timeRange.map((timestamp, index) => {
        const blocks = (blocksMap[timestamp]||[]).sort((a,b) => (a.is_uncle?1:0)-(b.is_uncle?1:0));
        const isCurrent = blocks[0] && blocks[0].hash === currentBlock.hash;
        return (
          <BlockColumn key={index}>
            {index % 10 === 0 && (
              <TimeWrapper>
                <Line>|</Line>
                <Time>{timeFormat('%H:%M')(new Date(timestamp))}</Time>
              </TimeWrapper>
            )}
            {!blocks.length ? (
              <EmptyBlockSquare/>
            ) : (
              blocks.map((block, index) => {
                return (<BlockSquare
                  key={index}
                  height={format(',')(block.height)}
                  to={`/block/${block.hash}`}
                  mb={12*index}
                  bg={block.is_uncle?red:(isCurrent?white:blue)}
                  border={isCurrent?'1px solid #fff':'none'}
                />);
               })
            )}
          </BlockColumn>
        );
      })}
    </BlocksWrapper>
  );
};
export default BlocksChart;

const red = 'linear-gradient(45deg, #ED6290 0%, #FC6483 100%)';
const blue = 'linear-gradient(45deg, #26B2EE 0%, #29C0FF 100%)';
const white = '#fff';

const BlocksWrapper = styled(FlexRowWrap)`
  justify-content: flex-start;
  position: relative;
`;

const BlockColumn = styled(FlexColumn)`
  margin-right: 1px;
  justify-content: flex-end;
`;

const TimeWrapper = styled.div`
  position: relative;
`;
const Time = styled.div`
  color: rgba(255, 255, 255, 0.52);
  font-size: 10px;
  top: 36px;
  position: absolute;
  transform: translate(-50%,0);
`;
const Line = styled.div`
  font-weight: 100;
  color: #83858d;
  z-index: 0;
  position: absolute;
  left: -2px;
  top: 10px;
  font-size: 18px;
`;

const EmptyBlockSquare = styled.div`
  width: 11px;
  height: 11px;
  z-index: 1000;
  opacity: 1;
  background: #525666;
`;

const BlockSquare = styled(Link)`
  width: 11px;
  height: 11px;
  z-index: 1000;
  margin-bottom: ${prop => (prop.mb ? prop.mb : 0)}px;
  opacity: 1;
  border: ${prop => prop.border||'none'};
  &:hover {
    border: 1px solid #fff;
    &:after {
      content: '${prop => prop.height}';
      position: absolute;
      color: rgba(255,255,255,0.52);
      font-size: 10px;
      top: -28px;
      transform: translate(-50%,0);
      margin-left: 5px;
    }
    &:before {
      content: '|';
      position: absolute;
      font-weight: 100;
      color: rgba(255, 255, 255, 0.52);
      z-index: -1;
      font-size: 14px;
      top: -15px;
      left: 3.5px;
    }
  }
  background: ${prop => prop.bg};
`;
