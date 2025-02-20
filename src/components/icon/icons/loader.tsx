/* eslint-disable no-tabs */
import {primaryBtnColor} from '@app/styles';
import React from 'react';
import styled from 'styled-components';

type Props = {
	size?: string;
};
/**
 * Renders Component.
 * @return {Lifestyle} Icon Component.
 */
export default function Spinner({size = '6px'}: Props) {
  const Loader = styled.div`
		border: ${size} solid #f3f3f3;
		border-top: ${size} solid ${primaryBtnColor};
		border-left: ${size} solid ${primaryBtnColor};
		border-right: ${size} solid ${primaryBtnColor};
		border-radius: 50%;
		width: calc(${size} * 10);
		height: calc(${size} * 10);
		animation: spin 2s linear infinite;
		@keyframes spin {
			0% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(360deg);
			}
		}
	`;
  const LoaderOuter = styled.div`
        position:absolute;
        width:100%;
        height:100%;
        left:0;
        top:0;
        display:flex;
        align-items:center;
        justify-content:center;
    `;
  return (
    <LoaderOuter>
      <Loader />
    </LoaderOuter>
  );
}
