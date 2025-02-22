import { FC, Fragment } from 'react';
import { FaBitcoin } from 'react-icons/fa';
import { BsArrowRightShort } from 'react-icons/bs';
import { Box, Text, color } from '@stacks/ui';
import { css } from '@emotion/react';
import { IconArrowRight } from '@tabler/icons';
import { BlockLink, buildUrl } from '@components/links';
import { StxInline } from '@components/icons/stx-inline';
import { Circle } from '@components/circle';
import { useAppSelector } from '@common/state/hooks';
import { selectActiveNetwork } from '@common/state/network-slice';
import { NetworkModes } from '@common/types/network';
import { Link } from '@components/typography';

interface BtcStxBlockLinksProps {
  btcBlockHeight?: number;
  stxBlockHeight: number;
  stxBlockHash: string;
  fontSize?: string;
}

const wrapperStyle = css`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const iconStyle = css`
  margin-right: 3px;
`;

const linkStyle = (secondary?: boolean, clickable?: boolean, fontSize?: string) => css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  text-decoration: none;
  font-family: 'Open Sauce', Inter, sans-serif;
  ${fontSize ? `font-size: ${fontSize};` : 'font-size: 14px;'}
  ${clickable &&
  `
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  `}
  ${secondary &&
  `
    color: #747478;
    font-size: 12px;
  `}
`;

const arrowStyle = css`
  margin: 0 8px;
`;

export const BtcStxBlockLinks: FC<BtcStxBlockLinksProps> = ({
  btcBlockHeight,
  stxBlockHeight,
  stxBlockHash,
  fontSize,
}) => {
  const activeNetworkMode = useAppSelector(selectActiveNetwork).mode;
  const btcLinkPathPrefix = activeNetworkMode === NetworkModes.Testnet ? '/testnet' : '';

  return (
    <Box css={wrapperStyle}>
      <Circle size="19px" bg={color('accent')} css={iconStyle}>
        <StxInline strokeWidth={2} size="11px" color="white" />
      </Circle>
      <BlockLink hash={stxBlockHash} networkMode={activeNetworkMode}>
        <span>#{stxBlockHeight}</span>
      </BlockLink>
      {btcBlockHeight && (
        <Fragment>
          <IconArrowRight size="14px" color={'#747478'} css={arrowStyle} />
          <FaBitcoin color={'#f7931a'} size={19} css={iconStyle} />
          <Link
            css={linkStyle(true, true, fontSize)}
            href={`https://mempool.space${btcLinkPathPrefix}/block/${btcBlockHeight}`}
            target="_blank"
          >
            <span>#{btcBlockHeight}</span>
          </Link>
        </Fragment>
      )}
    </Box>
  );
};
