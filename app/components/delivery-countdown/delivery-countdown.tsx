import { useMatches } from '@remix-run/react'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'

const DeliveryCountdown = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  const [root, frame] = useMatches()
  const { shippingEstimates } = frame?.data || {}

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>
    ;(timer = setInterval(async () => {
      setCurrentTime(new Date())
    }, 1000)),
      () => {
        if (timer) clearInterval(timer)
      }
  }, [])

  const ESTIMATE_CONFIG = {
    holidays: JSON.parse(shippingEstimates?.reference?.holiday_dates?.value),
    shippingMethodTime: parseInt(shippingEstimates?.reference?.delivery_estimate_days?.value),
    enableSaturdayShipping: shippingEstimates?.reference?.saturday_shipping?.value === 'true',
    enableSaturdayDelivery: shippingEstimates.reference?.saturday_delivery?.value === 'true',
    timeOffset: -6, // CDT = GMT - 6
    limitTime: 15,
  }

  const getServerDate = (current_date: Date) => {
    //EST
    const offset = ESTIMATE_CONFIG.timeOffset
    const utc = current_date.getTime() + current_date.getTimezoneOffset() * 60000
    return new Date(utc + 3600000 * offset)
  }

  const getFormattedTime = (hour: string, minute: string, seconds: string) => {
    return ('0' + hour).slice(-2) + ':' + ('0' + minute).slice(-2) + ':' + ('0' + seconds).slice(-2)
  }

  const getHtmlContent = () => {
    let html = ''
    const sectionContent = JSON.parse(shippingEstimates.reference.section_content.value)
    sectionContent.children[0].children.forEach((child: any) => {
      const subHtml = child.value
        .replace(
          '[DATE]',
          getDate(
            ESTIMATE_CONFIG.shippingMethodTime,
            currentTime,
            ESTIMATE_CONFIG.enableSaturdayShipping || ESTIMATE_CONFIG.enableSaturdayShipping,
          ).toString(),
        )
        .replace('[REMAIN_TIME]', `<span>${getRemainTime()}</span>`)
      if (child.bold) {
        html += `<strong>${subHtml}</strong>`
      } else {
        html += subHtml
      }
    })

    return html
  }

  const getNumberWithOrdinal = (number: number) => {
    const str = ['th', 'st', 'nd', 'rd']
    const index = number % 100
    return number + (str[(index - 20) % 10] || str[index] || str[0])
  }

  const getRemainHours = (current_date: Date, isFormat = false) => {
    const serverDate = getServerDate(current_date)
    let subHours = ESTIMATE_CONFIG.limitTime - serverDate.getHours()
    const minutes = 60 - Math.floor((Date.parse(serverDate.toISOString()) / 1000 / 60) % 60)
    let seconds = (60 - serverDate.getSeconds()).toString()

    if (Math.abs(subHours) > 1) {
      seconds = 'XX'
    }

    if (minutes > 0) subHours--

    if (subHours >= 0) {
      if (isFormat) {
        return getFormattedTime(subHours.toString(), minutes.toString(), seconds)
      } else {
        if (subHours == 0) {
          return '1'
        } else {
          return subHours.toString()
        }
      }
    } else {
      if (isFormat) {
        return getFormattedTime((24 + subHours).toString(), minutes.toString(), seconds)
      } else {
        return (24 + subHours).toString()
      }
    }
  }

  const getDate = function (days: number, currentDate: Date, enableSaturdayShipping: boolean) {
    const serverDate = getServerDate(currentDate)

    const business_days = days
    let return_date = '',
      deliveryDate = currentDate, //will be incremented by the for loop
      total_days = business_days //will be used by the for loop

    /* if it's after 3:00 PM */
    if (serverDate.getHours() >= ESTIMATE_CONFIG.limitTime) {
      total_days++
    }

    for (let days = 1; days <= total_days; days++) {
      deliveryDate = new Date(serverDate.getTime() + days * 24 * 60 * 60 * 1000)
      if (
        deliveryDate.getDay() == 0 ||
        (!enableSaturdayShipping && deliveryDate.getDay() == 6) ||
        isHoliday(deliveryDate, ESTIMATE_CONFIG.holidays)
      ) {
        //it's a weekend day so we increase the total_days of 1
        total_days++
      }
    }

    const month = deliveryDate.toLocaleDateString('en-US', { month: 'long' })
    const date = deliveryDate.toLocaleDateString('en-US', { day: 'numeric' })
    const year = deliveryDate.getFullYear()
    const week = deliveryDate.toLocaleDateString('en-US', { weekday: 'short' })

    return_date += week + ' ' + getNumberWithOrdinal(parseInt(date)) + ' ' + month
    return return_date
  }

  const isHoliday = function (delivery: Date, holidayDates: string[]) {
    let holidayDay = false
    holidayDates.forEach(function (holidayDate) {
      const holiday = new Date(holidayDate),
        sameDay = delivery.getDate() === holiday.getDate(),
        sameMonth = delivery.getMonth() === holiday.getMonth(),
        sameYear = delivery.getFullYear() === holiday.getFullYear()
      if (sameDay && sameMonth && sameYear) {
        holidayDay = true
      }
    })
    return holidayDay
  }

  const getFormattedTimeText = (str: string, mod = 'time', secondDefined = false) => {
    let text = ''
    switch (mod) {
      case 'time':
        // eslint-disable-next-line no-case-declarations
        const arr = str.split(':')
        // eslint-disable-next-line no-case-declarations
        const hour = arr[0] + (parseInt(arr[0]) == 1 ? ' hr ' : ' hrs ')
        // eslint-disable-next-line no-case-declarations
        const minute = arr[1] + (parseInt(arr[1]) == 1 ? ' min' : ' mins')
        // eslint-disable-next-line no-case-declarations
        const second = arr[2] + (parseInt(arr[2]) == 1 ? ' sec' : ' secs')
        if (parseInt(arr[0]) > 0) {
          text = (!secondDefined ? hour : '') + minute + (secondDefined ? ' ' + second : '')
        } else {
          text = minute + (secondDefined ? ' ' + second : '')
        }
        break
      case 'date':
        break
    }

    return text
  }

  const getRemainTime = () => {
    const remainHoursFormatted = getRemainHours(currentTime, true)
    const secondDefined = remainHoursFormatted.indexOf('XX') == -1
    return getFormattedTimeText(remainHoursFormatted, 'time', secondDefined)
  }

  const getPassedPercent = () => {
    const remainHours = parseInt(getRemainHours(currentTime))
    const passedPercent = remainHours > 0 ? 1 - remainHours / 24 : 0
    return passedPercent
  }

  return (
    <>
      <div
        className={styles.productShippingEstimate}
        style={
          {
            '--passed-percent': getPassedPercent(),
          } as React.CSSProperties
        }
      >
        <p dangerouslySetInnerHTML={{ __html: getHtmlContent() }}></p>
      </div>
    </>
  )
}

export default DeliveryCountdown
