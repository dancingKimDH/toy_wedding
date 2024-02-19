import classNames from 'classnames/bind'
import styles from './Calendar.module.scss'
import Section from '../shared/Section'
import { ko } from 'date-fns/locale'
import { parseISO, format } from 'date-fns'

import 'react-day-picker/dist/style.css'
import { DayPicker } from 'react-day-picker'

const cx = classNames.bind(styles)

const css = `
    .rdp-caption {
        display: none;
    }

    .rdp-cell {
        cursor: default;
    }

    .rdp-head_cell {
        font-weight: 500;
        font-size: 14px;
    }

    .rdp-day_selected {
        background-color: red;

        &:hover {
            background-color: red;
        }
    }
`

export default function Calendar({ date }: { date: string }) {
  const weddingDate = parseISO(date)

  return (
    <Section
      title={
        <div className={cx('header')}>
          <span className={cx('txt-date')}>
            {format(weddingDate, 'yyyy.MM.dd')}
          </span>
          <span className={cx('txt-time')}>
            {format(weddingDate, 'aaa h시 eeee', { locale: ko })}
          </span>
        </div>
      }
    >
      <div className={cx('calendar')}>
        <style>{css}</style>
        <DayPicker locale={ko} month={weddingDate} selected={weddingDate} />
      </div>
    </Section>
  )
}
