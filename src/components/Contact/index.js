import { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useRef } from 'react'
import emailjs from '@emailjs/browser'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'
import { gsap } from 'gsap-trial'
import DrawSVGPlugin from 'gsap-trial/DrawSVGPlugin'
import 'leaflet/dist/leaflet.css'

gsap.registerPlugin(DrawSVGPlugin)


const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const form = useRef()
  const elRef = useRef(null)

  useEffect(() => {
    if (!elRef.current) return

    // scope GSAP with context so cleanup is revertible
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      // update selectors to match your markup
      tl.from('.contact-head', { y: 20, opacity: 0, duration: 0.5 })
      tl.from('.contact-line', { drawSVG: '0%', duration: 1 }, '<0.2')
    }, elRef)

    // cleanup must be a function
    return () => {
      try {
        ctx.revert && ctx.revert()
      } catch (e) {
        /* ignore cleanup errors */
      }
    }
  }, [])

  // separate effect for letterClass timeout
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 4000)

    // cleanup must be a function that clears the timeout
    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm('service_94tgxjk', 'template_un3xq24', form.current, 'ikc57B031SILTPPVE')
      .then(
        () => {
          alert('Message successfully sent!')
          window.location.reload(false)
        },
        () => {
          alert('Failed to send the message, please try again')
        }
      )
  }

  return (
    <>
      <div ref={elRef} className="container contact-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'm', 'e']}
              idx={15}
            />
          </h1>
          <p>
            I am interested in freelance opportunities - especially on ambitious
            or large projects. However, if you have any other requests or
            questions, don't hesitate to contact me using below form either.
          </p>
          <div className="contact-form">
            <form ref={form} onSubmit={sendEmail}>
              <ul>
                <li className="half">
                  <input placeholder="Name" type="text" name="name" required />
                </li>
                <li className="half">
                  <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    required
                  />
                </li>
                <li>
                  <input
                    placeholder="Subject"
                    type="text"
                    name="subject"
                    required
                  />
                </li>
                <li>
                  <textarea
                    placeholder="Message"
                    name="message"
                    required
                  ></textarea>
                </li>
                <li>
                  <input type="submit" className="flat-button" value="SEND" />
                </li>
              </ul>
            </form>
          </div>
        </div>
        <div className="info-map">
          João Oliveira,
          <br />
          Portugal,
          <br />
          Autonomous University of Lisbon 
          <br />
          <span>joaoliveira.tomar@gmail.com</span>
        </div>
        <div className="map-wrap">
          <MapContainer center={[38.7223392, -9.1472049]} zoom={23}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
            subdomains={['a','b','c']}
 />
            <Marker position={[38.7223, -9.1446]}>
              <Popup>UAL</Popup>
              <a
          href="https://www.google.com/maps/place/Universidade+Aut%C3%B3noma+de+Lisboa/@38.7223392,-9.1472049,17z"
          target="_blank" rel="noopener noreferrer"
        >
          Open in Google Maps
        </a>  
            </Marker>
          </MapContainer>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Contact
