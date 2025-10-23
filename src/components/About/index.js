import { useEffect, useRef } from 'react'
import { gsap } from 'gsap-trial/all'
import DrawSVGPlugin from 'gsap-trial/DrawSVGPlugin'
import {
  faAngular,
  faCss3,
  faGitAlt,
  faHtml5,
  faJsSquare,
  faReact,
} from '@fortawesome/free-brands-svg-icons'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './index.scss'

gsap.registerPlugin(DrawSVGPlugin)

const About = () => {
  const elRef = useRef(null)

  useEffect(() => {
    if (!elRef.current) return

    // use gsap.context so cleanup is simple and safe
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      // example animation — keep your selectors, timings here
      tl.from('.about-title', { y: 20, opacity: 0, duration: 0.6 })
      tl.from('.about-line', { drawSVG: '0%', duration: 1 }, '<0.2')
    }, elRef)

    // cleanup must be a function
    return () => {
      try {
        ctx.revert && ctx.revert() // revert scoped animations
      } catch (e) {
        // ignore cleanup errors
      }
    }
  }, [])

  return (
    <div ref={elRef}>
      <div className="container about-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass="text-animate"
              strArray={['A', 'b', 'o', 'u', 't', ' ', 'm', 'e']}
              idx={15}
            />
          </h1>
          <p>
            Software Engineer based in
            Lisbon, passionate about
software development and
problem solving.
Experienced in building
ERP systems, reservation
platforms, and web
applications. 
          </p>
          <p align="LEFT">
            Open to
remote opportunities and
eager to learn new
technologies. Strong team
player with 11 years of
federated judo experience,
bringing discipline and
resilience to every project.
          </p>
          <p>
            I’d describe myself as a calm person, and people often say I’m comforting and trustworthy.
          </p>
        </div>

        <div className="stage-cube-cont">
          <div className="cubespinner">
            <div className="face1">
              <FontAwesomeIcon icon={faAngular} color="#DD0031" />
            </div>
            <div className="face2">
              <FontAwesomeIcon icon={faHtml5} color="#F06529" />
            </div>
            <div className="face3">
              <FontAwesomeIcon icon={faCss3} color="#28A4D9" />
            </div>
            <div className="face4">
              <FontAwesomeIcon icon={faReact} color="#5ED4F4" />
            </div>
            <div className="face5">
              <FontAwesomeIcon icon={faJsSquare} color="#EFD81D" />
            </div>
            <div className="face6">
              <FontAwesomeIcon icon={faGitAlt} color="#EC4D28" />
            </div>
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </div>
  )
}

export default About
