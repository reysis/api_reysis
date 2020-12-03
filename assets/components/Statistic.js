import React, { useRef, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import $ from 'jquery'
import { useCountUp } from 'react-countup'

const Statistic = ({ title, value, img, aosDelay }) => {

	const counter = useRef(null)
	const [counterReveal, setCounterReveal] = useState(false)

	const countUpState = (v) => {
		const response = {
			start: 0,
			end: value,
			delay: aosDelay,
			duration: 3,
			separator: ' '
		}
		if (v.toString().match(/[.,]/))
			response.decimals = 1
		return response
	}

	const { countUp, start } = useCountUp(countUpState(value))

	const onScroll = () => {
		let hT = $(counter.current).offset().top
		let hH = $(counter.current).outerHeight()
		let wH = $(window).height()
		let wS = $(window).scrollTop()
		if (wS > (hT + hH - wH) && hT > wS) {
			setCounterReveal(true)
		}
	}

	useEffect(() => {
		$(window).on('scroll', onScroll)
		return () => {
			!counterReveal && $(window).off('scroll')
		}
	}, [])

	useEffect(() => {
		if (counterReveal) {
			$(window).off('scroll')
			start()
		}
	}, [counterReveal])

	return (
		<div data-aos="fade-up" data-aos-delay={aosDelay} className="single-statistic">
			<div className="icon-o">
				<FontAwesomeIcon icon={img} />
			</div>
			<div className="single-statistic-count">
				{/* <h3><span ref={counter} className="counter">{value}</span></h3> */}
				<h3><span ref={counter} className="counter">{countUp}</span></h3>
				<p>{title}</p>
			</div>
		</div>
	)
}

export default Statistic;