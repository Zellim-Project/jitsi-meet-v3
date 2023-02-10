// @flow2

import React from 'react';

import { useEffect, useState } from 'react';

import { ConferenceIframe } from './AppConferenceIframe';

import { saveSession } from './zellim-utils';
import { setJWT } from '../features/base/jwt';

import { App } from '../features/app/components';

declare var APP: Object;

export const ZellimVanity = () => {
  const [inMeet, setInMeet] = useState(false);
  const [meetInfo, setMeetInfo] = useState();

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  const accessToken = params.accessToken;

  if (accessToken) {
    saveSession(accessToken);
    const [origin] = window.location.href.split('?');
    window.location.href = origin;
  }

  const handleMessage = ({ data }) => {
    if (data.action === 'join-meet') {
      setMeetInfo(data.object);
      setInMeet(true);
      removeListener();
      setTimeout(() => {
        APP.store.dispatch(setJWT(data.object.jwt));
      }, 1)
    }
  };

  function removeListener() {
    window.removeEventListener('message', handleMessage, false);
  };

  useEffect(() => {
    window.addEventListener('message', handleMessage, false);

    return () => {
      removeListener();
    };
  }, []);

  if (inMeet || localStorage.getItem('recorder')) return <App />;

  return <ConferenceIframe />;
};