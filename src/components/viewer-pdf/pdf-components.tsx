/* eslint-disable no-tabs */
import styled from 'styled-components';

export const Header = styled.div`
	height: 30px;
	border-bottom: 1px solid #e7e7e7;
	padding: 0 20px 10px;
	display: flex;
	align-items: flex-end;
`;
export const Container = styled.div`
	.react-pdf__Document {
		margin: 0px 0 10px;
		border: 1px solid #e7e7e7;
	}
	.react-pdf__Page {
		border-bottom: 1px solid #ccc;
	}
	canvas {
		width: 100% !important;
	}
	.pdf-viewer{
		height:700px;
	}
`;
export const Loader = styled.div`
	position:relative;
	min-height:150px;
`;
export const ErrorMessage = styled.div`
	text-align:center;
	padding:30px;
	font-size:16px;
`;
