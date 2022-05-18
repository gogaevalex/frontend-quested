import pt from 'prop-types';
import st from 'styled-components';

export const Modal = ({
	children,
	onClickBg,
}) => {
	return (
		<Bg onClick={onClickBg}>
			<Content onClick={(e) => e.stopPropagation()}>
				<ContentBody>
					{children}
				</ContentBody>
			</Content>
		</Bg>
	);
}

Modal.propTypes = {
	children: pt.node.isRequired,
	onClickBg: pt.func,
};

Modal.defaultProps = {
	buttons: null,
	title: null,
	onClickBg: () => {},
};

const Bg = st.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background: ${({theme}) => theme.color.dark.bgHover};
	overflow-y: auto;
	z-index: 99;
`;

const Content = st.div`
	padding: 15px;
	box-sizing: border-box;
	box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.05);
	border-radius: 20px;
	background: ${({theme}) => theme.color.white};
	min-width: 260px;
	width: 100%;
	max-width: 750px;
	margin: 15px;
	text-align: center;
`;

const ContentBody = st.div`
	margin: 15px 0;
`;