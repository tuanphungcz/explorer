import React from 'react';
import { Box, BoxProps } from '@stacks/ui';
import { FiCheck } from 'react-icons/fi';

export const CheckIcon: React.FC<BoxProps> = props => <Box as={FiCheck} {...props} />;
