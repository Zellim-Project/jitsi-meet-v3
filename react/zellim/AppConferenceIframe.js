import React from 'react';

import { getIframeSource } from './zellim-utils';
import styled from 'styled-components';

const IFrame = styled.iframe`
  position: absolute;
  min-height: 100vh;
  min-height: -webkit-fill-available;
  width: 100vw;
  max-width: 100vw;
  overflow: hidden;
`;

export const ConferenceIframe = () => {
  return (
    <IFrame
      src={getIframeSource()}
      className="frame"
      frameBorder="0"
      allowFullScreen
      allow="camera *;microphone *;geolocation *; display-capture *"
      // referrerPolicy="no-referrer same-origin strict-origin-when-cross-origin origin-when-cross-origin"
      referrerPolicy="origin-when-cross-origin"
    />
  );
};