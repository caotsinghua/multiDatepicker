/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Calendar, message } from 'antd';
import classNames from 'classnames';
import './style.less';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
const noop = () => {};
class MultiDatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.dateCellRender = this.dateCellRender.bind(this);
        this.dateFullCellRender = this.dateFullCellRender.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    async onSelect(date) {
        const { value, onChange } = this.props;
        if (value.find(item => date.isSame(item))) {
            // 重复选择，取消
            onChange(value.filter(item => !date.isSame(item)));
        } else {
            onChange(value.concat(date));
        }
    }

    getAllMonths() {
        const { startTime, endTime } = this.props;
        let allMonths = [];
        if (moment(startTime).isAfter(moment(endTime))) {
            message.error('结束时间不能小于开始时间');
            return allMonths;
        }
        const startYear = moment(startTime).year();
        const startMonth = moment(startTime).month() + 1;
        const endYear = moment(endTime).year();
        const endMonth = moment(endTime).month() + 1;

        const yearDiff = endYear - startYear;
        const monthDiff = endMonth - startMonth;
        if (yearDiff > 0) {
            // 一年以外
            // 第一个月
            allMonths.push({
                start_time: moment(startTime),
                end_time: moment(startTime).endOf('month'),
            });
            let month =
                moment(startTime)
                    .endOf('month')
                    .month() + 2;
            for (let year = startYear; year < endYear; year++) {
                for (; month <= 12; month++) {
                    allMonths.push({
                        start_time: moment(`${year}-${month}`).startOf('month'),
                        end_time: moment(`${year}-${month}`).endOf('month'),
                    });
                }
                month = 1;
            }
            // 最后一年
            for (let lastYearMonth = 1; lastYearMonth < endMonth; lastYearMonth++) {
                allMonths.push({
                    start_time: moment(`${endYear}-${lastYearMonth}`).startOf('month'),
                    end_time: moment(`${endYear}-${lastYearMonth}`).endOf('month'),
                });
            }
            const lastMonth = {
                start_time: moment(`${endYear}-${endMonth}`).startOf('month'),
                end_time: moment(endTime),
            };
            allMonths.push(lastMonth);
        } else if (monthDiff > 0) {
            // 一年内
            // 第一个月
            allMonths.push({
                start_time: moment(startTime),
                end_time: moment(startTime).endOf('month'),
            });
            for (let month = startMonth + 1; month < endMonth; month++) {
                allMonths.push({
                    start_time: moment(`${startYear}-${month}`).startOf('month'),
                    end_time: moment(`${startYear}-${month}`).endOf('month'), // starttime这一年结束的时间
                });
            }
            // 最后一个月
            allMonths.push({
                start_time: moment(endTime).startOf('month'),
                end_time: moment(endTime),
            });
        } else {
            // 一个月内
            allMonths = [
                {
                    start_time: moment(startTime),
                    end_time: moment(endTime),
                },
            ];
        }
        return allMonths;
    }

    getCalendars() {
        const months = this.getAllMonths();
        const { calendarStyle } = this.props;
        return months.map((month, index) => (
            <div className="calendar-wrap" key={`calendar-${index}`} style={calendarStyle}>
                <h3 className="title">{`${moment(month.start_time).year()}年${moment(
                    month.start_time,
                ).month() + 1}月`}</h3>
                <Calendar
                    fullscreen={false}
                    mode="month"
                    validRange={[moment(month.start_time), moment(month.end_time)]}
                    value={month.start_time}
                    disabledDate={currentDate => {
                        this.disabledDate(currentDate, month);
                    }}
                    dateFullCellRender={date => this.dateFullCellRender(date, month)}
                    onSelect={this.onSelect}
                />
            </div>
        ));
    }

    dateFullCellRender(date, currentMonth) {
        const { value } = this.props;
        if (
            moment(date).isBetween(
                moment(currentMonth.start_time),
                moment(currentMonth.end_time),
                'date',
            ) ||
            moment(date).isSame(moment(currentMonth.start_time)) ||
            moment(date).isSame(moment(currentMonth.end_time))
        ) {
            if (value.find(item => moment(item).isSame(date))) {
                return this.dateCellRender(date, true);
            }
            return this.dateCellRender(date);
        }
        return null;
    }

    dateCellRender(value, isSelected = false) {
        const dateClassName = classNames('calendar-date', {
            selected: isSelected,
        });
        return (
            <div className={dateClassName}>
                <div className="calendar-value">{value && value.date()}</div>
            </div>
        );
    }

    disabledDate(currentDate, month) {
        if (
            currentDate.isBefore(moment(month.start_time).startOf('month')) ||
            currentDate.isAfter(moment(month.end_time).endOf('month'))
        ) {
            return false;
        }
        return true;
    }

    render() {
        return <div className="calendars">{this.getCalendars()}</div>;
    }
}

MultiDatePicker.propTypes = {
    startTime: PropTypes.instanceOf(moment).isRequired,
    endTime: PropTypes.instanceOf(moment).isRequired,
    calendarStyle: PropTypes.object,
    value: PropTypes.array,
    onChange: PropTypes.func,
};
MultiDatePicker.defaultProps = {
    calendarStyle: {
        marginRight: 10,
        marginBottom: 10,
    },
    value: [],
    onChange: noop,
};
export default MultiDatePicker;
