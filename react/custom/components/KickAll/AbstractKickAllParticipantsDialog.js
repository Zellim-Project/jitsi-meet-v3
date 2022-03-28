/* eslint-disable require-jsdoc */
// @flow

import { Component } from 'react';

declare var APP: Object;
import { kickParticipant } from '../../../features/base/participants';

type Props = {
    dispatch: Function,
    participantsID: Array<string>,
};

export default class AbstractKickAllParticipantsDialog
    extends Component<Props> {

    constructor(props: Props) {
        super(props);
        this._onSubmit = this._onSubmit.bind(this);
        this._onCancel = this._onCancel.bind(this);
    }

    _onSubmit: () => boolean;

    _onCancel: () => boolean;

    _onSubmit() {
        const { dispatch, participantsID } = this.props;

        participantsID.forEach(participantId =>
            dispatch(kickParticipant(participantId))
        );

        setTimeout(() => {
            APP.conference.hangup(false);
        }, 1000);

        return true;
    }

    _onCancel() {
        APP.conference.hangup(false);

        return true;
    }
}