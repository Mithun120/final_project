import React from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes for animations
const pathTriangle = keyframes`
  33% {
    stroke-dashoffset: 74;
  }
  66% {
    stroke-dashoffset: 147;
  }
  100% {
    stroke-dashoffset: 221;
  }
`;

const dotTriangle = keyframes`
  33% {
    transform: translate(0, 0);
  }
  66% {
    transform: translate(10px, -18px);
  }
  100% {
    transform: translate(-10px, -18px);
  }
`;

const pathRect = keyframes`
  25% {
    stroke-dashoffset: 64;
  }
  50% {
    stroke-dashoffset: 128;
  }
  75% {
    stroke-dashoffset: 192;
  }
  100% {
    stroke-dashoffset: 256;
  }
`;

const dotRect = keyframes`
  25% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(18px, -18px);
  }
  75% {
    transform: translate(0, -36px);
  }
  100% {
    transform: translate(-18px, -18px);
  }
`;

const pathCircle = keyframes`
  25% {
    stroke-dashoffset: 125;
  }
  50% {
    stroke-dashoffset: 175;
  }
  75% {
    stroke-dashoffset: 225;
  }
  100% {
    stroke-dashoffset: 275;
  }
`;

// Styled components for loader
const LoaderContainer = styled.div`
  --path: #d99058;
  --dot: #29c966;
  --duration: 3s;
  width: 44px;
  height: 44px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dot = styled.div`
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  position: absolute;
  display: block;
  background: var(--dot);
  top: 37px;
  left: 19px;
  transform: translate(-18px, -18px);
  animation: ${dotRect} var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
`;

const Svg = styled.svg`
  display: block;
  width: 100%;
  height: 100%;

  rect,
  polygon,
  circle {
    fill: none;
    stroke: var(--path);
    stroke-width: 10px;
    stroke-linejoin: round;
    stroke-linecap: round;
  }

  polygon {
    stroke-dasharray: 145 76 145 76;
    stroke-dashoffset: 0;
    animation: ${pathTriangle} var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
  }

  rect {
    stroke-dasharray: 192 64 192 64;
    stroke-dashoffset: 0;
    animation: ${pathRect} 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
  }

  circle {
    stroke-dasharray: 150 50 150 50;
    stroke-dashoffset: 75;
    animation: ${pathCircle} var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
  }
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <Dot />
      <Svg viewBox="0 0 80 80">
        <rect height="64" width="64" y="8" x="8" />
      </Svg>
    </LoaderContainer>
  );
};

export default Loader;
