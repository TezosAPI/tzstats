import React from 'react';
import styled from 'styled-components';
import {
  Card,
  DataBox,
  FlexRow,
  FlexColumn,
  Blockies,
  CopyHashButton,
  FlexRowSpaceBetween,
  FlexRowWrap,
} from '../../Common';
import { backerAccounts } from '../../../config/backer-accounts';
import { timeFormat } from 'd3-time-format';
import { getShortHash } from '../../../utils';
import { Link } from 'react-router-dom';

const BlockInfo = ({ block }) => {
  // const name = Object.keys(backerAccounts).filter(hash => backerAccounts[hash] === props.address);

  return (
    <Wrapper>
      <Card title="Block Info">
        <FlexColumn minHeight={200} justifyContent="space-between">
          <FlexRow justifyContent="space-between">
            <DataBox title={timeFormat('%a, %d %B %H:%M')(new Date(block.time))} value={block.height} />
            <DataBox title="Cycle" value={block.cycle} />
          </FlexRow>
          <FlexRowWrap justifyContent="space-around" mt={1}>
            {block.endorsed_slots
              ? [...block.endorsed_slots.toString(2)].map((item, i) => {
                  return (
                    <Slot key={i} color={item}>
                      {item === '0' ? i + 1 : ''}
                    </Slot>
                  );
                })
              : ''}
          </FlexRowWrap>
          <FlexRow justifyContent="space-between">
            <CopyHashButton value={block.hash} type="block" />
            {block.endorsed_slots ? <DataBox title="Slots Endorsed" /> : ''}
            <BlueLink to={`/account/${block.baker}`}>
              <Blockies hash={block.baker} />
              {getShortHash(block.baker)}
              <DataBox title="Baker" />
            </BlueLink>
          </FlexRow>
          <FlexRow justifyContent="space-between">
            <FlexColumn minHeight={80} justifyContent="space-between">
              <DataBox title="Gas Used" value={block.gas_used} />
              <DataBox valueType="currency-fixed" title="Volume" value={block.volume} />
            </FlexColumn>
            <FlexColumn mr={100} minHeight={80} justifyContent="space-between">
              <DataBox valueType="currency-fixed" title="Gas Price" value={block.gas_price} />
              <DataBox title="Gas Limit" value={block.gas_price} />
            </FlexColumn>
            <FlexColumn textAlign="right" minHeight={80} justifyContent="space-between">
              <DataBox title="Solvetime" value={block.solvetime} />
              <DataBox title="Priority" value={block.priority} />
            </FlexColumn>
            <FlexColumn textAlign="right" minHeight={80} justifyContent="space-between">
              <DataBox valueType="currency-fixed" title="Block Rewards" value={block.rewards} />
              <DataBox valueType="currency-fixed" title="Block Fees" value={block.fees} />
            </FlexColumn>
          </FlexRow>
        </FlexColumn>
      </Card>
    </Wrapper>
  );
};
const BlueLink = styled(Link)`
  color: #26b2ee;
  font-size: 14px;
  text-align: right;
`;
const Slot = styled.div`
  height: 10.5px;
  width: 10.5px;
  margin: 2px;
  color: #fff;
  text-align: center;
  font-size: 8px;
  background: ${props => (props.color === '1' ? '#27b9f7' : '#525566')};
`;

const Wrapper = styled.div`
  min-width: 340px;
  margin: 0 5px;
  flex: 2;
`;
export default BlockInfo;
