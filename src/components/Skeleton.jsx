import st, {keyframes} from 'styled-components';
import pt from 'prop-types';

export const Skeleton = ({width, height, borderRadius, margin}) => (
	<Parent
		width={width}
		height={height}
		borderRadius={borderRadius}
		margin={margin}/>
);
const animationSkeleton = keyframes `
	0% {
		background-position: 0;
	}
	100% {
		background-position: 350px;
	}
`;

const Parent = st.div`
	margin: ${({margin}) => margin};
	width: ${({width}) => width};
	height: ${({height}) => height};
	border-radius: ${({borderRadius}) => borderRadius};
	background: rgb(235,235,235);
	background: linear-gradient(90deg, rgba(235,235,235,1) 0%,
		rgb(224, 224, 224) 50%, rgba(235,235,235,1) 100%);
	transition: all  0.3s;
	animation: ${animationSkeleton} cubic-bezier(0, 0.9, 0.97, 0.22) 1s;
	animation-iteration-count: infinite;
`;

Skeleton.propTypes = {
	width: pt.string.isRequired,
	height: pt.string.isRequired,
	borderRadius: pt.string,
	margin: pt.string,
};

Skeleton.defaultProps = {
	borderRadius: '10px',
	margin: '0px',
};
