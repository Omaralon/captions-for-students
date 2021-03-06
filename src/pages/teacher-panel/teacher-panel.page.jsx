import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';
import TeacherPanel from '../../components/teacher-section/teacher-panel/teacher-panel.component';
import TeacherDashboard from '../../components/teacher-section/teacher-dashboard/teacher-dashboard.component';

class TeacherPanelPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
    }
    render() {
        const { match } = this.props;

        return (
            <Switch>
                <Route exact path={match.path} component={TeacherPanel} />
                <Route
                    path={`${match.path}/:uid`}
                    component={TeacherDashboard}
                />
            </Switch>
        );
    }
}

export default TeacherPanelPage;
