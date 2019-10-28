import React from 'react';
import { useGlobal } from 'reactn';
import styled from 'styled-components';
import {
  Card,
  DataBox,
  FlexRow,
  HashedBox,
  CopyHashButton,
  FlexRowSpaceBetween,
  FlexColumnSpaceBetween,
  FlexColumn,
  FlexRowWrap,
} from '../../Common';
import { getSlots, getBlockTags, formatDayTime } from '../../../utils';
import BlockTxChart from '../BlockTxChart';
import { Link } from 'react-router-dom';

const BlockInfo = ({ block, setTxType }) => {
  const [config] = useGlobal('config');
  const slots = getSlots(block.endorsed_slots).reverse();

  return (
    <Wrapper>
      <Card title="Block Info" tags={getBlockTags(block, config)} right={<CopyHashButton value={block.hash} type="block" />}>
        <FlexRow>
          <FlexRowSpaceBetween>
            <FlexColumnSpaceBetween minHeight={180}>
              <FlexRowWrap minWidth={250}>
                <DataBox title={`Baked on ${formatDayTime(block.time)}`} value={block.height} />
                <Link to={`/cycle/${block.cycle}`}><DataBox ml={1} title="Cycle" value={block.cycle} /></Link>
              </FlexRowWrap>
              <HashedBox hash={block.baker} isCopy={false} short={true} typeName={'Baker'} />
              <FlexColumn>
                <FlexRowWrap width={192} mb={'2px'}>
                  {block.endorsers ? slots.map((item, i) => {
                    return (
                      <Link key={i} to={`/${block.endorsers[i]}`} title={`Slot ${i+1}`}>
                        <Slot key={i} color={item}>{item === 0 ? i+1 : ''}</Slot>
                      </Link>
                    );
                  }) : 'No Endorsers for this block' }
                </FlexRowWrap>
                <DataBox title="Slots Endorsed" />
              </FlexColumn>
            </FlexColumnSpaceBetween>
            <FlexColumnSpaceBetween minHeight={180} minWidth={100} ml={20}>
              <DataBox title="Priority" value={block.priority} />
              <DataBox title="Gas Used" value={block.gas_used} />
              <DataBox valueType="currency-short" title="Gas Price" value={block.gas_price / 1000} />
            </FlexColumnSpaceBetween>
            <FlexColumnSpaceBetween minHeight={180} minWidth={100} ml={20}>
              <DataBox valueType="text" title="Solvetime" value={block.solvetime + ' sec'} />
              <DataBox valueType="currency" valueOpts={{digits:0}} title="Block Rewards" value={block.rewards} />
              <DataBox valueType="currency-short" title="Block Fees" value={block.fees} />
            </FlexColumnSpaceBetween>
          </FlexRowSpaceBetween>
          <BlockTxChart block={block} setTxType={setTxType} />
        </FlexRow>
      </Card>
    </Wrapper>
  );
};

const Slot = styled.div`
  height: 12px;
  width: 12px;
  font-size: 8px;
  text-align: center;
  padding-top: 1px;
  border-right: 1px solid #444754;
  border-bottom: 1px solid #444754;
  background: ${props => (props.color === 1 ? '#27b9f7' : '#525566')};
`;

const Wrapper = styled.div`
  display: flex;
  flex: 1;
`;
export default BlockInfo;
