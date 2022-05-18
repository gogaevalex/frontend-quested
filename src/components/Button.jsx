import React from 'react';
import pt from 'prop-types';
import st from 'styled-components';

const variant = {
	medium: {
		padding: '8px 18px',
		fontSize: '16px',
	},
	small: {
		padding: '6px 16px',
		fontSize: '14px',
	},
};

export const Button = ({
	text,
	onClick,
	disabled,
	size,
	startIcon,
	endIcon,
	fullWidth,
	color,
}) => {
	return (
		<Content
			disabled={disabled}
			onClick={onClick}
			fullWidth={fullWidth}
			color={color}
			{...variant[size]}
		>
			{startIcon && (
				<StartIcon>
					{startIcon}
				</StartIcon>
			)}
			{text}
			{endIcon && (
				<EndIcon>
					{endIcon}
				</EndIcon>
			)}
		</Content>
	);
};

Button.propTypes = {
	text: pt.string,
	onClick: pt.func,
	size: pt.oneOf(['small', 'medium', 'custom']),
	color: pt.oneOf(['primary', 'error', 'success']),
	disabled: pt.bool,
	fullWidth: pt.bool,
	startIcon: pt.element,
	endIcon: pt.element,
};

Button.defaultProps = {
    text: 'Button',
	size: 'medium',
	disabled: false,
	fullWidth: false,
	startIcon: null,
	endIcon: null,
	color: 'primary',
	onClick: () => {},
};

const Content = st.button`
	height: 100%;
	padding: ${(props) => props.padding};
	text-align: center;
	font-weight: ${({theme}) => theme.fontWeight.normal};
	font-size: ${(props) => props.fontSize};
	line-height: 16px;
	cursor: pointer;
	opacity: ${(props) => (props.disabled ? 0.4 : 1)};
	pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
	border-radius: 100px;
	position: relative;
	width: ${({fullWidth}) => fullWidth ? '100%' : 'auto'};
	border: none;
	box-shadow: none;
	outline: none;
	${({theme, color}) => {
		const colorsData = {
			primary: {
				main: theme.color.primary.main,
				text: theme.color.white,
				hover: theme.color.primary.bgHover,
				active: theme.color.primary.bgHover,
			},
			success: {
				main: theme.color.success.main,
				text: theme.color.white,
				hover: theme.color.success.bgHover,
				active: theme.color.success.bgHover,
			},
			error: {
				main: theme.color.error.main,
				text: theme.color.white,
				hover: theme.color.error.bgHover,
				active: theme.color.error.bgHover,
			},
		};
		const colorData = colorsData[color];

		return (`
			color: ${colorData.text};
			background: ${colorData.main};
			&:hover {
				background: ${colorData.hover};
			}
			&:active {
				background: ${colorData.active};
			}
		`);
	}}
`;

const StartIcon = st.span`
	display: inline-block;
	margin: 0 8px 0 0;
`;

const EndIcon = st.span`
	display: inline-block;
	margin: 0 0 0 8px;
`;

