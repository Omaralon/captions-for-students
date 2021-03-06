import _ from 'lodash';
import React, { Component } from 'react';
import { Search, Segment, Header } from 'semantic-ui-react';
import TEACHER_DATA from '../../data/teachers';
import STUDENT_DATA from '../../data/students';

const initialState = { isLoading: false, results: [], value: '' };

class SearchExample extends Component {
    state = initialState;

    handleResultSelect = (e, { result }) => {
        const { setUserData } = this.props;
        // title and description were used only for the Search Component
        const { title, description, ...importantData } = result;

        setUserData(importantData);

        this.setState({
            value: '',
            results: [result],
        });
    };

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value });

        setTimeout(() => {
            // We deleted our search
            if (this.state.value.length < 1) return this.setState(initialState);

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
            const isMatch = result => {
                const id =
                    this.props.type === 'teacher'
                        ? result.teacherId
                        : result.studentId;

                return re.test(id);
            };

            const { dataSource } = this.props;

            this.setState({
                isLoading: false,
                results: _.filter(dataSource, isMatch),
            });
        }, 300);
    };

    render() {
        const { isLoading, value, results } = this.state;
        const { type } = this.props;

        return (
            <Segment style={{ padding: '32px', marginBottom: '24px' }}>
                <Header size="large" textAlign="center">
                    <span style={{ fontWeight: 'normal' }}>
                        {type === 'teacher'
                            ? 'Introduce el número de empleado'
                            : 'Introduce a matrícula del estudiante'}
                    </span>
                </Header>
                <div style={{ width: '232px', margin: '0 auto' }}>
                    <Search
                        loading={isLoading}
                        onResultSelect={this.handleResultSelect}
                        onSearchChange={_.debounce(
                            this.handleSearchChange,
                            500,
                            {
                                leading: true,
                            }
                        )}
                        results={results}
                        value={value}
                        size="large"
                        placeholder={
                            type === 'teacher' ? 'Ej. 60001' : 'Ej. 12012'
                        }
                    />
                </div>
            </Segment>
        );
    }
}

export default SearchExample;
