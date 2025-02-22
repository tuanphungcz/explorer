import { Box, BoxProps, Flex, FlexProps, IconButton } from '@stacks/ui';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import React from 'react';
import { StxInline } from '@components/icons/stx-inline';
import { HeaderTextItem } from '@components/header-text-item';
import { NetworkSwitcherItem } from '@components/network-switcher';
import { SearchComponent } from '@features/search/search';
import { MobileMenu } from '@components/mobile-menu';
import { NetworkModeBanner } from '@components/network-mode-banner';
import { useAppDispatch } from '@common/state/hooks';
import { buildUrl } from '@components/links';
import { StatusBar } from '@features/status-bar/status-bar';
import { BtcStxPrice } from '@components/btc-stx-price';

const ColorModeButton = dynamic(() => import('@components/color-mode-button'), { ssr: false });

export const LogoNavItem = React.memo((props: BoxProps) => {
  return (
    <Box {...props}>
      <NextLink href={buildUrl('/')} passHref>
        <a>
          <IconButton
            invert
            size="42px"
            iconSize="24px"
            icon={StxInline}
            color="white"
            flexShrink={0}
            aria-label="Homepage"
            title="Stacks Explorer"
            as="span"
          />
        </a>
      </NextLink>
    </Box>
  );
});

const HeaderBar: React.FC<FlexProps> = React.memo(props => (
  <Flex
    top={0}
    height="64px"
    alignItems="center"
    flexDirection="row"
    px={['base', 'base', 'extra-loose']}
    width="100%"
    position="relative"
    zIndex={99999}
    {...props}
  />
));

const Navigation: React.FC = () => {
  return (
    <>
      <Flex alignItems="center" display={['none', 'none', 'none', 'flex']} gap={'16px'}>
        <ColorModeButton mr="-8px" />
        <NextLink href={buildUrl('/transactions')} passHref>
          <HeaderTextItem>Transactions</HeaderTextItem>
        </NextLink>
        <NextLink href={buildUrl('/blocks')} passHref>
          <HeaderTextItem>Blocks</HeaderTextItem>
        </NextLink>
        <NextLink href={buildUrl('/sandbox/deploy')} passHref>
          <HeaderTextItem>Sandbox</HeaderTextItem>
        </NextLink>
        <NetworkSwitcherItem />
        <BtcStxPrice />
      </Flex>
      <MobileMenu />
    </>
  );
};

export const Header: React.FC<
  { isHome?: boolean; fullWidth?: boolean; networkMode?: string } & FlexProps
> = React.memo(({ isHome, fullWidth, networkMode, ...props }) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <StatusBar />
      <HeaderBar
        mx="auto"
        width="100%"
        maxWidth={isHome || fullWidth ? '100%' : '1280px'}
        justifyContent={isHome || fullWidth ? 'space-between' : 'unset'}
        {...props}
      >
        <LogoNavItem />
        <Flex
          mx={['none', 'none', 'auto']}
          width="100%"
          justifyContent={isHome || fullWidth ? 'space-between' : 'unset'}
          pl={['unset', 'unset', 'base-loose']}
          maxWidth={isHome || fullWidth ? 'unset' : '1280px'}
          alignItems="center"
        >
          <Flex alignItems="center" flexGrow={1}>
            {!isHome ? (
              <>
                <SearchComponent
                  display={['none', 'none', 'block', 'block']}
                  variant="small"
                  mr="base"
                  width="100%"
                  maxWidth="760px"
                />
              </>
            ) : null}
            <NetworkModeBanner order={[-1, -1, 2, 2]} mr="tight" />
          </Flex>
          <Navigation />
        </Flex>
      </HeaderBar>
    </>
  );
});
